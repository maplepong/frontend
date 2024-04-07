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

const pathList = {
	"/": <App />,
	// "/login": <Login />,
	"/home": <Home />,
	// "/myinfo": <MyInfo />,
	// "/api-login": <ApiLogin />,
	// "/signup": <SignUp />,
}

export default function router() {
	var path = window.location.pathname;

	console.log("router called")
	console.log("app", pathList["/"]);
	const route = pathList[path];
	if (route === undefined) {
		myReact.render(<Undefined />);
	}
	else {
		myReact.render(route);
	}
}