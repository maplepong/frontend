function exist(para) {
	if (typeof para === "undefined" || para === null || para === undefined){
		return false;
	}
	return true;
}	

function isEmpty(para){
	if (typeof para === "object"){
		if (para.length === 0 || typeof para[0] === "undefined")
			{return false;}
	}
	return true;
}

function myReact() {
	const state = [];
	let position = 0;
	const app = document.getElementById("app");
	let rootNode;
	
	//init state hook
	function useState(initValue) {
		let currPosition = position;
		if (state.length == position) {
			state.push(undefined);
		}
		
		if (state[currPosition] === undefined) {
			state[currPosition] = initValue;
		}
		position++;
		const _state = () => {
			return state[currPosition];
		}
		const _setState = (nextValue) => {
			state[currPosition] = nextValue;
			render(rootNode);
		}
		return [_state, _setState];
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
	
	function render(node){
		position = 0;
		const prevApp = document.querySelector(".app");
		if (prevApp){
			prevApp.parentNode.removeChild(prevApp);
		}
		// console.log(node);
		if (!exist(node) && !exist(rootNode)){
			console.log("render err");
			console.log("node", node)
			console.log("node", rootNode)
			return ;
		}
		rootNode = node;
		const root = createDom(rootNode);
		console.log(root)
		root.setAttribute("class", "app");
		document.querySelector("#root").appendChild(root);
	}
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
		console.log(node);
		//adding props to element
		if (exist(node.props)){
			Object.entries(node.props).forEach(([key, value]) => {
				if (key.slice(0, 2) === 'on') {
					element.onclick = value;
				}
				else {
					element.setAttribute(key, value);
				}
			})
			// node.children.forEach(child => element.appendChild(createDom(child)))
			// return element;
			// Object.entries(node.props)
			// .forEach(([name, value]) => element.setAttribute(name, value));
		}

		//add children element
		if (exist(node.children) && isEmpty(node.children)){
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

	return {createElement, render, useState, addEvent, createDom};
}

const  {createElement, render, useState, addEvent, createDom} = myReact();

export {createElement, render, useState, addEvent, createDom}