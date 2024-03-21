/* @jsx createElement */
import {createElement} from "./core/myReact.js";
import {MyReactDOM, Root} from "./core/myReactDOM.js"
import App from "./app.js"
import Navbar from "./component/Navbar.js";

const root = MyReactDOM.createRoot(document.querySelector("#root"));
root.render(<div>
	<App />
	<Navbar />
	</div>);
