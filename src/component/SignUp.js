/* @jsx myReact.createElement */
import myReact from "../core/myReact.js";
import api, { requestSignup, requestValidCheck } from "../core/Api_.js";
import "../css/Signup.css"

const SignUp = () => {
    const getInfo = () => {
		const username = document.querySelector("#new-username").value;
		const password = document.querySelector("#new-password").value;
        const nickname = document.querySelector("#new-nickname").value;
        api.signup(username, password, nickname);
	};

    async function validcheckUsername() {
		const username = document.querySelector("#new-username").value;
        console.log(username, '확인하기');
        const errorDisplay = document.querySelector("#p-id-error");
        const userBox = document.querySelector("#userinputBox")
        const passBox = document.querySelector("#passinputBox")
        if (!username) {
            errorDisplay.innerHTML = "";
            userBox.style.margin = "10px";
            passBox.style.margin = "10px";
            return ;
        }
        userBox.style.margin = "5px";
        passBox.style.marginTop = "0px";
        const response = await api.validCheck("username", username)
        if (response.status != 200) {
            console.error(response)
            errorDisplay.innerHTML = "이미 사용 중인 아이디입니다.";
        }
        else
            errorDisplay.innerHTML = "OK";
    }

    async function validcheckNickname() {
        const nickname = document.querySelector("#new-nickname").value;
        const errorDisplay = document.querySelector("#p-nick-error");
        console.log(nickname, '확인하기');       
        const nickBox = document.querySelector("#nickinputBox")
        if (!nickname) {
            errorDisplay.innerHTML = "";
            nickBox.style.margin = "10px";
            return ;
        }
        nickBox.style.marginBottom = "0px";
        const response = await api.validCheck("nickname", nickname)
        if (response.status != 200) {
            console.error(response)
            errorDisplay.innerHTML = "이미 사용 중인 닉네임입니다.";
        }
        else
            errorDisplay.innerHTML = "OK";
    }

    return (
        <div id="Signup-container">
            <div id="userinputBox">
                <input id="new-username" placeholder="ID" onblur={validcheckUsername}></input>
                <p id="p-id-error" class="errMessage"></p>
            </div>
            <div id="passinputBox">
                <input id="new-password" placeholder="password"></input>
            </div>
            <div id="nickinputBox">
                <input id="new-nickname" placeholder="nickname" onblur={validcheckNickname}></input>
                <p id="p-nick-error" class="errMessage"></p>
            </div>
			<button id="btn-request-Signup" onClick={ getInfo }>SignUp</button>
        </div>
    )
}

export default SignUp;