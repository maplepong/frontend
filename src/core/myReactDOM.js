import myReact from "./myReact";
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
	console.log("tag", fNode.tag, exist(fNode.props), !isEmptyObj(fNode.props))
	if (exist(fNode.props) && !isEmptyObj(fNode.props)){
		Object.entries(fNode.props).forEach(([key, value]) => {
			if (key.slice(0, 2) === 'on') {
				// node.onclick = value; //!!!! onClick말고 다른거쓰면 어쩔려고
				addEvent(node,"click",null, value)
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
			console.log(child);
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
	// console.log(fNode);
	const node = document.createElement(fNode.tag);
	fNode.stateNode = node;
	addProps(node, fNode);
	addChildren(node, fNode);
	return node;
}

/*
	queue: 바뀐 fNode들의 array
 */
// function locateDOM(node, queue){
// 	for (fNode in queue){
// 		if (fNode.stateNode === node){
// 			diffDOM(node, fNode);
// 			queue.remove(fNode);
// 		}
// 	}
// 	for (child in node.children){
// 		locateDOM(child, queue);
// 	}
// }

// function diffDOM(node, fNode){
// 	if (node.type !== fNode.tag) {
		
// 		node = document.createElement(fNode.tag);
// 	}
// }
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
	
	// removed :: index --;
	if (oldfNode && !newfNode){
		//NEED :::: remove eventListner??
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

export class Root {
	rootNode;
	DOM;
	fiberRoot;
	render(fNode){ //just send fNode to myReact
		myReact.render(fNode);
	}
	initDOM(fNode){
		this.fiberRoot = fNode;
		this.DOM = createDOM(fNode);
		this.rootNode.appendChild(this.DOM);
	}
		// updateDOM(enrenderQueue){
	// 	diffDOM(this.DOM, enrenderQueue);
	// }
	updateDOM(newFiberRoot){
		console.log("HEEHEH", newFiberRoot);
		diffDom(this.rootNode, newFiberRoot, this.fiberRoot, 0);
	}
	erase(){
		this.rootNode.removeChild(this.DOM);
		this.DOM = null;
		myReact.erase();
	}
}
export default class myReactDOM {
	root;
	static createRoot(rootNode){
		this.root = new Root;
		this.root.rootNode = rootNode;
		return this.root;
	}
	

	reconciliate(){} // changed 어떻게 전달할지?
}
