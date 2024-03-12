import Component from "./core/Component.js";
import Router from "./core/Router.js";

export default function App($target, props)
{
    const state = {}
    //Component 선언
    const appComponent = Component($target, props);

    // 상태변화 및 렌더 함수 초기화
    appComponent.setState({...props, appValue: 'app 선언'})
    appComponent.render = () => {
        $target.innerHTML = `
        <div data-route="">
            <img src="./mysrc/asset/design/maplepong.png" id="Logo">
        </div>
        <header>
            <button data-route="home">Home</button>
            <button data-route="about">About</button>
            <button data-route="contact">Contact</button>
            <button data-route="login" id="LgnContainer">Login</button>
            <button data-route="main">after login</button>
        </header>
        <main></main>
    `;
    }

    appComponent.setup = () => {
        document.addEventListener("DOMContentLoaded", () => {
            document.querySelectorAll('[data-route]').forEach(button => {
                button.addEventListener('click', function() {
                    const pathName = this.getAttribute('data-route');
                    history.pushState({}, "", pathName);
                    Router();
                });
            });
    
            window.addEventListener("routeChange", Router);
            window.addEventListener("popstate", Router);
            Router(); // 초기 라우트 설정
        });
    }

    // 초기화 및 렌더
    appComponent.setup();
    appComponent.render();
    console.log(window.state);
}


