/* @jsx createElement */
import { createElement, render, useState, addEvent } from "./myReact.js";
import Home from "../component/Home.js"
import Undefined from "../component/Undefined.js"
import Welcome from "../component/Welcome.js"
import Login from "../component/Login.js"
import App from "../app.js"
import MyInfo from "../component/MyInfo.js"
import ApiLogin from "../component/ApiLogin.js"
import SignUp from "../component/SignUp.js"
import GameContainer from "../component/GameContainer.js"

const pathList = {
	"/": <App />,
	"/login": <Login />,
	"/home": <Home />,
	"/myinfo": <MyInfo />,
	"/api-login": <ApiLogin />,
	"/signup": <SignUp />,
	"/game" : <GameContainer />,
}

export default function router() {
	var path = window.location.pathname;

	const route = pathList[path];
	if (route === undefined) {
		render(<Undefined />);
	}
	else {
		render(route);
	}
}
