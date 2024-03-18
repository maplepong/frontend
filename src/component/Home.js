/* @jsx createElement */
import {createElement, Link } from "../core/myReact.js";

const Home = () => {
	return (
		<div id="home">
			<Link to="/" id=""> </Link>
			<div id="character"></div>
		</div>
	)
}

export default Home;