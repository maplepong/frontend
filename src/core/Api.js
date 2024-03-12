function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

const baseUrl = () => {
	// return "http://10.19.247.54:8000/";
	return "http://127.0.0.1:8000/";
}

export default class Api {
	TIME_OUT = 3000;
	constructor () {
	}
	instance;
	static makeInstance() {
		this.instance = axios.create({
			baseURL : baseUrl(),
			timeout: 1000,
		})
	}
	static requestLogin(username, password) {
		if (this.instance == undefined)
			this.makeInstance();
		this.instance.defaults.withCredentials = true;
		const formData = new FormData();
		formData.append('username', username); 
		formData.append('password', password);
		this.instance.post(baseUrl() + "user/login", formData, {headers : {
			'X-CSRFToken': getCookie('csrftoken'), 
			'Content-Type': 'multipart/form-data'
		}})
		.then(response => {
			console.log('Response:', response);
			console.log('Data', response.data);
			console.log('RequestResponse', response.request);
			localStorage.setItem('username', username);
			console.log(response.data.nickname);
			localStorage.setItem('nickname', response.data.nickname);
			localStorage.setItem('accessToken', response.data.access_token)
			// localStorage.setItem('refreshToken', response.data.data.refreshToken)
			// localStorage.setItem('expiredTime', response.data.data.cur_time)
			this.instance.defaults.headers.common['Authorization'] = response.data.access_token;
			console.log(response.headers);
			})
		.catch(error => {
		console.error('Error:', error);
		});
	}
	static requestSignup(username, password, nickname) {
		if (this.instance == undefined)
			this.makeInstance();
		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		formData.append('nickname', nickname);
		this.instance.post(baseUrl() + "users/sign-up", formData, {headers : {
			'X-CSRFToken': getCookie('csrftoken'), 
			'Content-Type': 'application/json'
		}})
		.then(response => {
			console.log('Response:', response);
			})
			.catch(error => {
			console.error('Error:', error);
			});
	}
	static requestValidCheck(type, value) {
		if (this.instance == undefined)
			this.makeInstance();
		this.instance.get(baseUrl() + "user/valid-check" + 
		"?type=" + type + "&value=" + value)
		.then(response => {
			console.log('Response:', response);
			})
			.catch(error => {
			console.error('Error:', error);
			});
	}
	static requestUserInfo(nickname){
		if (this.instance == undefined)
			this.makeInstance();
		this.instance.defaults.withCredentials = false; //develope
		this.instance.request({
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
	}
}
