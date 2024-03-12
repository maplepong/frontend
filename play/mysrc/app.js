import Component from "./core/Components.js";
import Router from "./core/Router.js";

export default function App($target, props)
{
    console.log('App 시작!');

    // html
    window.template = `
        <div>
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

    // Component 변수 생성
    const appComponent = Component($target, { someValue: 'Hello, World!' });

    function setupApp() {
        document.addEventListener("DOMContentLoaded", () => {
            // 버튼에 이벤트 리스너 추가
            document.querySelectorAll('[data-route]').forEach(button => {
                button.addEventListener('click', function() {
                    const pathName = this.getAttribute('data-route');
                    history.pushState({}, "", pathName);
                    Router(); // 페이지를 다시 렌더링
                });
            });
    
            window.addEventListener("popstate", Router);
            Router(); // 초기 라우트 설정
        });
    }

    setupApp();
    // appComponent.render();
}


