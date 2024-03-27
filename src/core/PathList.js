import Home from "../component/Home.js"
import Undefined from "../component/Undefined.js"
import Welcome from "../component/Welcome.js"
import Login from "../component/Login.js"
import App from "../app.js"
import MyInfo from "../component/MyInfo.js"
import ApiLogin from "../component/ApiLogin.js"
import SignUp from "../component/SignUp.js"

const pathList = {
	"/": <App />,
	"/login": <Login />,
	"/home": <Home />,
	"/myinfo": <MyInfo />,
	"/api-login": <ApiLogin />,
	"/signup": <SignUp />,
	"/undefined": <Undefined />,
	"/welcome": <Welcome />,
}


export default pathList;