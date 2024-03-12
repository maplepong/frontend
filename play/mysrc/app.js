import Component from "./core/Components.js";
import Router from "./core/Router.js";

export default function App($target, props)
{
    console.log('App 시작!');

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
        `;

    const appComponent = Component($target, { someValue: 'Hello, World!' });

    function setupApp() {
        document.addEventListener("DOMContentLoaded", () => {
            window.addEventListener("routeChange", Router);
            window.addEventListener("popstate", Router);
        })
        Router();
    }
    
    console.log(window.state);
    console.log(appComponent);
    setupApp();
    appComponent.render();
}


