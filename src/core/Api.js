//import router from "./Router.js";

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

const baseUrl = () => {
	// return "http://10.19.247.54:8000/";
	return "http://localhost:8000/";
}

const redirect = (page) => {
	history.pushState({}, "", "/");
	if (page === "/") {
		localStorage.removeItem("username");
		localStorage.removeItem("nickname");
		localStorage.removeItem("in");
		localStorage.removeItem("");
	}
	router();
}

function requestLogin(getInfo, resultLogin){

	const [username, password] = getInfo();
	var status = null;
	axios.defaults.withCredentials = false;
	const formData = new FormData();
	console.log(username, password);
	formData.append('username', username);
	formData.append('password', password);
	const response = axios.post(
		baseUrl() + "user/login",
		formData,
		{
			headers: {
				'X-CSRFToken': getCookie('csrftoken'),
				'Content-Type': 'multipart/form-data'
			}
		}
	)
	.then(response=>{
		console.log(response);
		if (typeof response !== "undefined"){
			if (response.status === 200){
				localStorage.setItem('username', username);
				localStorage.setItem('nickname', response.data.nickname);
				localStorage.setItem('accessToken', response.data.access_token)
				axios.defaults.headers.common['Authorization'] = response.data.access_token;
			}
			// console.log("status", response.status);
			status = response.status;
			resultLogin(status);
	
		}
	}).catch(error => {
		console.error('Error:', error);
		return ;
	});
}

const urlCheck = (location) => {

	let getParameter = (key) => {
		return new URLSearchParams(location.search).get(key);
	};

	const name = getParameter("code");
	console.log('code:', code);
}

async function request42ApiLogin(code) {
	var status = null;
	axios.defaults.withCredentials = false;

	console.log("api login");
	if (code == null) {
		console.log("code is null");
		return;
	}
	const formData = new FormData();
	console.log(code);
	formData.append('code', code);
	console.log("들어오긴 할까요,,,ㅅㅂㅅㅂㅅㅂ");
	const response = await axios.post(
		baseUrl() + "user/api-login",
		formData,
		{
			headers: {
				'X-CSRFToken': getCookie('csrftoken'),
				'Content-Type': 'multipart/form-data'
			},
			  timeout: 50000000
		}
	)
		.catch(error => {
			console.error('Error:', error);
			return;
		});
	if (typeof response !== "undefined") {
		if (response.status === 200) {
			console.log(response.data.username);
			const username = response.data.username;
			localStorage.setItem('username', username);
			localStorage.setItem('nickname', response.data.nickname);
			localStorage.setItem('accessToken', response.data.access_token)
			axios.defaults.headers.common['Authorization'] = response.data.access_token;
			console.log("이미 있는 회원입니당");
			console.log(localStorage.getItem('accessToken'));
			console.log(localStorage.getItem('nickname'))
		}
		else if (response.status === 409) {
			console.log("회원가입 필요");
			return;
		}
		console.log("status", response.status);
		status = response.status;
		//resultLogin(status);
	}
}

function requestSignup(username, password, nickname) {
	axios.defaults.withCredentials = false;
	const formData = new FormData();
	console.log(username,password,nickname);
	formData.append('username', username);
	formData.append('password', password);
	formData.append('nickname', nickname);
	axios.post(baseUrl() + "user/sign-up", formData, {headers : {
		'X-CSRFToken': getCookie('csrftoken'), 
		'Content-Type': 'multipart/form-data'
	}})
	.then(response => {
		console.log('Response:', response);
	}).catch(error => {
		console.error('Error:', error);
	});
}

function requestValidCheck(type, value) {
	axios.get(baseUrl() + "user/valid-check" + 
	"?type=" + type + "&value=" + value)
	.then(response => {
		// console.log('Response:', response);
		})
		.catch(error => {
			console.error('Error:', error);
		});
}

async function requestUserInfo(nickname, resultInfo){
	axios.defaults.withCredentials = false; //develope
	const response = await axios.request({

		headers: {
			Authorization: `Bearer ${localStorage.accessToken}`,
		},
		method: "GET",
		url: baseUrl() + "user/information?nickname=" + nickname,
	})
	.then(response => {
		console.log('Response:', response);
	})
	.catch(error => {
		console.error('Error:', error);
	});
	if (typeof response === "undefined" || response.status != 200){
		console.log("UserInfo request Error")
		return ;
	}
	//response.status == 200
	else {
		console.log("UserInfo request ok")
		// resultInfo(response.data);
		console.log(response);
		return response.data;
	} 
}

async function requestChangePassword(username, password, new_password) {
	axios.defaults.withCredentials = false; //develope
	const formData = new FormData();
	formData.append('username', username);
	formData.append('current_password', password);
	formData.append('new_password', new_password);
	axios.put(baseUrl() + "user/change-password", formData, {
		headers: {
			Authorization: `Bearer ${localStorage.accessToken}`,
		},
		// url: baseUrl() + "user/change-password",
		// data: formData,
	})
	.then(response => {
	// console.log('Response:', response);
	})
	.catch(error => {
	console.error('Error:', error);
	});
}

function requestRefresh(username, password){
	axios.defaults.withCredentials = true;
	axios.post(
		baseUrl() + "user/api/token/refresh",
		{
			headers: {
				'X-CSRFToken': getCookie('csrftoken'),
			}
		}
	)
	.then(response => {
		// console.log('Response:', response);
		// console.log('Data', response.data);
		// console.log('RequestResponse', response.request);
		// localStorage.setItem('username', username);
		// console.log(response.data.nickname);
		// localStorage.setItem('nickname', response.data.nickname);
		localStorage.setItem('accessToken', response.data.access_token)
		// localStorage.setItem('refreshToken', response.data.data.refreshToken)
		// localStorage.setItem('expiredTime', response.data.data.cur_time)
		axios.defaults.headers.common['Authorization'] = response.data.access_token;
		// console.log(response.headers);
	})
	.catch(error => {
		console.error('Error:', error);
	});
}


export { requestLogin, requestSignup, requestValidCheck, requestUserInfo,request42ApiLogin, requestChangePassword}

