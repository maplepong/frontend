/* @jsx createElement */
import {createElement, Link, render, useState } from "../core/myReact.js";

const Home = () => {
	const [count, setCount] = useState(1);

	const buttonClick = () => {
		console.log(typeof count);
		setCount(count + 1);
	}

	return (
		<div id="home">
			<button onClick={buttonClick}>{count}</button>
			<Link to="/" id=""></Link>
			<div id="character"></div>
		</div>
	)
}

export default Home;