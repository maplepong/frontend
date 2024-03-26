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

function myReact() {
	const states = [];
	let position = 0;
	const app = document.getElementById("app");
	let rootNode;

	//init state hook
	function useState(initValue) {
		let currPosition = position;
		states[currPosition] = states[currPosition] || initValue;
        const state = states[currPosition];
		const setState = (nextValue) => {
			const retVal = nextValue;
            states[currPosition] = retVal;
			console.log('new val: ', states[currPosition]);
			position++;
			render(rootNode);
		}
		position++;
		return [state, setState];
	}

    function useEffect(callback, deps) {
        let currPosition = position;
        const oldDeps = states[currPosition];
        let hasChange = true;

        if (oldDeps) {
            hasChange = deps.some((dep, i) => !Object.is(dep, oldDeps[i]));
        }

        if (hasChange) {
            callback();
            states[currPosition] = deps;
        }
        position++;
    }

	function makeProps(props, children){
		return {
			...props,
			children: children.length === 1 ? children[0] : children
		}
	}

    // virtual DOM을 만듬
	function createElement(tag, props, ...children){ 
		if (!exist(props)) props = {};
		if (!exist(children)) children = [];
		if (typeof tag === 'function'){
            // console.log("tag:",tag);
            // console.log(props, children);
			if (children.length > 0)
				return tag(makeProps(props, children))
			return tag(props);
		}
		else {
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
	
	function render(node){
		position = 0;
		const prevApp = document.querySelector(".app");
		if (prevApp){
			prevApp.parentNode.removeChild(prevApp);
		}
		if (!exist(node) && !exist(rootNode)){
			return ;
		}
		console.log('root', rootNode, 'node', node);
		rootNode = node;
		const root = createDom(rootNode);
		root.setAttribute("class", "app");
		document.querySelector("#root").prepend(root);
    }
	
    // virtual DOM Real DOM으로 바꿈
	function createDom(node){
		//error
		if (typeof node === 'number') node = node.toString();
		if (typeof node === 'string') return document.createTextNode(node);
		// console.log(node);
		// if (!exist(node.props)) node.props = {};
		
		//create each element
		if (!exist(node.tag)){
			// console.log(node)
		}
		const element = document.createElement(node.tag);

		// console.log(node);
		//adding props to element
		if (exist(node.props)){
			Object.entries(node.props).forEach(([key, value]) => {
				if (key.slice(0, 2) === 'on') {
					element.onclick = value;
				}
				else {
					// console.log("props: ", key, value);
					element.setAttribute(key, value);
				}
			})
		}

		// add children element
		// console.log("children", node.children);
		// console.log(typeof (node.children));
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
		return element;
	}

	return {createElement, render, useState, useEffect, addEvent, createDom};
}

const  {createElement, render, useState, useEffect, addEvent, createDom} = myReact();

export {createElement, render, useState, useEffect, addEvent, createDom, Link}