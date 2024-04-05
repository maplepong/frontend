export default class fiberNode {
	constructor() {
        this.instance = null; // The component instance
        this.children = []; // Child component
        this.sibling = []; // Sibling component
        this.return = null; // Parent component
        this.stateNode = null; // Associated DOM node or component state
		this.state = [];
		this.position = 0;
    }
    render(parentNode) { // setting fiberNode values, not real rendering
	    if (!stateNode) { // first Render
		    this.stateNode = document.createElement(this.instance[type]);
			if (!parentNode){ //rootNode
				this.return = null;
			}
			else { //부모 노드에 대한 처리
				this.return.return.appendChild(this.stateNode);
				this.return = parentNode;
				parentNode.children.array.forEach(element => {
					this.child.append(element);
					element.sibling.append(this);
				});
			}
			//자식 노드에 대한 처리
			this.instance.children.forEach((child) => {
				this.children.append(child.render(this));
			})
			return this;
		}
	}
}