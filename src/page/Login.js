import Component from "../core/Component.js";
import Input from "../components/Input.js";
import Signup from "./Signup.js";

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
			<div id="login-id-input"></div>
			<div id="login-password-input"></div>
			<button id="login-btn">로그인</button>
      <button data-route="signup" id="signup-btn">회원가입</button>
		</div>
		`;
  }
  mounted() {
    const { validateId, validatePassword } = this;
    const $idInput = this.$target.querySelector("#login-id-input");
    const $pwInput = this.$target.querySelector("#login-password-input");

    new Input($idInput, {
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
      .querySelector("#login-id-input")
      .querySelector("input").value;
    this.password = this.$target
      .querySelector("#login-password-input")
      .querySelector("input").value;
    
    // localstoarge 연습
    localStorage.setItem('username', this.username);
    // 실제 어플에서는 비밀번호를 저장하지 않는다고 함
    localStorage.setItem('password', this.password);

    alert(this.username + this.password + "login success");
  }

  setEvent() {
    this.addEvent("keyup", "input", ({ key }) => {
      if (key != "Enter") return;
      this.requestLogin();
    });
    this.addEvent("click", "#login-btn", () => {
      this.requestLogin();
    });
  }
}
