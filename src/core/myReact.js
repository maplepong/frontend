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
    const depsArray = [];
	let position = 0;
	const app = document.getElementById("app");
	let oldNode;

	//init state hook
	function useState(initValue) {
		let currPosition = position;
		states[currPosition] = states[currPosition] || initValue;
        const state = () => {
            return states[currPosition];
        }
		const setState = (nextValue) => {
            if (states[currPosition] === nextValue)
                return ;
            states[currPosition] = nextValue;
            const root = createDom(oldNode);
			renderVirtual(oldNode);
		}
        position++;
		return [state, setState];
	}

    function useEffect(callback, deps) {
        let currPosition = position;
        const oldDeps = states[currPosition];
        let hasChange = true;

        console.log('oldDeps', oldDeps);

        if (oldDeps) {
            hasChange = deps.some(
              (dep, i) => !Object.is(dep, oldDeps[i])
            );
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
	
	function renderVirtual(node){
		position = 0;
		const rootNode = document.querySelector("#root");
		const prevApp = rootNode.children[0];
		if (prevApp){
			prevApp.parentNode.removeChild(prevApp);
		}
		// console.log(node);
		if (!exist(node) && !exist(oldNode)){
			// console.log("renderVirtual err");
			// console.log("node", node)
			// console.log("node", oldNode)
			return ;
		}
		if (!exist(oldNode)){
			const dom = createDom(node);
			rootNode.appendChild(dom);
			oldNode = node;
			// return;
		}

		diffIndex = 0;
		diffDom(oldNode, node, rootNode);
		oldNode = node;
		const root = createDom(node);
		root.setAttribute("class", "app");
		rootNode.prepend(root);
    }

	var diffIndex = 0;
	function diffDom(oldNode, newNode, parentNode){
		console.log("parentNode", parentNode,  diffIndex);
		console.log("oldNode", oldNode);
		console.log("newNode", newNode);
		var index = diffIndex;
		var element;
		// error :: 
		if (!oldNode && !newNode) return;
		
		// removed :: newNode No longer exist
		if (oldNode && !newNode){
			//NEED :::: remove eventListner??
			parentNode.removeChild(parentNode.children[index]);
			index--;
			return;
		}

		// created :: no oldNode
		else if (!oldNode && newNode) {
			element = document.createElement(newNode.tag);
			parentNode.appendChild(element);
			index++;
			addProps(element, newNode);
			return ;
		}

		else if (oldNode && newNode ) {
			// changed tag ::
			if (oldNode.tag !== newNode.tag) {
				element = document.createElement(newNode.tag);
				parentNode.replaceChild(element, parentNode.children[index]);
				addProps(element, newNode);
			}
			// same tag ::
			else {
				element = parentNode.children[index];
				// diff props
				if (oldNode.props)
				{
					var propIndex = 0;
					console.log(oldNode.props);
					const oldKeys = Object.keys(oldNode.props);
					const newKeys = Object.keys(newNode.props);
					while (oldNode.props[oldKeys[propIndex]] || newNode.props[newKeys[propIndex]]) {
						// created
						if (!oldNode.props[oldKeys[propIndex]]){
							element.setAttribute(newKeys[propIndex], newNode.props[newKeys[propIndex]]);
						}
						// deleted
						else if (!newNode.props[newKeys[propIndex]]){
							element.removeAttribute(oldKeys[propIndex]);
						}
						// same key / diffrent value
						else if (oldKeys[propIndex] === newKeys[propIndex]){
							if (oldNode.props[oldKeys[propIndex]] !== newNode.props[newKeys[propIndex]]){
								element.getAttributeNode(oldKeys[propIndex]).value = newNode.props[propIndex];
							}
						}
						// diffrent key
						else {
							element.removeAttribute(oldKeys[propIndex]);
							element.setAttribute(newKeys[propIndex], newNode.props[newKeys[propIndex]]);
						}
						propIndex++;
					}
				}
			}
		}
		var childrenIndex = 0;
		if (!oldNode.children){
			addChildren(element, newNode);
		}
		else if (oldNode.children && newNode.children){
			while (oldNode.children[childrenIndex] || newNode.children[childrenIndex]) {
				diffIndex = childrenIndex;
				diffDom(oldNode.children[childrenIndex], newNode.children[childrenIndex], element);
				childrenIndex = diffIndex;
				childrenIndex++;
			}
		}
		index++;
		diffIndex = index;
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

export {createElement, renderVirtual, useState, useEffect, addEvent, createDom, Link}