import fiberNode from "./fiberNode";
import { isEmptyObj, isEqualArray } from "./utils";
/*
	callback -> return f is cleanup function, use carefully
	cleanup calls when :
	1. rerender & calling this callback
	2. unmount this component
*/
export function useEffect(callback, deps){
	const fiber = window.currentFiberNode;
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
		myReact.callback.push({callback, willUnmount: fiber.willUnmount});
	}
	else if (!isEqualArray(fiber.useEffect[i].deps, deps))
	//after first call, check if dep has changed
		myReact.callback.push({callback, willUnmount: fiber.willUnmount});
		fiber.useEffect[i].deps = deps;
}
