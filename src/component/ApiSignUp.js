/* @jsx myReact.createElement */
import myReact , { Link, useEffect } from "../core/myReact.js";
import { requestApiSignup } from "../core/Api.js";

const ApiSignUp = () => {
    const getInfo = () => {
        const username = localStorage.getItem('username');
        const nickname = document.querySelector("#new-nickname").value;
        console.log("nickname: ", nickname, "username: ", username);
        requestApiSignup(username ,nickname);
        localStorage.removeItem('username');
        history.pushState({}, "", "/home");
	};

    return (
        <div id="Signup-container">
            <input id="new-nickname" placeholder="nickname"></input>
			<button id="btn-request-ApiSignup" onClick={ getInfo }>42 API SignUp</button>
			<p id="p-login-error"></p>
        </div>
    )
}

export default ApiSignUp;

