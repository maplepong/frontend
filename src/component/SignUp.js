/* @jsx myReact.createElement */
import myReact from "../core/myReact.js";
import api, { requestSignup, requestValidCheck } from "../core/Api_.js";
import "../css/Signup.css"
import { Link } from "../core/myReact.js";

const SignUp = () => {
    async function getInfo () {
        const username = document.querySelector("#new-username").value;
        const password = document.querySelector("#new-password").value;
        const confirmPassword = document.querySelector("#confirm-password").value;
        const nickname = document.querySelector("#new-nickname").value;
        const email = document.querySelector("#new-mail").value;

        if (password !== confirmPassword) {
            alert("비밀번호를 다시 확인해주세요!");
            return;
        }
        
        const response = await api.signup(username, password, nickname, email);
    
        if (response.status !== 201)
            alert("회원가입에 실패했습니다. Error: " + response.status);
        else
            alert(username, "의 회원가입 완료")
    };

    async function validcheckUsername() {
        const username = document.querySelector("#new-username").value;
        const errorDisplay = document.querySelector("#p-id-error");
        if (!username) {
            errorDisplay.innerHTML = "";
            return;
        }
        const response = await api.validCheck("username", username);
        if (response.status !== 200) {
            errorDisplay.innerHTML = "이미 사용 중인 아이디입니다.";
        } else {
            errorDisplay.innerHTML = "사용 가능한 아이디입니다.";
        }
    }

    async function validcheckNickname() {
        const nickname = document.querySelector("#new-nickname").value;
        const errorDisplay = document.querySelector("#p-nick-error");
        if (!nickname) {
            errorDisplay.innerHTML = "";
            return;
        }
        const response = await api.validCheck("nickname", nickname);
        if (response.status !== 200) {
            errorDisplay.innerHTML = "이미 사용 중인 닉네임입니다.";
        } else {
            errorDisplay.innerHTML = "사용 가능한 닉네임입니다.";
        }
    }

    async function validcheckPassword() {
        const password = document.querySelector('#new-password').value;
        const confirmPassword = document.querySelector("#confirm-password").value;
        const errorDisplay = document.querySelector("#p-pass-error");
        console.log(confirmPassword);
        if (!confirmPassword) {
            errorDisplay.innerHTML = "";
            return;
        }
        else if (password !== confirmPassword) {
            errorDisplay.innerHTML = "비밀번호와 확인 비밀번호가 일치하지 않습니다."
        }
        else if (password === confirmPassword) {
            errorDisplay.innerHTML = "비밀번호와 확인 비밀번호가 일치합니다.";
        }
    }

    async function validcheckEmail() {
        const email = document.querySelector("#new-mail").value;
        const errorDisplay = document.querySelector("#p-mail-error");
        if (!email) {
            errorDisplay.innerHTML = "";
            return;
        }
        const response = await api.validCheck("email", email);

        // 이메일 유효성 검사 로직 추가 가능
        if (response.status !== 200) {
            errorDisplay.innerHTML = "이미 사용 중인 이메일입니다.";
        } else {
            errorDisplay.innerHTML = "사용 가능한 이메일입니다.";
        }    
    }

    function checkPassword(password) {
        return 1;
    }

    const handlePasswordInput = () => {
        const password = document.querySelector("#new-password").value;
        const point = checkPassword(password);
        
    }

    return (
        <div id="signup-container">
            <div id="welcome">MAPLEPONG</div>
            <div className="inputBox">
                <input id="new-username" placeholder="아이디" onBlur={validcheckUsername}></input>
                <p id="p-id-error" className="errMessage"></p>
            </div>
            <div className="inputBox">
                <input id="new-password" type="password" placeholder="비밀번호" onBlur={handlePasswordInput}></input>
            </div>
            <div className="inputBox">
                <input id="confirm-password" type="password" placeholder="비밀번호 확인" onBlur={validcheckPassword}></input>
                <p id="p-pass-error" className="errMessage"></p>
            </div>
            <div className="inputBox">
                <input id="new-nickname" placeholder="닉네임" onBlur={validcheckNickname}></input>
                <p id="p-nick-error" className="errMessage"></p>
            </div>
            <div className="inputBox">
                <input id="new-mail" type="email" placeholder="이메일" onBlur={validcheckEmail}></input>
                <p id="p-mail-error" className="errMessage"></p>
            </div>
            <div id="interact">
                <button class="btns" onClick={getInfo}>회원가입</button>
                <Link to="">
                    <button class="btns">홈으로</button>
                </Link>
            </div>
        </div>
    );
}

export default SignUp;