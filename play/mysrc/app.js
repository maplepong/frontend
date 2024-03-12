import Component from "./core/Components.js";
import Router from "./core/Router.js";

export default function App($target, props)
{
    console.log('App 시작!');

    window.template = `<div>
        <img src="./mysrc/asset/design/maplepong.png" id="Logo">
    </div>`;

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


