/* @jsx createElement */
import {createElement, render, useState, addEvent} from "./myReact.js";
import Home from "../component/Home.js"
import Undefined from "../component/Undefined.js"
import Welcome from	"../component/Welcome.js"
import Login from	"../component/Login.js"
import App from "../app.js"
const pathList = {
	"/" : <App />,
	"/home" : <Home />,
	"/login" : <Login />

}

export default function router() {
	const path = window.location.pathname;
	const main = document.querySelector("main");

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