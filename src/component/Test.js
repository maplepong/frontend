/* @jsx createElement */
import { createElement,  useState } from "../core/myReact.js";

const Test = () => {
	console.log("type", useState);
    const [ count, setCount ] = useState(0);
    
	const incre = () => {
		console.log("count incre" , count + 1);
		setCount(count + 1);
		console.log("count incre" , count);
	}
	const decre = () => {
		console.log("count decre" , count - 1);
		setCount(count - 1);
		console.log("count decre" , count);
	}

	return <div class="test">
            <p>Test UseState: {count}
                <button onClick={incre}>증가</button>
                <button onClick={decre}>감소</button>
            </p>
	    </div>
}

export default Test;