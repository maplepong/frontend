/* @jsx createElement */
import { createElement, Link } from "../core/myReact.js";
import { useState, useEffect } from "../core/myReact.js";

const Test = () => {
    const [ count, setCount ] = useState(0);
	const [testText, setText] = useState("empty");
    
	const incre = () => {
		console.log(count);
		setCount(count + 1);
	}
	const decre = () => {
		setCount(count - 1);
	}

    // useEffect(() => {
    //     console.log("count has been changed into", count);
    //   }, [count]);


	const textEvent = (event) => {
		const elem = document.querySelector("#testInput");
		if (!elem)
		{
			console.log("cannotfound")
			return;
		}
		setText(elem.value);
	}
	return (
        <div class="test">
            <p>Test UseState: {count}
                <button onClick={incre}>증가</button>
                <button onClick={decre}>감소</button>
            </p>
			<p>Test UseState 2: {testText}
				<input id="testInput" />
				<button onClick={(event)=>{}}>input</button> 
			</p>
	    </div>
	)
}

export default Test;