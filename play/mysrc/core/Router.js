import { Home, About, Contact } from "../page/simplepage.js";

export default function Router($target) {
    //   route();
    const path = window.location.pathname;
    const main = document.querySelector("main");

    // 동적으로 추가한 css등 링크 파일 제거
    var dynamicLink = document.getElementById("dynamic-link");
    if (dynamicLink) dynamicLink.parentNode.removeChild(dynamicLink);

    console.log(path);
    switch (path) {
      case "/play/home":
        main.innerHTML = Home();
        break;
      case "/play/about":
        main.innerHTML = About();
        break;
      case "/play/contact":
        main.innerHTML = Contact();
        break;
    //   case "/login":
    //     new Login(main);
    //     break;
    //   case "/main":
    //     new Main(main);
    //     break;
    //   case "/signup":
    //     new Signup(main);
    //     break;
      // case "/game":
      //   main.innerHTML = Game();
      //   break;
    //   default:
        // new testApi(main);
      //   main.innerHTML = Home(); // 기본 경로
    }
  }