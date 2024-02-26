import { Home, About, Contact } from "../view/simplepage.js";

// 라우터 함수
export default function router() {
  const path = window.location.pathname;
  const main = document.querySelector("main");

  switch (path) {
    case "/home":
      main.innerHTML = Home();
      break;
    case "/about":
      main.innerHTML = About();
      break;
    case "/contact":
      main.innerHTML = Contact();
      break;
    // case "/login":
    //   main.innerHTML = Login();
    //   setupLoginForm();
    //   setupSignupButton();
    //   break;
    // case "/signup":
    //   main.innerHTML = Signup();
    //   break;
    // case "/game":
    //   main.innerHTML = Game();
    //   break;
    default:
      main.innerHTML = Home(); // 기본 경로
  }
}
