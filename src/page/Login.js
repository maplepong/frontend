import Component from "../core/Component.js";
import Input from "../components/Input.js";
import Signup from "./Signup.js";
import Api from "../core/Api.js"

function getCookie(name) {
	const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
	return cookieValue ? cookieValue.pop() : '';
  }

//상태 확인했는데 로그인할게 없으니까 로그인 페이지로 들어갔겠지...
//만약 로그인 상태면 home으로 리다이렉트하는 게 맞을듯
export default class Login extends Component {
  username;
  password;
  setup() {
    this.username = "";
    this.password = "";
    this.setCss("login.css");
  }
  template() {
    return `
		<div id="login-page">
			<div id="login-username-input"></div>
			<div id="login-password-input"></div>
      <div id="btnContainer">
        <button>with 42 API</button>
        <button id="login-btn">로그인</button>
			<button id="test">쿠키좀보자</button>	
        <button data-route="signup" id="signup-btn">회원가입
      </div>
		</div>
		`;
  }
  mounted() {
    const { validateId, validatePassword } = this;
    const $usernameInput = this.$target.querySelector("#login-username-input");
    const $pwInput = this.$target.querySelector("#login-password-input");

    new Input($usernameInput, {
      validate: validateId,
      label: "ID",
      placeholder: "당신의ID를겟또다제",
    });
    new Input($pwInput, {
      validate: validatePassword,
      label: "PW",
      placeholder: "비밀번호입력구다사이",
    });
  }

  validateId(text) {
    if (text.length < 5) console.log("too short");
  }

  validatePassword(text) {
    if (text.length < 5) console.log("too short pw");
  }

  requestLogin() {
    this.username = this.$target
      .querySelector("#login-username-input")
      .querySelector("input").value;
    this.password = this.$target
      .querySelector("#login-password-input")
      .querySelector("input").value;

	Api.requestLogin(this.username, this.password);
  }

  setEvent() {
    this.addEvent("keyup", "input", ({ key }) => {
      if (key != "Enter") return;
    //   this.requestLogin();
    });
    this.addEvent("click", "#login-btn", () => {
      this.requestLogin();
    });
	this.addEvent("click", "#test", () => {
		this.seeCookie();
	  });

  }
  seeCookie(){
  	const refreshToken = getCookie('refresh_token');
	console.log("refreshtoken: " + refreshToken);
	console.log("just cookie: " + document.cookie);
  }
}
