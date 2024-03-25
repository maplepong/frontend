/* @jsx createElement */
import Login from "./component/Login.js";
import MyInfo from "./component/MyInfo.js";
import { createElement, Link } from "./core/myReact.js";
import SignUp from "./component/SignUp.js";
import "./css/index.css";
import { useState, useEffect } from "./core/myReact.js";
import Test from "./component/Test.js"

const setAxios = () => {
	axios.defaults.baseURL = "http://localhost:8000/";
	// axios.defaults.baseURL = "http://10.19.247.54:8001/";
	// axios.defauls.timeout = 1000;
}
const App = () => {
	setAxios();
	return (
        <div class="app">
            <Link to= "">
                <img src ="./asset/design/maplepong.png"></img>
            </Link>
			<Test />
            <h1>
                Merancendance
            </h1>
            <Login />
            <MyInfo />
            <SignUp />
            <button data-route="home">Home</button>
            <button data-route="login">login</button>
            <button data-route="signup">SignUp</button>
	    </div>
	)
}

export default App;