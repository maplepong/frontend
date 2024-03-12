import Component from "../core/Component.js";
import Api from "../core/Api.js"
import Input from "../components/Input.js";

export default class testApi extends Component {
	username;
 	password;
	setup() {
		this.username = "test";
		this.nickname = "nicknametest";
		this.password = "1234";
	}

	template () {
		return `
		<div id="username"></div>
		<div id="nickname"></div>
		<div id="password"></div>
		
		<button id="login">login</button>
		<button id="signup">signup</button>

		<div id="login-status"></div>
		<button id="get_info">GET 유저정보</button>
		`
	}
	mounted() {
		new Input(document.querySelector("#username"), {
			label: "ID",
			id: "input-username",
		})
		new Input(document.querySelector("#nickname"), {
			label: "NN",
			id: "input-nickname",
		})
		new Input(document.querySelector("#password"), {
			label: "PW",
			id: "input-password",
		})
	}
	getInput(){
		const username = document.querySelector("#input-username");
		const nickname = document.querySelector("#input-nickname");
		const password = document.querySelector("#input-password");
		if (username == undefined || username.value === ""){
			console.log(username);
			return false;
		}
		if (nickname == undefined || nickname.value === ""){
			console.log(nickname);
			return false;
		}
		if (password == undefined || password.value === ""){
			console.log(password);
			return false;
		}
		this.username = username.value;
		this.nickname = nickname.value;
		this.password = password.value;
		return true;
	}
	login() {
		this.setup();
		console.log(this.username);
		console.log(this.password);
		Api.requestLogin(this.username, this.password)
	}
	getUserInfo() {
		Api.requestUserInfo(this.nickname);
	}
	setEvent() {
		this.addEvent("click", "#login", () => {
			this.login();
		})
		this.addEvent("click", "#signup", () => {
			this.signup();
		})
		this.addEvent("click", "#get_info", () => {
			this.getUserInfo();
		})
	}
}