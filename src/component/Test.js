/* @jsx myReact.createElement */

import myReact, { useState, useEffect, Link } from "../core/myReact.js";
import router from "../core/Router.js"

const Test = () => {
    const [count, setCount] = useState(0);
    
	const incre = () => {
		setCount(count + 1);
	}
	const decre = () => {
		setCount(count - 1);
	}

	const [text, setText] = useState("test");
	const testChange = (e) => {
		e.preventDefault();
		console.log("textInput", document.querySelector("#textInput").value);
		setText(document.querySelector("#textInput").value);
	}

	const callbackTest = () => {
		console.log("callback : callllllllbackkkkkkk");
	}
	useEffect(callbackTest, [count]); //count 변수 변경시 실행

	useEffect(function testDep() {
		console.log("callback : test Dependencies")
	}, [])
	const callback = () => {
		console.log("callback : text change")
	}
	const re = () => {
		myReact.redirect("welcome");
	}
	useEffect (callback); // 텍스트 변수 변경시 실행
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
			<button onClick={re}>Test redirect</button>
	    </div>
}

export default Test;