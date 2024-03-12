import Component from "../core/Component.js";

function getCookie(name) {
	const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
	return cookieValue ? cookieValue.pop() : '';
  }

export default function Login() {
  var username;
  var password;
  
  const loginComponent = Component();
  loginComponent.setup = () => {
    username = "";
    password = "";
    loginComponent.setCss("login.css");
  }
  
  loginComponent.render = () => {
  }
  
  loginComponent.setup();
  loginComponent.render();
  
  // console.log(asdf);

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