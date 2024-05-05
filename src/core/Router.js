/* @jsx createElement */
import createElement from "./createElement.js";
import myReact from "../core/myReact.js";
import App from "../app.js"
import Undefined from "../component/Undefined.js"
import Home from "../component/Home.js"
import Welcome from "../component/Welcome.js"
import Login from "../component/Login.js"
import MyInfo from "../component/MyInfo.js"
import UserInfoPage from "../component/UserInfoPage.js"
import ApiLogin from "../component/ApiLogin.js"
import SignUp from "../component/SignUp.js"
import ApiSignUp from "../component/ApiSignUp.js";
import Game from "../component/Game.js"
import Navbar from "../component/Navbar.js";
import Test from "../component/Test"
import ApiTest from "../component/ApiTest"
import Lobby from "../component/Lobby.js"
import FriendList from '../component/FriendList';
import UserInfo from '../component/UserInfo';

const pathList = {
	"/": <App />,
	// "/": <div><ApiTest /><FriendList /></div>, //test develope
	"/userinfo": <UserInfoPage />,
	"/login": <Login />,
	"/home": <Home />,
	"/myinfo": <MyInfo />,
	"/api-login": <ApiLogin />,
	"/api-test": <ApiTest />,
	"/signup": <SignUp />,
	"/api-signup": <ApiSignUp />,
	"/gameroom" : <Game />,
	"/welcome" : <Welcome/>,
	"/lobby": <Lobby />,
	"/test" : <Test />,
}

export default function router(param) {
	var path;
	if (!param)
		path = window.location.pathname;
	else
		path = param;
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
