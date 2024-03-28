import createElement from "./createElement";

function exist(para) {
	if (typeof para === "undefined" || para === null || para === undefined){
		return false;
	}
	if (typeof para === "string" && para.isEmpty)
		return false;
	return true;
}	

function isEmpty(para){
	if (typeof para === "object"){
		if (para.length === 0 || typeof para[0] === "undefined")
			{return false;}
	}
	return true;
}

function Link(props){
	// console.log(props)
	const tag = "a"
	const href = props["to"];
	if (exist(href))
		delete props["to"];
	props["href"] = href;
	if (exist(props.children)){
		var children = props["children"];
		if (Array.isArray(children) === false)
			children = [props["children"]];
		delete props["children"]
		return {tag, props, children};
	}
	return {tag, props};
}

function isEqualFunc(func1, func2) {
	if (typeof func2 !== "function" ||
		typeof func1 !== "function" )
		return false;
    return func1.toString() === func2.toString();
}

// function updateNode(node, state){
// 	//check by setState
// 	for (const [key, value] in Object.entries(node.props)){
// 		if ()
// 	}
// }

function myReact(firstNode) {
    const states = [];
	const Effects = [];
    let position = 0;
    let oldVNode;

    function useState(initValue) {
        const index = position;
        const currentValue = initValue;
		position++;

		if (typeof states[index] === 'undefined') {
			states[index] = initValue;
		}
		this._states = states;
		this._index = index;
		this.state = states[index];
		this.changed = false;
		this._changedValue = this.state;
        const setState = (nextValue) => {
			if (nextValue === states[index]) return;
            this._states[this._index] = nextValue;
			this._changedValue = states[index];
			this.changed = true;
			// renderVirtual(oldNode, this);
			window.renderEvent();
        };
		console.log(setState);
		this.set = setState;

		const viewState = () => {
			console.log("state is", this.state);
		}
		this.view = viewState;

		const renderState = () => {
			this.state = this._changedValue;
			this.changed = false;
		}
		this.render = renderState;

        // return [states[index], setState];
    }

    function useEffect(callback, deps) {
        let position = position;
        const oldDeps = states[position];
        let hasChange = true;

        console.log('oldDeps', oldDeps);

        if (oldDeps) {
            hasChange = deps.some(
              (dep, i) => !Object.is(dep, oldDeps[i])
            );
        }

        if (hasChange) {
            callback();
            states[position] = deps;
        }
        position++;
    }


	function addEvent(target, eventType, selector, callback) {
		const children = [...document.querySelectorAll(selector)];
		target.addEventListener(eventType, event => {
			event.preventDefault();
			if (!event.target.closest(selector)) return false;
			callback(event);
		});
	}
	
	function renderVirtual(newVNode){
		position = 0;
		const rootNode = document.querySelector("#root");
		// if (state) {
		// 	checkDiff(oldNode, state);
		// }
		if (!exist(newVNode) && !exist(oldVNode)){
			console.log("renderVirtual err");
			console.log("node", newVNode)
			console.log("node", oldVNode)
			return ;
		}
		if (!exist(oldVNode)){
			const dom = createDom(newVNode);
			rootNode.appendChild(dom);
			oldVNode = newVNode;
			return;
		}
		console.log("calling diffdom", newVNode);
		diffDom(rootNode, newVNode, oldVNode, 0);
		oldVNode = newVNode;
    }

	function updateProps(target, newProps, oldProps){
		for (const [key, value] of Object.entries(newProps)){
			if (oldProps[key] === newProps[key]) continue;
			target.setAttribute(key, value);
		}
		for (const [key, value] of Object.entries(oldProps)){
			if (oldProps[key] === newProps[key]) continue;
			target.removeAttribute(key);
		}
	}
	function checkState (target){
		if (typeof target === 'object' && Object.getPrototypeOf(target).constructor === useState) return true;
		return false;
	}

	//고쳐줘,,,,
	function updateChildren(target, newChildren, oldChildren){
		const maxLength = Math.max(newChildren.length , oldChildren.length);
		for (let i = maxLength - 1; i >= 0; i--){
			let newChild;
			if (checkState(newChildren[i])){
				if (newChildren[i].changed) newChildren[i].render();
				newChild = newChildren[i].state;
				if (checkState(oldChildren[i])){
					target.replaceChild(
						document.createTextNode(newChild),
						target.childNodes[i]);
					return;
					}
			}
			else newChild = newChildren[i];
			if (typeof oldChildren[i] === "string" && typeof newChild === "string"){
					target.replaceChild(
						document.createTextNode(newChildren[i]),
						target.childNodes[i]);
					return ;
				}
			diffDom(target, newChildren[i], oldChildren[i], i);
		}
	}

	//diff on target.children[index]
	function diffDom(parent, newNode, oldNode, index){
		var element;
		// error :: 
		if (!oldNode && !newNode ) return 0;
		
		// removed :: index --;
		if (oldNode && !newNode){
			//NEED :::: remove eventListner??
			return parent.removeChild(parent.childNodes[index]);
		}

		// created :: index++;
		else if (!oldNode && newNode) {
			return parent.prepend(createDom(newNode));
		}

		// changed tag ::
		if (oldNode.tag !== newNode.tag) {
			parent.replaceChild(
				createDom(newNode), 
				parent.childNodes[index]);
		}
		// same tag ::
		else {
			updateProps(
				parent.childNodes[index],
				newNode.props || {},
				oldNode.props || {});
			updateChildren(
				parent.childNodes[index], 
				newNode.children || [], 
				oldNode.children || []);
		}
		return ;
	}

	function addProps(element, node){
		if (exist(node.props)){
			Object.entries(node.props).forEach(([key, value]) => {
				if (key.slice(0, 2) === 'on') {
					element.onclick = value;
				}
				else {
					element.setAttribute(key, value);
				}
			})
		}
	}
	
	function addChildren(element, node){
		if (exist(node.children) && isEmpty(node.children)) {
			node.children.forEach(child => {
				if (typeof child === 'function') {
					return element.appendChild(createDom(child()));
				}
				let childElement;
				if (checkState(child)){
					if (child.changed)
						child.render();
					childElement = document.createTextNode(child.state);
				}
				else 
					childElement = createDom(child); 
				if (exist(childElement)) 
					element.appendChild(childElement);
			})
		}
	}
	
	function createDom(node){
		if (typeof node === 'number') node = node.toString();
		if (typeof node === 'string') return document.createTextNode(node);
		
		//create each vnode
		const element = document.createElement(node.tag);
		//adding props to element
		addProps(element, node);

		// add children element
		addChildren(element, node);
		return element;
	}

	return {renderVirtual, useState, useEffect, addEvent, createDom};
}

const  { renderVirtual, useState, useEffect, addEvent, createDom} = myReact();

export {renderVirtual, useState, useEffect, addEvent, createDom, createElement, Link, myReact}