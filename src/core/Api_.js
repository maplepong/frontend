import router from "./Router";
import myReact from "./myReact";
import axios from "axios";

const apiInstance = axios.create({
	baseURL: "http://localhost:8000/",
	headers: {
		'Content-Type' : 'application/json',
	},
	timeout: 1000,
	withCredentials: false, //develope
})
function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

apiInstance.interceptors.response.use(response => response, error => {
	if (!error.response) { // It's a network error
        console.log('Network error - retrying...');
        return axiosInstance.request(error.config);
    }
    return Promise.reject(error);
});


const api = {
	login(getInfo) {
		const [username, password] = getInfo();
		return apiInstance.request({
			headers: {
				'X-CSRFToken': getCookie('csrftoken'),
				'Content-Type': 'multipart/form-data'
			},
			method: "POST",
			url: 'user/login',
			data: {
				username: username, 
				password: password,
			}
		})
		.then(response => {
			if (response.status === 200){
				localStorage.setItem('username', username);
				localStorage.setItem('nickname', response.data.nickname);
				localStorage.setItem('accessToken', response.data.access_token)
				apiInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
			}
			return response;
		}).catch(error => {
			return error;
		})
	},
	sendFriendRequest(nickname) {
		return apiInstance.request({
			method: "POST",
			url: "user/friend/" + nickname,
		})
		.then(response => {
			console.log(nickname + "에게 친구 요청함")
			return response;
		})
		.catch(error => { return error });
	}

}

export default api;