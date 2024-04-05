/* @jsx createElement */
import { createElement, Link } from "../core/myReact.js";
import { useState, useEffect } from "../core/myReact.js";

const Test = () => {
    const [count, setCount] = useState(0);
    
	const incre = () => {
		console.log(count);
		setCount(count + 1);
		console.log(count);
	}
	const decre = () => {
		console.log(count);
		setCount(count - 1);
		console.log(count);
	}

	// const sText = new useState("test");
	// const testChange = (e) => {
	// 	e.preventDefault();
	// 	console.log(textInput);
	// 	sText.set(document.querySelector("#textInput").value);
	// }

	return <div class="test">
            <p>Test UseState: {count}
                <button onClick={incre}>증가</button>
                <button onClick={decre}>감소</button>
            </p>
			{/* <div>
				<input id="textInput"></input>
				<button onCilck={testChange}></button>
				<p>Text is {sText}</p>
			</div> */}
	    </div>
}

export default Test;