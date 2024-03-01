import { Home, About, Contact } from "../page/simplepage.js";
import Login from "../page/Login.js";
import Landing from "../page/Landing.js";
import Main from "../page/Main.js";

// 라우터 함수
// link 넣는 방법 : 태그 속성에 "data-route" 지정
export default function router() {
  //   route();
  const path = window.location.pathname;
  const main = document.querySelector("main");

  // 동적으로 추가한 css등 링크 파일 제거
  var dynamicLink = document.getElementById("dynamic-link");
  if (dynamicLink) dynamicLink.parentNode.removeChild(dynamicLink);

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
    case "/login":
      new Login(main);
      break;
    case "/main":
      new Main(main);
      break;
    // case "/signup":
    //   main.innerHTML = Signup();
    //   break;
    // case "/game":
    //   main.innerHTML = Game();
    //   break;
    default:
      new Landing(main);
    //   main.innerHTML = Home(); // 기본 경로
  }
}
