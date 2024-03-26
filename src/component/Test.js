/* @jsx createElement */
import { createElement, Link } from "../core/myReact.js";
import { useState, useEffect } from "../core/myReact.js";

const Test = () => {
    const [ count, setCount ] = useState(0);
    
	const incre = () => {
		console.log(count);
		setCount(count + 1);
		console.log("count" , count);
	}
	const decre = () => {
		setCount(count - 1);
		console.log("count" , count);
	}

	return <div class="test">
            <p>Test UseState: {count}
                <button onClick={incre}>증가</button>
                <button onClick={decre}>감소</button>
            </p>
	    </div>
}

export default Test;