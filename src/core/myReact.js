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

function myReact(firstnode) {
	const states = [];
    const depsArray = [];
	let position = 0;
	const app = document.getElementById("app");
	let oldNode;
	const obj = {states: []};

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
		if (!exist(props)) props = {};
		if (!exist(children)) children = [];
		if (typeof tag === 'function'){
            // console.log("tag:",tag);
            // console.log(props, children);
			if (children.length > 0){
				return tag(makeProps(props, children))
			}
			return tag(props);
		}
		else{
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
		diffDom(rootNode, newNode, oldNode, 0);
		oldNode = newNode;
    }

	function updateProps(target, newProps, oldProps){
		for (const [key, value] of Object.entries(newProps)){
			if (oldProps[key] === newProps[key]) continue;
			console.log(target, key, value)
			target.setAttribute(key, value);
		}
		for (const [key, value] of Object.entries(oldProps)){
			if (newProps[key] === undefined) continue;
			target.removeAttribute(key);
		}
	}

	//고쳐줘,,,,
	function updateChildren(target, newChildren, oldChildren){
		const maxLength = Math.max(newChildren.length , oldChildren.length);
		let removed = 0;
		for (let i = 0; i < maxLength; i++){
			console.log("diffdom",target.children[i + removed], target)
			removed += diffDom(target.children[i + removed], newChildren[i + removed], oldChildren[i + removed], i + removed);
		}
	}

	//diff on target.children[index]
	function diffDom(target, newNode, oldNode, index){
		console.log("target",target)
		console.log(index);
		console.log("oldNode",oldNode)
		console.log("newNode",newNode)

		var element;
		// error :: 
		if (!oldNode && !newNode ) return 0;
		
		// removed :: index --;
		if (oldNode && !newNode){
			//NEED :::: remove eventListner??
			target.removeChild(target.children[index]);
			return 1;
		}

		// created :: index++;
		else if (!oldNode && newNode) {
			target.appendChild(createElement(newNode));
			return 0;
		}

		// changed tag ::
		if (oldNode.tag !== newNode.tag) {
			target.replaceChild(
				createElement(newNode), 
				target.children[index]);
		}
		// same tag ::
		else {
			console.log(target);
			updateProps(
				target.children[index],
				newNode.props || {},
				oldNode.props || {});
		}
		updateChildren(target, 
			newNode.children || [], 
			oldNode.children || []);
		return 0;
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
					element.appendChild(createDom(child()));
					return 
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