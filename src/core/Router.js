import { Home, About, Contact } from "../view/simplepage.js";
import Login from "../view/Login.js";

// //출처: https://nukw0n-dev.tistory.com/34 [찐이의 개발 연결구과:티스토리]
// const routes = [
//   { path: "/home", element: Home },
//   { path: "/login", element: Login },
//   { path: "/about", element: About },
// ];

// const findMatchedRoute = () =>
//   routes.find((route) => route.path.test(location.pathname));

// const route = () => {
//   const TargetPage = findMatchedRoute()?.element || NotFound;
//   new TargetPage(this.$container);
// };

// 라우터 함수
export default function router() {
  //   route();
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
    case "/login":
      new Login(main);
      setupLoginForm();
      setupSignupButton();
      break;
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
