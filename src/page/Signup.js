import Component from "../core/Component.js";

export default class Signup extends Component {
  newUsername;
  newPassword;
  setup() {
      this.newUsername = "";
      this.newPassword = "";
      this.setCss("signup.css");
  }

  template() { // Html
    return `
      <form id="signup-form">
        <div id="signup-id"><input type="text" id="username" placeholder="Username"></div>
        <div id="signup-id"><input type="email" id="email" placeholder="Email"></div>
        <div id="signup-id"><input type="password" id="password" placeholder="Password"></div>
        <div><button type="submit">Sign Up</button></div>
      </form>
    `;
  }

  setEvent() {
    // 제출 버튼 클릭 이벤트 처리
    this.addEvent("submit", "#signup-form", (event) => {
      event.preventDefault();
      this.registerUser();
    });
  }

  registerUser() {
    const username = this.$target.querySelector("#username").value;
    const email = this.$target.querySelector("#email").value;
    const password = this.$target.querySelector("#password").value;

    // 여기에서 입력 유효성 검사를 수행할 수 있습니다.

    // localStorage에 사용자 정보 저장
    const user = { username, email, password };
    localStorage.setItem(username, JSON.stringify(user));

    alert("Signup successful!");
    // 회원가입 성공 후, 로그인 페이지로 리다이렉트하거나 사용자에게 성공 메시지를 표시할 수 있습니다.
  }
}
