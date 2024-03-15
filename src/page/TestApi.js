import Component from "../core/Component.js";
import { requestLogin, requestSignup, requestValidCheck, requestUserInfo, requestChangePassword, requestRefresh } from "../core/Api.js"
import Input from "../components/Input.js";

export default class testApi extends Component {
	username;
 	password;
	setup() {
		this.username = "test";
		this.nickname = "nicknametest";
		this.password = "4545";
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
		<button id="refresh">refresh</button>
		
		<div style="{border: solid black 1px}">
		<div id="cur-password"></div>
		<div id="new-password"></div>
		<button id="change-pw">비번 바꿔바꿔~</button>
		</div>
		<div id="modal">
		<img id="char" src="https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg">
		</div>
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
		new Input(document.querySelector("#cur-password"), {
			label: "현재PW",
			id: "input-cur-password",
		})
		new Input(document.querySelector("#new-password"), {
			label: "뉴늎PW",
			id: "input-new-password",
		})
		// document.querySelector("#input-username").createTextNode("test");
		// document.querySelector("#input-nickname").createTextNode("nicknametest");
		// document.querySelector("#input-password").createTextNode("4545");
	}
	getInput(){
		const username = document.querySelector("#input-username");
		const nickname = document.querySelector("#input-nickname");
		const password = document.querySelector("#input-password");
		this.username = username.value;
		this.nickname = nickname.value;
		this.password = password.value;
	}
	login() {
		this.setup();
		// this.getInput();
		console.log(this.username);
		console.log(this.password);
		const data = requestLogin(this.username, this.password)
		console.log("dddd" + data);
		this.nickname = data.nickname;
	}
	async getUserInfo() {
		this.nickname = "nicknametest"
		var data;
		console.log("?")
		const promise = new Promise((resolve, reject) => {
			data = requestUserInfo(this.nickname);
			resolve();
		})
		console.log("??")
		await promise;
		console.log("???");
		console.log(data);

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
		this.addEvent("click", "#change-pw", () => {
			this.changePassword();
		})
		this.addEvent("click", "#refresh", () => {
			this.refresh();
		})
	}
	changePassword(){
		const curpw = document.querySelector("#input-cur-password").value;
		const newpw = document.querySelector("#input-new-password").value;
		if (curpw === "" || newpw=== "")
		{
			alert("no value in password");
			return;
		}
		console.log(curpw, newpw);
		requestChangePassword(this.username, curpw, newpw);
		
	}
	showUserInfo(data){
		
	}

	refresh(){
		requestRefresh();
	}
}