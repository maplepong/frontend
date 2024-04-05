/* @jsx myReact.createElement */
import myReact from "./core/myReact.js";
import myReactDOM, { Root } from "./core/myReactDOM.js"
import App from "./app.js"
// import Navbar from "./component/Navbar.js";

const root = myReactDOM.createRoot(document.querySelector("#root"));

root.render(<App />);
