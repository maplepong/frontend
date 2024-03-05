function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

const baseUrl = () => {
	return "http://10.19.247.54:8000/";
}

export default class Api {
	TIME_OUT = 3000;
	constructor () {
	}
	static requestLogin(username, password) {
		axios.defaults.withCredentials = true;
		const formData = new FormData();
		formData.append('username', username); 
		formData.append('password', password);
		axios.post(baseUrl() + "user/login", formData, {headers : {
			'X-CSRFToken': getCookie('csrftoken'), 
			'Content-Type': 'multipart/form-data'
		}})
		.then(response => {
			console.log('Response:', response);
			console.log('Data', response.data);
			console.log('RequestResponse', response.request);
			// localStorage.setItem('username', username);
			localStorage.setItem('accessToken', response.data.access_token)
			// localStorage.setItem('refreshToken', response.data.data.refreshToken)
			// localStorage.setItem('expiredTime', response.data.data.cur_time)
			// axios.defaults.headers.common['x-access-token'] = response.data.data.accessToken
			})
			.catch(error => {
			console.error('Error:', error);
			});
	}
	static requestSignup(username, password, nickname) {
		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		formData.append('nickname', nickname);
		axios.post(baseUrl() + "users/sign-up", formData, {headers : {
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
		axios.get(baseUrl() + "user/valid-check" + 
		"?type=" + type + "&value=" + value)
		.then(response => {
			console.log('Response:', response);
			})
			.catch(error => {
			console.error('Error:', error);
			});
	}
}
