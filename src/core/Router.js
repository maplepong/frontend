/* @jsx createElement */
import createElement from "./createElement.js";
import myReact from "../core/myReact.js";
import App from "../app.js"
import Undefined from "../component/Undefined.js"
import Home from "../component/Home.js"
import Welcome from "../component/Welcome.js"
import Login from "../component/Login.js"
// import MyInfo from "../component/MyInfo.js"
import ApiLogin from "../component/ApiLogin.js"
// import SignUp from "../component/SignUp.js"
import GameContainer from "../component/GameContainer.js"
import Component from '../_core/Component';
import Navbar from "../component/Navbar.js";

const pathList = {
	"/": <App />,
	"/login": <Login />,
	"/home": <Home />,
	// "/myinfo": <MyInfo />,
	"/api-login": <ApiLogin />,
	// "/signup": <SignUp />,
	"/game" : <GameContainer />,
	"/welcome" : <Welcome/>,
}

export default function router(param) {
	var path = window.location.pathname;
	console.log("router called: path: ", path);
	const component = pathList[path];
	if (component === undefined) {
		myReact.render(<Undefined />, "newPage");
	}
	else {
		myReact.render(<div>{component}<Navbar/></div>, "newPage");
	}
}
