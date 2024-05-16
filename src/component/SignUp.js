/* @jsx myReact.createElement */
import myReact from "../core/myReact.js";
import api, { requestSignup, requestValidCheck } from "../core/Api_.js";
import "../css/Signup.css"
import { Link } from "../core/myReact.js";

const SignUp = () => {
    async function getInfo () {
        // 검증 로직
        if (!validateFields()) {
            alert("입력값들을 다시 확인해주세요!");
            return ;
        }

        const username = document.querySelector("#new-username").value;
        const nickname = document.querySelector("#new-nickname").value;
        const password = document.querySelector("#new-password").value;
        const confirmPassword = document.querySelector("#confirm-password").value;
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

    const validateFields = () => {
        const usernameValid = validcheckUsername();
        const nicknameValid = validcheckNickname();
        const confirmPasswordValid = validcheckPassword();
        const emailValid = validcheckEmail();
        const passwordValid = handlePasswordInput();

        return usernameValid && passwordValid && confirmPasswordValid && nicknameValid && emailValid;
    }

    async function validcheckUsername() {
        const username = document.querySelector("#new-username").value;
        const errorDisplay = document.querySelector("#p-id-error");
        if (!username) {
            errorDisplay.innerHTML = "";
            return false;
        }
        const response = await api.validCheck("username", username);
        if (response.status !== 200) {
            errorDisplay.innerHTML = "이미 사용 중인 아이디입니다.";
            return false;
        } else {
            errorDisplay.innerHTML = "사용 가능한 아이디입니다.";
            return true;
        }
    }

    async function validcheckNickname() {
        const nickname = document.querySelector("#new-nickname").value;
        const errorDisplay = document.querySelector("#p-nick-error");
        if (!nickname) {
            errorDisplay.innerHTML = "";
            return false;
        }
        const response = await api.validCheck("nickname", nickname);
        if (response.status !== 200) {
            errorDisplay.innerHTML = "이미 사용 중인 닉네임입니다.";
            return false;
        } else {
            errorDisplay.innerHTML = "사용 가능한 닉네임입니다.";
            return true;
        }
    }

    async function validcheckPassword() {
        const password = document.querySelector('#new-password').value;
        const confirmPassword = document.querySelector("#confirm-password").value;
        const errorDisplay = document.querySelector("#p-pass-error");
        console.log(confirmPassword);
        if (!confirmPassword) {
            errorDisplay.innerHTML = "";
            return false;
        }
        else if (password !== confirmPassword) {
            errorDisplay.innerHTML = "비밀번호와 확인 비밀번호가 일치하지 않습니다."
            return false;
        }
        else if (password === confirmPassword) {
            errorDisplay.innerHTML = "비밀번호와 확인 비밀번호가 일치합니다.";
            return true;
        }
    }

    async function validcheckEmail() {
        const email = document.querySelector("#new-mail").value;
        const errorDisplay = document.querySelector("#p-mail-error");
        if (!email) {
            errorDisplay.innerHTML = "";
            return false;
        }
        const response = await api.validCheck("email", email);
        console.log("EMAIL RESPONSE", response);
        // 이메일 유효성 검사 로직 추가 가능
        if (response.status !== 200) {
            errorDisplay.innerHTML = "이미 사용 중인 이메일입니다.";
            return false;
        } else {
            errorDisplay.innerHTML = "사용 가능한 이메일입니다.";
            return true;
        }    
    }

    function checkPassword(password) {
        let strength = 0;
        if (password.length >= 8) strength += 1;    // 길이 체크
        if (/[a-z]/.test(password)) strength += 1;  // 소문자 체크
        if (/[0-9]/.test(password)) strength += 1;  // 숫자 체크
        return strength;
    }

    const handlePasswordInput = () => {
        const password = document.querySelector("#new-password").value;
        const strength = checkPassword(password);
        const strengthDisplay = document.querySelector("#p-pass-strength");
        let strengthText = "";
        
        if (!password) {
            strengthText = "";
            strengthDisplay.innerHTML = strengthText;
            return false;
        } else if (strength != 3){
            strengthText = "비밀번호는 8자리 이상, 영어 소문자와 숫자를 포함해야 합니다.";
            strengthDisplay.innerHTML = strengthText;
            return false;
        } else {
            strengthText = "OK";
        }
        strengthDisplay.innerHTML = strengthText;
        return true;
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
                <p id="p-pass-strength"></p>
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