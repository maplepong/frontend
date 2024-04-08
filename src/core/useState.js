import fiberNode from "./fiberNode";

export function useState(initValue){
	const fiber = window.currentFiberNode;
	const i = fiber.statePosition;
	fiber.statePosition++;
	fiber.state[i] = fiber.state[i] || initValue;
	const setState = (value) => {
		if (fiber.state[i] === value)
			return //console.log("setState err-value same-",value);
		fiber.changedState.push({i, value});
		myReact.enrenderComponent.push(fiber);
		// myReact.enrenderQueue.append(["stateChange", fiber, i]);
		fiber.changed = true;
		myReact.render(null, "reRender");
		//render, how I can get the infomation of current page?
	}
	return [fiber.state[i], setState];
}
