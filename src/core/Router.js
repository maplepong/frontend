/* @jsx createElement */
import createElement from "./createElement.js";
import myReact from "../core/myReact.js";
import App from "../app.js"
import Undefined from "../component/Undefined.js"
import Home from "../component/Home.js"
// import Welcome from "../component/Welcome.js"
// import Login from "../component/Login.js"
// import MyInfo from "../component/MyInfo.js"
// import ApiLogin from "../component/ApiLogin.js"
// import SignUp from "../component/SignUp.js"
import GameContainer from "../component/GameContainer.js"
import Component from '../_core/Component';

const pathList = {
	"/": <App />,
	// "/login": <Login />,
	"/home": <Home />,
	// "/myinfo": <MyInfo />,
	// "/api-login": <ApiLogin />,
	// "/signup": <SignUp />,
	"/game" : <GameContainer />,
}

export default function router() {
	var path = window.location.pathname;

	console.log("router called")
	const component = pathList[path];
	console.log("app", path, component);
	if (component === undefined) {
		myReact.render(<Undefined />, "newPage");
	}
	else {
		console.log("???")
		myReact.render(component, "newPage");
	}
}
