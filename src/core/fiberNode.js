export default class fiberNode {
	constructor() {
		this.tag = "";
		this.props = {};
		this.children = []; // Child component
       
		this.sibling = []; // Sibling component
        this.return = null; // Parent component
        this.stateNode = null; // Associated DOM node or component state
		this.state = []; //useState state
		this.statePosition = 0; //useState position
		this.instance = null;
		this.changed = false;
		this.changedState = [];
		
		this.isEvent = false; // eventListner added?
		this.useEffect = []; //useEffect state : {callback f, deps []};
		this.willUnmount = []; // cleanup arr;
		this.effectPosition = 0; //useEffect position
    }
	getInfo(oldFiber){
		this.stateNode = oldFiber.stateNode;
		this.state = oldFiber.state;
		this.instance = oldFiber.instance;
		this.tag = oldFiber.tag;
		this.props = oldFiber.props;

		this.changedState = oldFiber.changedState;
		oldFiber.changedState = [];
		this.changed = oldFiber.changed;
		oldFiber.changed = false;
		

		this.isEvent = oldFiber.isEvent;
		this.useEffect = oldFiber.useEffect;
		if(this.tag ==="div"){
			console.log("new useEffect", this.useEffect)
			console.log("old useEffect", oldFiber.useEffect)
		}
		this.willUnmount = oldFiber.willUnmount;
	}

    render(parentNode) { // setting fiberNode values, not real rendering
	// if (!stateNode) { // first Render
	 //부모 노드에 대한 처리
	// this.return.return.appendChild(this.stateNode);??
	this.return = parentNode;
	parentNode.children.array.forEach(element => {
		this.child.append(element);
		element.sibling.append(this);
	});

	//자식 노드에 대한 처리
	this.instance.children.forEach((child) => {
		this.children.append(child.render(this));
		console.log(this.children)
	})
	return this;
		// }
	}
	compare(fiber){
		
	}
}