/* @jsx createElement */
import {createDom, addEvent, renderVirtual} from "./myReact.js";
import router  from "./Router.js";

function exist(para) {
	if (typeof para === "undefined" || para === null || para === undefined){
		return false;
	}
	return true;
}	

class Root{
	_rootElement;
	constructor(rootElement){
		this._rootElement = rootElement;
	}
	//first render
	render(jsxNode) {
		// console.log(jsxNode);
		if (!exist(jsxNode)) {
			// console.log("render err");
			// console.log("node", jsxNode)
			return ;
		}

		const node = createDom(jsxNode);
		this._rootElement.appendChild(node);
		// renderVirtual(jsxNode);

        
		addEvent(this._rootElement, "click", "[data-route]", ({ target }) => {
			const route = target.dataset.route;
			if (route) {
				const newPath = "/" + route;
				history.pushState({}, "", newPath);
				router();
			}} )
			
		addEvent(this._rootElement, "click", "a", ({ target }) => {
			const route = target.closest("a").href;
			if (route) {
				history.pushState({}, "", route);
				router();
			}} )
            
        addEvent(this._rootElement, "click", null, ({ target }) => {
            console.log(target, '123');
        })
    
    }
};

class MyReactDOM{
	root;
	static createRoot(rootElement){
		// 초기 페이지 로드 시 라우터 호출
		document.addEventListener("DOMContentLoaded", () => {
			window.addEventListener("routeChange", router);
			window.addEventListener("popstate", router);
			router();
		});
		this.root = new Root(rootElement);
		if (!exist(this.root)){
			console.error("ROOT: cannot find");
			return undefined;
		}
		return this.root;
	}
	
}

export {MyReactDOM, Root};