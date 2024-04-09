export default class fiberNode {
	constructor(ref) {
		if (!ref){ //create empty
			//basic infomation
			this.tag = "";
			this.props = {};
			this.children = []; // Child component
			this.instance = null;
		   
			//connected component
			this.sibling = []; // Sibling component
			this.return = null; // Parent component
			this.stateNode = null; // Associated DOM node or component state
			
			//state
			this.state = []; //useState state
			this.changed = false; // is any state changed?
			this.changedState = []; // state which changed
			this.statePosition = 0; //useState position
			
			this.useEffect = []; //useEffect state : {callback f, deps []};
			this.willUnmount = []; // cleanup arr;
			this.effectPosition = 0; //useEffect position

			//event
			this.isEvent = false; // eventListner added?
		}
		else { //copy from ref
			//basic infomation
			this.tag = ref.tag;
			this.props = ref.props || {};
			this.children = []; // Child component
			this.instance = ref.instance; //comp function
		   
			//connected component
			this.sibling = []; // Sibling component
			this.return = null; // Parent component
			this.stateNode = ref.stateNode // Associated DOM node or component state
			
			//state
			this.state = ref.state; //useState state
			this.changed = ref.changed; // is any state changed?
			this.changedState = ref.changedState; // state which changed
			this.statePosition = 0; //useState position'
			if (ref.changed){
				ref.changed = false;
				ref.changedState = [];
			}
			
			this.useEffect = ref.useEffect; //useEffect state : {callback f, deps []};
			this.willUnmount = ref.willUnmount;; // cleanup arr;
			this.effectPosition = 0; //useEffect position

			//Event 
			this.isEvent = ref.isEvent; // eventListner added?
		}
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
	compareFiber(ref) {
			this.tag === ref.tag ? null : console.log("comparefiber Error: tag", this.tag, ref.tag);
			this.props === ref.props ? null : console.log("comparefiber Error: props", this.props, ref.props);
			this.children === ref.children ? null : console.log("comparefiber Error: children", this.children, ref.children);
			this.instance === ref.instance ? null : console.log("comparefiber Error: instance", this.instance, ref.instance);
			
			//connected component
			this.sibling === ref.sibling ? null : console.log("comparefiber Error: sibling", this.sibling, ref.sibling);
			this.return === ref.return ? null : console.log("comparefiber Error: return", this.return, ref.return);
			this.stateNode === ref.stateNode ? null : console.log("comparefiber Error: stateNode", this.stateNode, ref.stateNode);
			
			//state
			this.state === ref.state ? null : console.log("comparefiber Error: state", this.state, ref.state);
			this.changed === ref.changed ? null : console.log("comparefiber Error: changed", this.changed, ref.changed);
			this.changedState === ref.changedState ? null : console.log("comparefiber Error: changedState", this.changedState, ref.changedState);
			this.statePosition === ref.statePosition ? null : console.log("comparefiber Error: statePosition", this.statePosition, ref.statePosition);
			
			this.useEffect === ref.useEffect ? null : console.log("comparefiber Error: useEffect", this.useEffect, ref.useEffect);
			this.willUnmount === ref.willUnmount ? null : console.log("comparefiber Error: willUnmount", this.willUnmount, ref.willUnmount);
			this.effectPosition === ref.effectPosition ? null : console.log("comparefiber Error: effectPosition", this.effectPosition, ref.effectPosition);

			//event not comparing
	}
}