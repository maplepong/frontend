import fiberNode from "./fiberNode";
import {makeProps} from "./utils"

export default function createElement(tag, props, ...children){
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
}