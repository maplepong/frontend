/* @jsx createElement */
import Login from "./component/Login.js";
import MyInfo from "./component/MyInfo.js";
import { createElement, Link } from "./core/myReact.js";
import SignUp from "./component/SignUp.js";
import "./css/index.css";
import { useState } from "./core/myReact.js";

const setAxios = () => {
	axios.defaults.baseURL = "http://localhost:8000/";
	// axios.defaults.baseURL = "http://10.19.247.54:8001/";
	// axios.defauls.timeout = 1000;
}
const App = () => {
	setAxios();
    const [ count, setCount ] = useState(1);
    
	const incre = () => {
		setCount(count() + 1);
	}
	const decre = () => {
		setCount(count() - 1);
	}

	return (
        <div class="app">
            <Link to= "">
                <img src ="./asset/design/maplepong.png"></img>
            </Link>
            <p>Test UseState: {count}
                <button onClick={incre}>증가</button>
                <button onClick={decre}>감소</button>
            </p>
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