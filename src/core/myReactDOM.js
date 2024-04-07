import myReact from "./myReact.js";
import router from "./Router.js";
import { exist, isEmptyObj } from "./utils.js"

function addEvent(target, eventType, selector, callback) {
	const children = [...document.querySelectorAll(selector)];
	target.addEventListener(eventType, event => {
		event.preventDefault();
		if (selector && !event.target.closest(selector)) return false;
		callback(event);
	});
}

function addProps(node, fNode){
	//console.log("tag", fNode.tag, exist(fNode.props), !isEmptyObj(fNode.props))
	if (exist(fNode.props) && !isEmptyObj(fNode.props)){
		Object.entries(fNode.props).forEach(([key, value]) => {
			if (key.slice(0, 2) === 'on') {
				node.onclick = value; //!!!! onClick말고 다른거쓰면 어쩔려고
				// addEvent(node,"click",null, value)
			}
			else {
				node.setAttribute(key, value);
			}
		})
	}
}

function addChildren(node, fNode){
	if (exist(fNode.children) && !isEmptyObj(fNode.children)) {
		fNode.children.forEach(child => {
			//console.log(child);
			if (typeof child === 'number') 
				child = child.toString();
			if (typeof child === 'string'){
				child = document.createTextNode(child);
				node.appendChild(child);
			}
			else
				node.appendChild(createDOM(child));
		})
	}
}



function createDOM(fNode) {
	// //console.log(fNode);
	const node = document.createElement(fNode.tag);
	fNode.stateNode = node;
	addProps(node, fNode);
	addChildren(node, fNode);
	return node;
}

function updateProps(target, newProps, oldProps){
	for (const [key, value] of Object.entries(newProps)){
		if (key.slice(0, 2) === 'on') {
			target.onclick = value; //!!!! onClick말고 다른거쓰면 어쩔려고
			// addEvent(target,"click",null, value);
		}
		else if (oldProps[key] === newProps[key]) continue;
		else target.setAttribute(key, value);
	}
	for (const [key, value] of Object.entries(oldProps)){
		// if (key.slice(0, 2) === 'on') {
		// 	// node.onclick = value; //!!!! onClick말고 다른거쓰면 어쩔려고
		// 	target.removeEventListener("click", value);
		// }
		if (oldProps[key] === newProps[key]) continue;
		else target.removeAttribute(key);
	}
}
function updateChildren(target, newChildren, oldChildren){
	const maxLength = Math.max(newChildren.length , oldChildren.length);
	for (let i = maxLength - 1; i >= 0; i--){
		let newChild = newChildren[i];
		if (typeof newChild === "string" || 
			typeof newChild ==="number"){
				target.replaceChild(
					document.createTextNode(newChildren[i]),
					target.childNodes[i]);
				return ;
			}
		diffDom(target, newChildren[i], oldChildren[i], i);
	}
}

//parent: DOM node
function diffDom(parent, newfNode, oldfNode, index){
	var element;
	// error :: 
	if (!oldfNode && !newfNode ) return 0;
	
	// removed :: unmount
	if (oldfNode && !newfNode){
		// Need to remove EventListner or onClick;
		if (oldfNode.isEvent){}; 
		if (!isEmptyObj(oldfNode.willUnmount)){
			oldfNode.willUnmount.forEach((c) => { c() })
		}
		return parent.removeChild(parent.childNodes[index]);
	}

	// created :: index++;
	else if (!oldfNode && newfNode) {
		return parent.prepend(createDOM(newfNode));
	}

	// changed tag ::
	if (oldfNode.tag !== newfNode.tag) {
		parent.replaceChild(
			createDOM(newfNode), 
			parent.childNodes[index]);
	}
	// same tag ::
	else {
		if (newfNode.tag === "button" )
			//console.log(newfNode.props);
		updateProps(
			parent.childNodes[index],
			newfNode.props || {},
			oldfNode.props || {});
		updateChildren(
			parent.childNodes[index], 
			newfNode.children || [], 
			oldfNode.children || []);
	}
	
	return ;
}

function createMyReactDOM (){
	return {
	rootNode : document.querySelector("#root"),
	DOM : null,
	fiberRoot: null,

	initDOM : function initDOM(fNode){
		document.addEventListener("DOMContentLoaded", () => {
			window.addEventListener("routeChange", router);
			window.addEventListener("popstate", router);
		});
		if (!exist(this.rootNode)){
			return console.error("ROOT: cannot find");
		}
		addEvent(this.rootNode, "click", "[data-route]", ({ target }) => {
			const route = target.dataset.route;
			if (route) {
				const newPath = "/" + route;
				history.pushState({}, "", newPath);
				router();
			}} )
			
		addEvent(this.rootNode, "click", "a", ({ target }) => {
			const route = target.closest("a");
			console.log("routing?",target)
			if (route) {
				const newPath = "/" + route;
				history.pushState({}, "", newPath);
				router();
			}})

		this.fiberRoot = fNode;
		this.DOM = createDOM(fNode);
		this.rootNode.appendChild(this.DOM);
	},
	updateDOM: function updateDOM(newFiberRoot){
		// //console.log("HEEHEH", newFiberRoot);
		diffDom(this.rootNode, newFiberRoot, this.fiberRoot, 0);
	},
	erase(){
		this.rootNode.removeChild(this.DOM);
		this.DOM = null;
		myReact.erase();
	},
	reconciliate(){}, // changed 어떻게 전달할지?
	}
}

const myReactDOM = createMyReactDOM();
export default myReactDOM;
