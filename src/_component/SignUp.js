/* @jsx createElement */
import {createElement, Link } from "../core/myReact.js";
import { requestSignup, requestValidCheck } from "../core/Api";
import router from "../core/Router.js";

const SignUp = () => {
    const getInfo = () => {
		const username = document.querySelector("#new-username").value;
		const password = document.querySelector("#new-password").value;
        const nickname = document.querySelector("#new-nickname").value;
        requestSignup(username, password, nickname);
        history.pushState({}, "", "/home");
	};

    return (
        <div id="Signup-container">
            
            <input id="new-username" 
            placeholder="ID"></input>
			<input id="new-password" placeholder="password"></input>
            <input id="new-nickname" placeholder="nickname"></input>
			<button id="btn-request-Signup" onClick={ getInfo }>SignUp</button>
			<p id="p-login-error"></p>
        </div>
    )
}

export default SignUp;

