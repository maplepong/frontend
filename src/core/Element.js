function makeProps(props, children){
	return {
		...props,
		children: children.length === 1 ? children[0] : children
	}
}

export default function createElement(tag, props, ...children){
	props = props || {};
	children = children || [];
	if (typeof tag === 'function'){
		if (children.length > 0){
			// console.log(tag(props));
			return tag(makeProps(props, children))
		}
		// console.log(tag(props));
		return tag(props);
	}
	else{
		// console.log({tag, props, children});
		return ({tag, props, children});
	}
}