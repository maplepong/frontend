import { request42ApiLogin, requestApiSignup } from "./Api";
import myReact from "./myReact";
import axios from "axios";

const apiInstance = axios.create({
	baseURL: "http://localhost:8001/",
	headers: {
		'Content-Type' : 'application/json',
	},
	timeout: 5000,
	withCredentials: false, //develope
})

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

apiInstance.interceptors.response.use(response => response, async error => {
	const originalRequest = error.config;
	if (!error.response || !error.response.status)
		return Promise.reject(error);
	if (error.response.status === 401){ //token err
		console.log("401::trying refresh")
		if (!originalRequest._retry){
			originalRequest._retry = true;
			try {
				console.log("cookie : ", document.cookie)
				const refreshToken = localStorage.getItem('refreshToken');
				const response = await apiInstance.request({
					method : "POST",
					url: "user/api/token/refresh",
					headers: {
						'X-CSRFToken': getCookie('csrftoken'),
						'cookie': document.cookie,
					},
				});
				const {accessToken} = response.data;
				localStorage.setItem('accessToken', accessToken);
				apiInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
				originalRequest.headers['Authorization'] = `Bearer ${response.data.access_token}`;
			}
			catch (refreshError) {
				//remove local data
				console.error("refresh token fail::", refreshError);
				//redirect to home;
			}
		}	
	}
	if (!error.response) { // It's a network error
		if (!originalRequest._retry){
			originalRequest._retry = true;
			console.log('Network error - retrying...');
			return apiInstance.request(error.config);
		}
	}
    return Promise.reject(error);
});

