/* @jsx React.createElement */

import React, { useState, useEffect } from "../core/myReact.js";

const Test = () => {
    const [count, setCount] = useState(0);
    
	const incre = () => {
		console.log(count);
		setCount(count + 1);
		console.log(count);
	}
	const decre = () => {
		console.log(count -1);
		setCount(count - 1);
		console.log(count);
	}

	const [text, setText] = useState("test");
	const testChange = (e) => {
		e.preventDefault();
		console.log("textInput", document.querySelector("#textInput").value);
		setText(document.querySelector("#textInput").value);
	}

	const callbackTest = () => {
		console.log("callllllllbackkkkkkk");
	}
	useEffect(callbackTest);

	return <div class="test">
            <p>Test UseState: {count}
                <button onClick={incre}>증가</button>
                <button onClick={decre}>감소</button>
            </p>
			<div>
				<input id="textInput"></input>
				<button onCilck={testChange}></button>
				<p>Text is{text}</p>
			</div>
	    </div>
}

export default Test;