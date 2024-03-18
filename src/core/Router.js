/* @jsx createElement */
import {createElement, render, useState, addEvent} from "./myReact.js";
import Home from "../component/Home.js"
import Undefined from "../component/Undefined.js"
import Welcome from	"../component/Welcome.js"
import Login from	"../component/Login.js"
import App from "../app.js"
const pathList = {
	"/" : <App />,
	"/login" : <Login />,
	"/home" : <Home />,
}

export default function router() {
	var path = window.location.pathname;
	if (path === "/" || path === "/login"){
		//토큰 유무/시간 확인하는 로직으로 바꿔야 함
		if (localStorage.username !== null){
			path = "/home";
			history.pushState({}, "", path);
		}
	}

	const route = pathList[path];
	if (route === undefined)
	{
		render(<Undefined />);
	}
	else
	{
		render(route);
	}
}