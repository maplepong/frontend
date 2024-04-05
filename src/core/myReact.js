import fiberNode from "./fiberNode.js";
import { exist } from "./utils.js"

export function Link(props){
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

function makeProps(props, children){
	return {
		...props,
		children: children.length === 1 ? children[0] : children
	}
}

const myReact = {
	enrenderComponent : [], //component to render, added when useState/setState calls.
	enrenderQueue : [], // 
	callback : [], // 
	virtualDOM : null,  //root of fiberNode
	currentFiberNode : null,

	render : async function render(newVirtualDOM){
		position = 0;
		if (!this.VirtualDOM) { //first Render
			this.virtualDOM = newfiberNode.render();
			await myReactDOM.render(this.virtualDOM);
		}
		else {
			diffDOM(newVirtualDOM, this.virtualDOM);
			await myReactDOM.reconciliation(this.enrenderQueue);
			this.enrenderQueue = [];
		}
		this.callback.forEach((f) => f());
	},
	
	createElement : function createElement(tag, props, ...children){
		const vNode = new fiberNode();
		this.currentFiberNode = vNode; //tracking which Fiber is on rendering
		props = props || {};
		children = children || [];
		if (typeof tag === 'function'){
			if (children.length > 0){
				props = makeProps(props, children)
			}
			vNode.instance = (tag(props));
		}
		else{
			vNode.instance = {tag, props, children};
		}
		this.currentFiberNode = null;
		return vNode;
	},
}

export function useState(initValue){
	const fiber = myReact.currentFiberNode;
	const i = fiber.position;
	fiber.position++;
	fiber.state[i] = fiber.state[i] || initValue; 
	const setState = (value) => {
		if (fiber.state[i] === value)
			return console.log("setState err-value same-",value);
		fiber.state[i] = value;
	}
	return [fiber.state[i], setState];
}

export default myReact