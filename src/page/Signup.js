import Component from "../core/Component.js";
import Api from "../core/Api.js"
import Input from "../components/Input.js";

export default class Signup extends Component {
  Username;
  Password;
  static api;
  setup() {
      this.newUsername = "";
      this.newId = "";
      this.newPassword = "";
      this.setCss("signup.css");
	  this.api = new Api();
  }

  template() { // Html
    return `
      <form id="signup-form">
	  	<div id="signup-nickname"></div>
        <div id="signup-username"></div>
        <div id="signup-password"></div>
        <div id="btn-container">
			<button id="signup-btn" type="submit">Sign Up</button>
		</div>
      </form>
    `;
  }

  setEvent() {
    // 제출 버튼 클릭 이벤트 처리
    this.addEvent("click", "#signup-btn", (event) => {
		console.log("event call");
		this.registerUser(event);
    });
  }
  
  mounted() {
	const {validateUsername, validateNickname, validatePassword} = this;

	new Input($this.$target.querySelector("#signup-username"), {
		validate: validateUsername,
		label: "아이디",
		placeholder: "아이디써줘라 두번써줘라",
		id: "input-username"
	})
	new Input(this.$target.querySelector("#signup-nickname"), {
		validate: validateNickname,
		label: "닉네임",
		placeholder: "너의 닉네임을 겟",
		id: "input-nickname"
	})
	new Input(this.$target.querySelector("#signup-password"), {
		validate: validatePassword,
		label: "비밀번호",
		placeholder: "너의 닉네임을 겟",
		id: "input-password",
		type: "password",
	})
}

  registerUser() {
    const newUsername = this.$target.querySelector("#input-username").value;
	const newNickname = this.$target.querySelector("#input-nickname").value;
    const newPassword = this.$target.querySelector("#input-password").value;

    console.log("Username: " + this.newUsername + "\nPassword: " + this.newPassword);

	
	this.api.requestSignup(this.newUsername,this.newPassword, this.newNickname);
	};

	validateUsername(text){
		Api.requestValidCheck('username', text);
	}
	validateNickname(text){
		Api.requestValidCheck('nickname', text);
	}
	validatePassword(text){
		console.log(text);
	}
}
