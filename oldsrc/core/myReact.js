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


export default function myReact() {
	const state = [];
	let position = 0;
	const app = document.getElementById("app");
	let rootNode;
	
	function render(node){
		position = 0;
		const prevRoot = document.querySelector(".root");
		if (prevRoot){
			prevRoot.parentNode.removeChild(prevRoot);
		}
		console.log(node);
		if (!exist(node) && !exist(rootNode)){
			console.log("render err");
			console.log("node", node)
			console.log("node", rootNode)
			return ;
		}
		rootNode = node;
		const root = createDom(rootNode);
		console.log(root)
		root.setAttribute("class", "root");
		app.appendChild(root);
		console.log("render:", renderMain);
	}
	function renderMain(node){
		position = 0;
		const root = document.querySelector("main");
		if (prevRoot){
			const newRoot = document.createElement("main");
			root.parentNode.appendChild(newRoot);
			root.parentNode.removeChild(root);
		}
		console.log(node);
		if (!exist(node) && !exist(rootNode)){
			console.log("render err");
			console.log("node", node)
			console.log("node", rootNode)
			return ;
		}
		rootNode = node;
		
		const rootChild = createDom(rootNode);
		console.log(root)
		root.setAttribute("class", "root");
		root.appendChild(rootChild);
	}

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

	function createDom(node){
		//error
		if (typeof node === 'number') node = node.toString();
		if (typeof node === 'string') return document.createTextNode(node);

		
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
				if (childElement) element.appendChild(childElement);
			})
		}
		return element;
	}
	function addEvent(target, eventType, selector, callback) {
		const children = [...document.querySelectorAll(selector)];
		target.addEventListener(eventType, event => {
		  event.preventDefault();
		  if (!event.target.closest(selector)) return false;
		  callback(event);
		});
	  }

	return {createElement, render, useState, addEvent, renderMain};
}


//렌더하기 위한 노드를 받아 세팅이 가능한 리액트 돔 API 제공
class Root {
	render;
	constructor(rootNode){
		if (rootNode == null){
			console.error("ROOT: no root-node imported")
			return;
		}
		const {render} = R();
		this.render = render;
	}
	render(vDom){
		this.render(vdom);
	}
}