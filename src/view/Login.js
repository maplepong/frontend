import Component from "../core/Component.js";
import Input from "../components/Input.js";

//상태 확인했는데 로그인할게 없으니까 로그인 페이지로 들어갔겠지...
//만약 로그인 상태면 home으로 리다이렉트하는 게 맞을듯
export default class Login extends Component {
  setup() {}
  template() {
    return `
		<div id="login-page">
			<div id="login-id-input"></div>
			<div id="login-password-input"></div>
		</div>
		`;
  }
  mounted() {
    const { validateId, validatePassword } = this;
    const $idInput = this.$target.querySelector("#login-id-input");
    const $pwInput = this.$target.querySelector("#login-password-input");

    new Input($idInput, { validate: validateId, button: false });
    new Input($pwInput, { validatePassword, button: false });
  }

  validateId(text) {
    if (text.length < 5) console.log("too short");
  }

  validatePassword(key, target) {
    if (text.length < 5) console.log("too short pw");
  }
}