function setToken() {
	if (localStorage.accessToken){
		apiInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.accessToken}`;
	}
}


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
	request42ApiLogin(code) {
		if (code === null) {
			console.log("failed to get Code");
			return ;
		}
		// console.log("Code", code);
		return apiInstance.request({
			headers: {
				'X-CSRFToken': getCookie('csrftoken'),
				'Content-Type': 'multipart/form-data'
			},
			url: 'user/api-login',
			method: "POST",
			data: {
				code: code,
			}
		}).
		then(response => {
			if (response.status === 202) {
				const username = response.data.id;
				console.log("id: " + username, "님은 회원가입 필요");
				const signupResponse = localStorage.setItem('username', username);
				myReact.redirect("api-signup");
				return signupResponse;
			} else if (response.status === 200) {
				console.log(response.data.username);
				const username = response.data.username;
				localStorage.setItem('username', username);
				localStorage.setItem('nickname', response.data.nickname);
				localStorage.setItem('accessToken', response.data.access_token)
				axios.defaults.headers.common['Authorization'] = response.data.access_token;
				console.log("이미 있는 회원입니당");
				myReact.redirect("home");
				console.log(localStorage.getItem('accessToken'));
				console.log(localStorage.getItem('nickname'))
				return response;
			}
		}).
		catch(error => {
			console.log("42 API LOGIN ERROR", error)
			return error;
		})
	},
	requestApiSignup(username, nickname) {
		return apiInstance.request({
			headers: {
				'X-CSRFToken': getCookie('csrftoken'), 
				'Content-Type': 'multipart/form-data'
			},
			url: "user/api-signup",
			method: "POST",
			data: {
				id: username,
				nickname: nickname
			}
		}).
		then(response => {
			console.log("API SIGNUP: ", response);
			return response;
		}).
		catch(error => {
			console.log("API SIGNUP ERROR: ", error);
			return error;
		})
	},
    sendEmailVerifyPin(_email) {
        return apiInstance.request({
            headers: {
				'X-CSRFToken': getCookie('csrftoken'),
			},
            method: "POST",
            url: "user/generate_email_pin",
			data: {
				email: _email
			}
        })
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(error => { 
            console.log(error)
            return error 
        })
    },
    checkEmailVerifyPin(_email, _pin){
        console.log("YOUR EMAIL", _email, "YOUR PIN", _pin);
        return apiInstance.request({
            headers: {
				'X-CSRFToken': getCookie('csrftoken'),
			},
            method: "POST",
            url: "user/verify_pin",
			data: {
				email: _email,
                pin: _pin
			}
        })
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(error => { 
            console.log(error)
            return error 
        })
    },
	sendFriendRequest(nickname) {
		setToken();
		return apiInstance.request({
			method: "POST",
			url: "user/friend/" + nickname,
		})
		.then(response => {
			console.log(nickname + "에게 친구 요청함")
			return response;
		})
		.catch(error => { return error });
	},
	handleFriendRequest(nickname, type){//type ==="POST", "DELETE"
		setToken();
		return apiInstance.request({
			method: type,
			url: "user/friend-request/" + nickname,
		})
		.then(response => {
			console.log(nickname + "의 친구 요청을 " + type + "하였습니다.")
			return response.status;
		})
		.catch(error => { return error });
	},
	deleteFriend(nickname) {
		setToken();
		return apiInstance.request({
			method: "DELETE",
			url: "user/friend/" + nickname,
		})
		.then(response => {
			console.log(nickname + "(와)과 더 이상 친구가 아닙니다.")
			return response.status;
		})
		.catch(error => { return error });
	},
	logout() { //not on api list
		localStorage.removeItem("username");
		localStorage.removeItem("nickname");
		localStorage.removeItem("accessToken");
		apiInstance.defaults.headers.common['Authorization'] = null;
		apiInstance.defaults.withCredentials = false;
		alert("로그아웃되었습니다");
		myReact.redirect("/");
	},
	getFriendList(){
		setToken();
		return apiInstance.request({
			method: "GET",
			url: "user/friend-list",
		}).then(response => {
			console.log(response);
			return response.data;
		})
		.catch(error => { return error })
	},
	getRequestFriendList(){
		setToken();
		return apiInstance.request({
			method: "GET",
			url: "user/friend-request-list",
		})
		.then(response => {
			// console.log(response);
			return response.data;
		})
		.catch(error => { return error });
	},
	signup(username, password, nickname, mail){
		// setToken(); // 없어도 된다.
		const formData = new FormData();
		console.log("INFO", username, password, nickname, mail);
		formData.append('username', username);
		formData.append('nickname', nickname);
		formData.append('password', password);
		formData.append('email', mail);
		return apiInstance.request({
			method: "POST",
			url: "user/sign-up",
			data: formData,
			headers: {
				'X-CSRFToken': getCookie('csrftoken'),
				'Content-Type': 'multipart/form-data',
			}
		}).then(response => {
			console.log(response);
			console.log(username, '의 회원가입 완료!');
			return response;
		}).catch(error => {
			console.error('Error: ', error.response);
			return error.response;
		});
	},
	validCheck(type, value){
		setToken();
		return apiInstance.request({
			method: "GET",
			url: "user/valid-check?type=" + type + "&value="+ value,
		})
		.then(response => {
			console.log(value," 값은 ",type, " 값으로 적합하다")
			return response;
		})
		.catch(error => { 
			if (!error.response || !error.response.status)
				return error;
			if (error.response.status === 409){
				console.log(value," 값은 ",type, " 할수없다.. 중복되었다")
			}
			else {
				console.log(value," 값은 ",type, " 할수없다.. 요청에 문제가 있다")
			}
			return error 
		});
	},
	getUserInfomation(nickname){
		setToken();
		console.log("정보를 요청한 닉네임: ", nickname);
		return apiInstance.request({
			method: "GET",
			url: "user/information?nickname=" + nickname,
		})
		.then(response => {
			console.log(nickname + "의 정보를 불러왔습니다.")
			console.log(typeof response.data, response.data);
			return response.data;
		})
		.catch(error => { 
			console.log("에러!!")
			return error 
		});
	},
	patchUserInfomation(changedValue){ //409 conflict
		setToken();
		const nickname = localStorage.nickname;
		return apiInstance.request({
			method: "PATCH",
			url: "user/information",
			data: changedValue,
			headers: {
				'Content-Type' : 'application/json',
			},
		})
		.then(response => {
			console.log(nickname + "의 정보를 변경했습니다.")
			return response.data;
		})
		.catch(error => { 
			console.log(nickname + "의 정보를 변경하지 못했습니다.")
			return error });
	},
	userImage(type, src){
		setToken();
		if (type === "POST"){
			if (!src){
				console.error("api image post:: no image provided");
				return false;
			}
			const formData = new FormData();
			formData.append('image', src);
			return apiInstance.request({
				method: type,
				url: "user/image",
				data: formData,
				headers: { //develope
					'Content-Type' : 'multipart/form-data'
				},
			}).then(response => {
				console.log("사진을 올렸다")
				return response.status;
			})
			.catch(error => { 
				console.log("사진을 올리지 못했다...")
				return error });
		}
		return apiInstance.request({
			method: type,
			url: "user/image",
		})
		.then(response => {
			console.log("사진을 " + type + " 했다")
			return response.data;
		})
		.catch(error => { 
			console.log("사진을 " + type + " 하지 못했다...")
			return error });
	}
}

export default api;