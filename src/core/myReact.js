import fiberNode from "./fiberNode.js";
import myReactDOM from "./myReactDOM.js";
import createElement from "./createElement.js";
import { makeProps, exist, isEmptyObj, isEqualArray } from "./utils.js"

export function Link(props){
	// //console.log(props)
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

function createMyReact() {
	return {
	enrenderComponent : [],
	enrenderQueue : [], //what is changed {changedhow, component, props}
	callback : [], // will be called after reRender
	fiberRoot : null,  //root of fiberNode
	currentFiberNode : null,

	render : async function render(newVirtualDOM){
		if (!this.fiberRoot) { //first Render, called by DOM
			this.fiberRoot = newVirtualDOM;
			await myReactDOM.initDOM(this.fiberRoot);
		}
		else {//변화하는 경우 : 이게 enrenderQueue에 들어가있을때밖에 없나???
			//re-render....
			//is it reRender or 
		const newFiberRoot = this.reRender(this.fiberRoot);
		// this.diffRoot(this.FiberRoot); //enrenderQueue를 통해 바뀐 부분 찾기
		// await myReactDOM.updateDOM(this.enrenderQueue); //나중에 바뀐 부분만 보낼 수 있게...업데이트 할 수 있으면...좋고...
		await myReactDOM.updateDOM(newFiberRoot);
		this.fiberRoot = newFiberRoot;
		this.enrenderQueue = [];
		}
		console.log(this.callback);
		// 1. call callback
		// 2. if cleanup exist -> save it to the useState. it will be used in unmount
		// 3. empty the callback arr
		// f ->  {callback, fiber.willUnmount} 
		this.callback.forEach((f) => {
			f.willUnmount.forEach((cleanup) => cleanup());
			f.willUnmount = [];
			console.log(f);
			const cleanup = f.callback();
			cleanup ? f.willUnmount.push(cleanup) : null });
		this.callback = [];
	},

	erase : function erase() {
		removeFiberRoot();
		this.enrenderComponent = []
		this.enrenderQueue = []
		this.callback = []
	},
	
	createElement : createElement,

	reRender : function (oldfiber) {
		const fiber = new fiberNode();
		//new fiber state value update && copy values of old fiber
		//if fiber changed? call instance
		//console.log("state", fiber.state);
		fiber.getInfo(oldfiber);
		if (fiber.changed){
			//console.log("changedState", fiber.changedState)
			fiber.changedState.forEach(d => {
				//console.log(d)
				fiber.state[d.i] = d.value;
				//console.log("fiber updated state" , fiber.state);
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
		//console.log(fiber);
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
}

const myReact = createMyReact();
export default myReact; 


export function useState(initValue){
	const fiber = window.currentFiberNode;
	console.log(fiber);
	const i = fiber.statePosition;
	fiber.statePosition++;
	// //console.log("useState", fiber.state[i]);
	fiber.state[i] = fiber.state[i] || initValue;
	const setState = (value) => {
		if (fiber.state[i] === value)
			return //console.log("setState err-value same-",value);
		fiber.changedState.push({i, value});
		myReact.enrenderComponent.push(fiber);
		// myReact.enrenderQueue.append(["stateChange", fiber, i]);
		fiber.changed = true;
		myReact.render();
		//render, how I can get the infomation of current page?
		// //console.log("setState", fiber);
	}
	return [fiber.state[i], setState];
}

/*
	callback -> return f is cleanup function, use carefully
	cleanup calls when :
	1. idk..... will update this later
*/
export function useEffect(callback, deps){
	const fiber = window.currentFiberNode;
	console.log(fiber);
	const i = fiber.effectPosition;
	fiber.effectPosition++;
	//check if fiber has this callback as use
	if (!fiber.useEffect[i] || isEmptyObj(fiber.useEffect[i])){ //first call of this useState
		fiber.useEffect[i] = { callback, deps: deps || [], cleanup: null};
	}
	//if cleanup exist -> runs at
	// 1. before reRender 
	// 2. before unMount this component
	else if (fiber.useEffect[i].cleanup) {
		fiber.useEffect[i].cleanup();
	}

	/* 	
	
	check if callback need to queue
	1. no deps -> call for one time, erase useEffect
	2. dep || func change -> enqueue callback,
	if return(cleanup) exist, add to fiber obj...
	
	after calling callback, if cleanUp exist,
	save cleanUp as a 3rd value.
	
	*/

	if (!deps || isEmptyObj(deps)){
		console.log("case 1", deps);
		myReact.callback.push({callback, willUnmount: fiber.willUnmount});
	}
	else if (!isEqualArray(fiber.useEffect[i].deps, deps))
	//after first call, check if dep has changed
		console.log("case 2", fiber.useEffect.deps, deps);
		myReact.callback.push({callback, willUnmount: fiber.willUnmount});	
	
	fiber.useEffect = {callback, deps, cleanup : null};
}
