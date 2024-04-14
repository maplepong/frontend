/* @jsx myReact.createElement */
import myReact, { useState, useEffect } from "../core/myReact.js";
import api from "../core/Api_.js"

const ApiTest = () => {
	async function requestLogin() {
		const res = await api.login(() => {return ["test", "4545"]})
		console.log(res);
	}
	async function befriend() {
		console.log(await api.sendFriendRequest("subini"));
	}
	async function getFriendList() {
		console.log(await api.getFriendList());
	}
	async function okFriendList(){
		console.log(await api.handleFriendRequest("니얼굴", "POST"));
	}
	async function deleteFriend() {
		console.log(await api.deleteFriend("니얼굴"));
	}
	async function getInfo() {
		console.log(await api.getUserInfomation(localStorage.nickname));
	}
	async function patchInfo() {
		const changedValue = {
			nickname: "테스트",
		}
		console.log(await api.patchUserInfomation(changedValue));
		console.log(await api.getUserInfomation(localStorage.nickname));
	}
	async function getImage() {
		const image = await api.userImage("GET");
		const imgContainer = document.querySelector("#testImg");
		console.log(image);
		if (image && image.image === null){
			return alert("이미지가 없다!")
		}
		imgContainer.src = image.image;
	}
	async function patchImage(){
		console.log(await api.userImage("DELETE"));
		console.log(await api.userImage("POST", "https://img.freepik.com/premium-photo/anime-boy-cool-fighting-scene_962635-271.jpg"));
	}

	async function validCheck() {
		const value = document.querySelector("#validinput").value;
		if (!value || value === "")
			console.log("no value in input");
		console.log(await api.validCheck("nickname", value));
		console.log(await api.validCheck("username", value));
	}

	return (<div>
		<button onclick={requestLogin}>login: test</button>
		<button onclick={() => {api.logout()}}>로그아웃</button>
		<button onclick={befriend}>친구요청: gyopark</button>
		<button onclick={getFriendList}>getFriendList</button>
		<button onclick={okFriendList}>ok to FriendRequest</button>
		<button onclick={deleteFriend}>니얼굴과 친구 끊기</button>
		<input id="validinput" placeholder="유효성체크할값"></input>
		<button onclick={validCheck}>위 값 유효성 체크</button>
		<button onclick={getInfo}>정보불러오기</button>
		<button onclick={patchInfo}>정보 패치: introduction 아니면 nickname 가능///바뀐것만 넣기</button>
		<button onclick={getImage}>사진불러오기</button>
		<img style="{width: 150px, height: 150px}" src="null" id="testImg"></img>
		<button onclick={patchImage}>이미지 패치해보기.. delete가 안됨..</button>
	</div>)
	
}

export default ApiTest;