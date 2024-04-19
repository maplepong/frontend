/* @jsx createElement */
import createElement from "./createElement.js";
import myReact from "../core/myReact.js";
import App from "../app.js"
import Undefined from "../component/Undefined.js"
import Home from "../component/Home.js"
import Welcome from "../component/Welcome.js"
import Login from "../component/Login.js"
import MyInfo from "../component/MyInfo.js"
import ApiLogin from "../component/ApiLogin.js"
import SignUp from "../component/SignUp.js"
import ApiSignUp from "../component/ApiSignUp.js";
import GameContainer from "../component/GameContainer.js"
import Navbar from "../component/Navbar.js";
import Test from "../component/Test"
import ApiTest from "../component/ApiTest"
import FriendList from '../component/FriendList';

const pathList = {
	"/": <App />,
	// "/": <div><ApiTest /><FriendList /></div>, //test develope
	"/login": <Login />,
	"/home": <Home />,
	"/myinfo": <MyInfo />,
	"/api-login": <ApiLogin />,
	"/api-test": <ApiTest />,
	"/signup": <SignUp />,
	"/api-signup": <ApiSignUp />,
	"/gameroom" : <GameContainer />,
	"/welcome" : <Welcome/>,
	"/test" : <Test />,
}

export default function router() {
	const path = window.location.pathname;
	console.log("router called: path: ", path);
	const component = pathList[path];
	console.log("component", component);
	if (component === undefined) {
		myReact.render(<Undefined />, "newPage");
	}
	else {
		// myReact.render(component, "newPage"); //test develope
		myReact.render(<div>{component}<Navbar/></div>, "newPage");
	}
}
