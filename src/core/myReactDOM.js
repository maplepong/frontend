import myReact from "./myReact";
import { exist, isEmptyObj } from "./utils.js"


function addProps(node, fNode){
	if (exist(fNode.props)){
		Object.entries(fNode.props).forEach(([key, value]) => {
			if (key.slice(0, 2) === 'on') {
				node.onclick = value;
			}
			else {
				node.setAttribute(key, value);
			}
		})
	}
}

function addChildren(node, fNode){
	if (exist(fNode.children) && isEmptyObj(fNode.children)) {
		fNode.children.forEach(child => {
			if (typeof child === 'function') {
				return node.appendChild(createDOM(child()));
			}
			let childNode;
			if (checkState(child)){
				if (child.changed)
					child.render();
				childNode = document.createTextNode(child.state);
			}
			else 
				childNode = createDOM(child); 
			if (exist(childNode)) 
				node.appendChild(childNode);
		})
	}
}



function createDOM(fNode) {
	if (typeof fNode === 'number') fNode = fNode.toString();
	if (typeof fNode === 'string') return document.createTextNode(node);
	console.log(fNode.instance);
	const node = document.createElement(fNode.instance.tag);

	addProps(node, fNode);

	addChildren(node, fNode);
	
	return node;
}

export class Root {
	rootNode;
	app;
	render(fNode){ //first Render
		const DOM = createDOM(fNode);
	}
	reconciliate(changed){} // changed 어떻게 전달할지?
}
export default class myReactDOM {
	root;
	static createRoot(rootNode){
		this.root = new Root;
		this.root.rootNode = rootNode;
		this.myReact = myReact;
		return this.root;
	}
}
