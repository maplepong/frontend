export function exist(para) {
	if (typeof para === "undefined" || para === null || para === undefined){
		return false;
	}
	if (typeof para === "string" && para.isEmpty)
		return false;
	return true;
}	


//for object check is empty?
export function isEmptyObj(para){
	if (typeof para === "object" || Array.isArray(para)){
		if (para.length === 0)
			{return true;}
	}
	return false;
}

export function isEmptyArray(para){
	if (Array.isArray(para)){
		if (para.length === 0) {
			
		}
	}
}

//equal test for array 
export function isEqualArray (a, b) {
	if (!Array.isArray(a) || ! Array.isArray(b)){
		return false;
	}
	if (a.length === 0 && b.length === 0)
		return true;
	return a.length && b.length && 
		a.every((v, i) => v === b[i])
}

export function makeProps(props, children){
	return {
		...props,
		children: children.length === 1 ? children[0] : children
	}
}