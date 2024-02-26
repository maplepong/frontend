import home from "./components/Home.js";
import login from "./components/Login.js";

class App {
    constructor() {
        // 초기 이벤트 등록 및 렌더링
        this.setup();
        this.render();
    }

    setup() {
        // app.js는 전체 컴포넌트들의 감독자 역할을 하게 되므로
        // 전역 이벤트 감지 함수들이 위치한다.
        // 'popstate'를 통해 web의 뒤로가기, 앞으로가기 이벤트를 감지한다.
        // 'routeChange'는 주로 버튼을 누를 때 해당 컴포넌트에서 발생하는
        // 전역 CustomEvent를 감지하여 App의 render 함수를 호출한다. 
        window.addEventListener('popstate', () => this.render());
        window.addEventListener('routeChange', () => this.render());
    }

    render() {
        const app = document.querySelector('#app');
        var path = window.location.pathname;
        
        // 본래 const path = window.location.pathname
        // 으로 코드 진행하고 아래 if 문은 없는게 맞지만,
        // live server의 편의성을 위해 임시로 추가했습니다.
        if (path === '/' || path === '/index.html') {
            path = '/home';
            window.history.pushState({}, '', '/home');
        }

        switch (path) {
            case '/home':
                new home(app); break;
            case '/login':
                new login(app); break;
            default:
                app.innerHTML = `<h1>404 Not Found</h1>`;
        }
    }
}

new App();