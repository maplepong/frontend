import vnode from "./createVdom.js"

function makeProps(props, children){
	return {
		...props,
		children: children.length === 1 ? children[0] : children
	}
}

function createElement(tag, props, ...children){
	console.log(children);
	props = props || {};
	children = children || [];
	if (typeof tag === 'function'){
		if (children.length > 0){
			// console.log(tag(props));
			return tag(makeProps(props, children))
		}
		return tag(props);
	}
	else{
		return ({tag, props, children});
	}
}

export default createElement