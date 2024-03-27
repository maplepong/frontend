/* @jsx createElement */
import createElement from "./Element.js"
import pathList from "./PathList.js"

function router() {
	var path = window.location.pathname;

	const route = pathList[path];
	if (route === undefined) {
		renderVirtual(<Undefined />);
	}
	else {
		renderVirtual(route);
	}
}

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

function myReact(firstNode, root) {
	const states = [];
    const depsArray = [];
	let position = 0;
	const app = document.getElementById("app");
	let oldNode;
	

	console.log(firstNode);
	//init state hook
	function useState(initValue) {
		//need to check
		states.push({
			index: states.length,
			currValue : initValue,
			newValue  : null,
			isChanged : false,
			setState  : function func (nextValue){
				if (nextValue === state.currValue) return;
				console.log("cuurVal",state.currValue, nextValue);
				state.currValue = nextValue;
				console.log("cuurVal",state.currValue, nextValue);
				router();
			}
		});
		const state = states[states.length - 1];
		console.log(state);
		console.log(initValue)
		if (!state) return [null, null];
		return [state.currValue, state.setState];
		// return [states[position - 1], setState];
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
	return {renderVirtual, useState, useEffect, createDom};
}

const  {renderVirtual, useState, useEffect, createDom} = myReact();

export {createElement, renderVirtual, useState, useEffect, createDom, Link, myReact}