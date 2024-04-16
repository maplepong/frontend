import myReact from "./myReact.js";
import router from "./Router.js";
import { exist, isEmptyObj } from "./utils.js"

const eventType = [
    "onclick",
    "onkeydown",
    "onkeyup",
    "oninput",
    "onfocus",
    "onblur",
    "onchange",
]

function addEvent(target, eventType, selector, callback) {
	const children = [...document.querySelectorAll(selector)];
	target.addEventListener(eventType, event => {
		event.preventDefault();
		if (selector && !event.target.closest(selector)) return false;
		callback(event);
	});
}


function createDOM(fNode) {
	const node = document.createElement(fNode.tag);
	fNode.stateNode = node;
	updateProps ( node,	fNode.props || {}, null);
	updateChildren ( node, fNode.children || [], null)
	return node;
}

function updateProps(target, newProps, oldProps){
	if (oldProps){
		for (const [key, value] of Object.entries(oldProps)){
			// if (key.slice(0, 2) === 'on') {
			// 	// node.onclick = value; //!!!! onClick말고 다른거쓰면 어쩔려고
			// 	target.removeEventListener("click", value);
			// }
			if (oldProps[key] === newProps[key]) continue;
			else target.removeAttribute(key);
		}
	}
	for (const [key, value] of Object.entries(newProps)){
		if (eventType.find((e) => ( e === key.toLowerCase()))) {
			target[key.toLowerCase()] = value;
		}
		else if (oldProps && oldProps[key] === newProps[key]) continue;
		else target.setAttribute(key, value);
	}
}

function updateChildren(target, newChildren, oldChildren){
	if (oldChildren) {
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
		return ;
	}
	else { //add new
		if (!newChildren || newChildren.length === 0) return;
		newChildren.forEach(child => {
			if (typeof child === 'number') 
				child = child.toString();
			if (typeof child === 'string'){
				child = document.createTextNode(child);
				target.appendChild(child);
			}
			else
				target.appendChild(createDOM(child));
		})
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
		// if (newfNode.tag === "button") ///???? what????why????
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
	inited: false,

	initDOM : function initDOM(fNode){
		if (this.inited === false) {
			document.addEventListener("DOMContentLoaded", () => {
				window.addEventListener("routeChange", router);
				window.addEventListener("popstate", router);
				});
				this.inited = true;
			addEvent(this.rootNode, "click", "a", ({ target }) => {
				const route = target.closest("a").getAttribute('href');
				console.log("routing?", route)
				if (typeof route === "string") {
					const newPath = "/" + route;
					console.log(newPath);
					history.pushState({}, "", newPath);
					router();
				}}
			)
		}
		if (!exist(this.rootNode)){
			return console.error("ROOT: cannot find");
		}	
		this.fiberRoot = fNode;
		this.DOM = createDOM(fNode);
		this.rootNode.appendChild(this.DOM);

	},
	updateDOM: function updateDOM(newFiberRoot){
		// //console.log("HEEHEH", newFiberRoot);
		diffDom(this.rootNode, newFiberRoot, this.fiberRoot, 0);
	},
	erase(){
		if(this.DOM)
			this.rootNode.removeChild(this.DOM);
		this.DOM = null;
		myReact.erase();
	},
	reconciliate(){}, // changed 어떻게 전달할지?
	}
}

const myReactDOM = createMyReactDOM();
export default myReactDOM;
