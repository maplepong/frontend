/* @jsx myReact.createElement */
import myReact , { Link } from "../core/myReact.js";
import Navbar from "./Navbar.js";
import FriendList from "./FriendList.js";
import "../css/home.css"

const Home = () => {
	return <div id="home">
			<FriendList />
			<div id="info">
				<h1> Home </h1>
				<h2> this page is not set yet.</h2>
			</div>
			<Navbar />
		</div>
}

export default Home;