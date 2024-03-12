function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

const baseUrl = () => {
	// return "http://10.19.247.54:8001/";
	return "http://localhost:8002/";
}


export function requestLogin(username, password){
	axios.defaults.withCredentials = true;
	const formData = new FormData();
	formData.append('username', username); 
	formData.append('password', password);
	axios.post(
		baseUrl() + "user/login", 
		formData, 
		{
			headers : {
			'X-CSRFToken': getCookie('csrftoken'), 
			'Content-Type': 'multipart/form-data'
			}
		}	
	)
	.then(response => {
		console.log('Response:', response);
		// console.log('Data', response.data);
		// console.log('RequestResponse', response.request);
		localStorage.setItem('username', username);
		console.log(response.data.nickname);
		localStorage.setItem('nickname', response.data.nickname);
		localStorage.setItem('accessToken', response.data.access_token)
		// localStorage.setItem('refreshToken', response.data.data.refreshToken)
		// localStorage.setItem('expiredTime', response.data.data.cur_time)
		axios.defaults.headers.common['Authorization'] = response.data.access_token;
		// console.log(response.headers);
		console.log(document.cookie)
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

export function requestSignup(username, password, nickname) {
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

export function requestValidCheck(type, value) {
	axios.get(baseUrl() + "user/valid-check" + 
	"?type=" + type + "&value=" + value)
	.then(response => {
		console.log('Response:', response);
		})
		.catch(error => {
		console.error('Error:', error);
		});
}
export  function requestUserInfo(nickname){
	axios.defaults.withCredentials = false; //develope
	axios.request({
		headers: {
			Authorization: `Bearer ${localStorage.accessToken}`,
		},
		method: "GET",
		url: baseUrl() + "user/information?nickname=" + nickname,
	})
	.then(response => {
	console.log('Response:', response);
	return response.data;
	})
	.catch(error => {
	console.error('Error:', error);
	});
}

export async function requestChangePassword(username, password, new_password) {
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
	console.log('Response:', response);
	})
	.catch(error => {
	console.error('Error:', error);
	});
}


export function requestRefresh(username, password){
	axios.defaults.withCredentials = true;
	axios.post(
		baseUrl() + "user/api/token/refresh", 
		{
			headers : {
			'X-CSRFToken': getCookie('csrftoken'), 
			}
		}	
	)
	.then(response => {
		console.log('Response:', response);
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


export default { requestLogin, requestSignup, requestValidCheck, requestUserInfo, requestChangePassword}