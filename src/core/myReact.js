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

function myReact(firstNode) {
	const states = [];
    const depsArray = [];
	let position = 0;
	const app = document.getElementById("app");
	let oldNode;
	const obj = {states: []};

	console.log(firstNode);
	//init state hook
	function useState(initValue) {
		states[position] = states[position] || initValue;
		console.log("cuur", position)
		console.log(states[position])
        const state = () => {
			return states[position];
        }
		const setState = (nextValue) => {
			console.log("cuur", position)
			console.log(nextValue)
            if (states[position] === nextValue)
                return ;
            states[position] = nextValue;
            const root = createDom(oldNode);
			renderVirtual(oldNode);
		}
        position++;
		return [states[position - 1], setState];
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

	function makeProps(props, children){
		return {
			...props,
			children: children.length === 1 ? children[0] : children
		}
	}

	function createElement(tag, props, ...children){
		props = props || {};
		children = children || [];
		if (typeof tag === 'function'){
			if (children.length > 0){
				// console.log(tag(props));
				return tag(makeProps(props, children))
			}
			// console.log(tag(props));
			return tag(props);
		}
		else{
			// console.log({tag, props, children});
			return ({tag, props, children});
		}
	}

	function addEvent(target, eventType, selector, callback) {
		const children = [...document.querySelectorAll(selector)];
		target.addEventListener(eventType, event => {
			event.preventDefault();
			if (!event.target.closest(selector)) return false;
			callback(event);
		});
	}
	
	function renderVirtual(newNode){
		position = 0;
		const rootNode = document.querySelector("#root");
		if (!exist(newNode) && !exist(oldNode)){
			console.log("renderVirtual err");
			console.log("node", newNode)
			console.log("node", oldNode)
			return ;
		}
		if (!exist(oldNode)){
			const dom = createDom(newNode);
			rootNode.appendChild(dom);
			oldNode = newNode;
			return;
		}
		console.log("calling diffdom");
		diffDom(rootNode, newNode, oldNode, 0);
		oldNode = newNode;
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

	//고쳐줘,,,,
	function updateChildren(target, newChildren, oldChildren){
		const maxLength = Math.max(newChildren.length , oldChildren.length);
		for (let i = maxLength - 1; i >= 0; i--){
			if (typeof oldChildren[i] === "string" && typeof newChildren[i] === "string"){
				target.replaceChild = (
					document.createTextNode(newChildren[i]),
					target.childNodes[i]);
				return ;
			}
			// else if (typeof oldChildren[i] === string) {
			// 	target.childNodes[i] 
			// }
			diffDom(target, newChildren[i], oldChildren[i], i);
		}
	}

	//diff on target.children[index]
	function diffDom(parent, newNode, oldNode, index){
		// console.log("parent index",index, parent ? parent.childNodes[index] : "undefined")
		// console.log("parent", parent)
		// console.log("oldNode",oldNode)
		// console.log("newNode",newNode)

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
				const childElement = createDom(child); 
				if (exist(childElement)) 
					element.appendChild(childElement);
			})
		}
	}
	
	function createDom(node){
		if (typeof node === 'number') node = node.toString();
		if (typeof node === 'string') return document.createTextNode(node);
		
		//create each element
		const element = document.createElement(node.tag);
		//adding props to element
		addProps(element, node);

		// add children element
		addChildren(element, node);
		return element;
	}

	return {createElement, renderVirtual, useState, useEffect, addEvent, createDom};
}

const  {createElement, renderVirtual, useState, useEffect, addEvent, createDom} = myReact();

export {createElement, renderVirtual, useState, useEffect, addEvent, createDom, Link, myReact}