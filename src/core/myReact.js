import fiberNode from "./fiberNode.js";
import myReactDOM from "./myReactDOM.js";
import { exist, isEmptyObj } from "./utils.js"

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
	enrenderComponent : [],
	enrenderQueue : [], //what is changed {changedhow, component, props}
	callback : [], // 
	fiberRoot : null,  //root of fiberNode
	currentFiberNode : null,

	render : async function render(newVirtualDOM){
		if (!this.fiberRoot) { //first Render, called by DOM
			this.fiberRoot = newVirtualDOM;
			await myReactDOM.root.initDOM(this.fiberRoot);
		}
		else {//변화하는 경우 : 이게 enrenderQueue에 들어가있을때밖에 없나???
			//re-render....
			//is it reRender or 
		const newFiberRoot = this.reRender(this.fiberRoot);
		// this.diffRoot(this.FiberRoot); //enrenderQueue를 통해 바뀐 부분 찾기
		// await myReactDOM.updateDOM(this.enrenderQueue); //나중에 바뀐 부분만 보낼 수 있게...업데이트 할 수 있으면...좋고...
		await myReactDOM.root.updateDOM(newFiberRoot);
		this.fiberRoot = newFiberRoot;
		this.enrenderQueue = [];
		}
		this.callback.forEach((f) => f());
	},

	erase : function erase() {
		removeFiberRoot();
		this.enrenderComponent = []
		this.enrenderQueue = []
		this.callback = []
	},
	
	createElement : function createElement(tag, props, ...children){
		const fiber = new fiberNode();
		var instance;
		window.currentFiberNode = fiber; //tracking which Fiber is on rendering
		props = props || {};
		children = children || [];
		if (typeof tag === 'function'){
			fiber.instance = tag;
			if (children.length > 0){
				props = makeProps(props, children)
			}
			instance = (tag(props));
		}
		else{
			instance = {tag, props, children};
		}
		fiber.tag = instance.tag;
		fiber.props = instance.props;
		fiber.children = instance.children;
		window.currentFiberNode = null;
		return fiber;
	},

	// code: updates fiber by call instance function
	// reRender : function (fiber) {
	// 	if (fiber === undefined) return;
	// 	if (fiber.changed === true){
	// 		window.currentFiberNode = fiber;
	// 		fiber.position = 0;
	// 		const instance = fiber.instance(fiber.props);
	// 		//삭제해야하는거 챙겨야할수도??
	// 		fiber.tag = instance.tag;
	// 		fiber.props = instance.props;
	// 		fiber.children = instance.children;
	// 		fiber.changed = false;
	// 		window.currentFiberNode = null;
	// 	}
	// 	else {
	// 		fiber.children.forEach((child) => {
	// 			this.reRender(child);
	// 		})
	// 	}
	// },
	reRender : function (oldfiber) {
		const fiber = new fiberNode();
		//new fiber state value update && copy values of old fiber
		//if fiber changed? call instance
		console.log("state", fiber.state);
		fiber.getInfo(oldfiber);
		if (fiber.changed){
			console.log("changedState", fiber.changedState)
			fiber.changedState.forEach(d => {
				console.log(d)
				fiber.state[d.i] = d.value;
				console.log("fiber updated state" , fiber.state);
			})
			fiber.changedState = [];
			fiber.changed = false;
			window.currentFiberNode = fiber;
			const instance = fiber.instance(fiber.props);
			fiber.tag = instance.tag;
			fiber.props = instance.props;
			fiber.children = instance.children;
			window.currentFiberNode = null;
		}
		else {
			oldfiber.children.forEach((child) => {
				if (typeof child === "number" || typeof child === "string"){
					fiber.children.push(child);
				}
				else {
					fiber.children.push(this.reRender(child));
				}

			})
		}
		console.log(fiber);
		return fiber;
	},

	/* 현재의 fiberRoot, newFiberRoot 비교해서
	만약 바뀐 부분 있으면 enrenderQueue에 추가
	전부 비교한 후 Root 대체

	*/
	diffRoot : function (newFiberRoot) {
		this.fiberRoot = newFiberRoot;
	}
}

export function useState(initValue){
	const fiber = window.currentFiberNode;
	const i = fiber.position;
	fiber.position++;
	// console.log("useState", fiber.state[i]);
	fiber.state[i] = fiber.state[i] || initValue;
	const setState = (value) => {
		if (fiber.state[i] === value)
			return console.log("setState err-value same-",value);
		fiber.changedState.push({i, value});
		myReact.enrenderComponent.push(fiber);
		// myReact.enrenderQueue.append(["stateChange", fiber, i]);
		fiber.changed = true;
		myReact.render();
		//render, how I can get the infomation of current page?
		// console.log("setState", fiber);
	}
	return [fiber.state[i], setState];
}

export default myReact