import Component from "../core/Component.js";

export default class Signup extends Component {
  newUsername;
  newPassword;
  setup() {
      this.newUsername = "";
      this.newId = "";
      this.newPassword = "";
      this.setCss("signup.css");
  }

  template() { // Html
    return `
      <form id="signup-form">
        <div id="signup-username"><input type="text" id="input-username" placeholder="Username"><button class="dup-check">중복 확인</button></div>
        <div id="signup-id"><input type="password" id="input-id" placeholder="id"><button class="dup-check">중복 확인</button></div>
        <div id="signup-password"><input type="password" id="input-password" placeholder="Password"></div>
        <div id="btn-container"><button id="signup-btn" type="submit">Sign Up</button></div>
      </form>
    `;
  }

  setEvent() {
    // 제출 버튼 클릭 이벤트 처리
    this.addEvent("click", "#signup-btn", (event) => {
      this.registerUser(event);
    });
  }

  registerUser() {
    this.newUsername = this.$target.querySelector("#input-username").value;
    this.newId = this.$target.querySelector("#input-id").value;
    this.newPassword = this.$target.querySelector("#input-password").value;

    console.log("Username: " + this.newUsername + "\nPassword: " + this.newPassword);

    // localStorage에 사용자 정보 저장
    const user = { username:this.newUsername, id:this.newId, password:this.newPassword };
    localStorage.setItem(this.newId, JSON.stringify(user));

    // 메세징
    alert("Signup successful!");
  }
}
