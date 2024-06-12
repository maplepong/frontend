/* @jsx myReact.createElement */
import api from "../core/Api_.js";
import myReact , { useEffect, useState } from "../core/myReact.js";
import "../css/MyInfo.css"

const UserInfo = (props) => {

    if (window.location.pathname != "/myinfo"){
        props.nickname = window.location.pathname.split('/')[2];
    }

	const [data, setData] = useState({
		id: "",
        username: "",
        nickname: "",
        introduction: "",
        losses: "",
        total_games: "",
        wins: "",
        win_rate: "",
        image: "",
		email: "",
    });

    useEffect(() => {
        const fetchData = async () => {
			const response = await api.getUserInfomation(props.nickname);
			console.log("USERINFO", response)
			if (response) {
				setData(response);
			} else {
				console.error("No data returned from API");
			}
        };
        fetchData();
    }, []);

	function patchInfo(flag) {
		var patchBox = document.querySelectorAll(".infoPatchBox");
		console.log(patchBox);
		patchBox[flag - 1].style.display = "block";
	}

	async function changeInfo(flag) {
		var patchBox = document.querySelectorAll(".infoPatchBox");
		if (flag === 1) {
			var newIntro = document.querySelector("#newIntro").value
			console.log(newIntro)
			if (newIntro === null || newIntro === undefined)
				return ;
			var response = await api.patchUserInfomation(flag, newIntro);
		} else {
			var newNick = document.querySelector("#newNickname").value
				if (newNick === null || newNick === undefined)
					return ;
			var response = await api.patchUserInfomation(flag, newNick);
		} 
		patchBox[flag - 1].style.display = "none";
		console.log("ㅜㅠ푸ㅠㅜㅠㅜ",response); 
		setData(response)
	}

	async function changeImage() {
		console.log("이미지를 바꿔볼거에요")
	}

	const onFileChange = (e) => {
		const {
			target: {files},
		} = e;
		const filefile = files[0]; //우선 1개만 보여줄꺼니까 크기 1로 지정
		patchImage(filefile);
	}

	async function patchImage(FILE){
		const del = await api.userImage("DELETE")
		console.log("del", del);
		const post = await api.userImage("POST", FILE)
		console.log("post", post);
		setData(post.data);
	}

	return (
		<div style="display:flex;">
			<div id="container-myinfo" class="modal">
				<div id="myinfo-headline">
					<p>내정보</p>
					<button>X</button>
				</div>
				<div id="myinfo-body" onclick={() => console.log(data)}>
					<img id="myinfo-img" src={data.image}></img>
					<button onclick={() => patchInfo(3)}>이미지 변경</button>
					<ul id="info-body">
						<li>
							<span> id </span>
							<span> {data.id} </span>
						</li>
						<li>
							<span> introduction </span>
							<span> {data.introduction} </span>
							<button onclick={() => patchInfo(1)}>변경</button>
						</li>
						<li>
							<span> lose </span>
							<span> {data.losses} </span>
						</li>
						<li>
							<span> nickname </span>
							<span> {data.nickname} </span>
							<button onclick={() => patchInfo(2)}>변경</button>
						</li>
						<li>
							<span> totalgame </span>
							<span> {data.total_games} </span>
						</li>
						<li>
							<span> username </span>
							<span> {data.username} </span>
						</li>
						<li>
							<span> wins </span>
							<span> {data.wins} </span>
						</li>
						<li>
							<span> win_rate </span>
							<span> {data.win_rate} </span>
						</li>
						<li>
							<span> email </span>
							<span> {data.email} </span>
						</li>
						{/* <li>image {data.image}</li> */}
					</ul>
				</div>
			</div>
			<div id="patchBox">
				<div class="infoPatchBox">
					수정할 자기소개를 알려주세요.
					<input id="newIntro"></input>
					<button onclick={() => changeInfo(1)}>변경</button>
				</div>
				<div class="infoPatchBox">
					수정할 닉네임을 알려주세요.
					<input id="newNickname"></input>
					<button onclick={() => changeInfo(2)}>변경</button>
				</div>
				<div class="infoPatchBox">
					이미지를 업로드 해주세요.
					<input type="file" accept="image/*"  id="testUpload" onchange={onFileChange}></input>
					<button onclick={() => changeImage()}>업로드</button>
				</div>
			</div>
		</div>
	)
}

export default UserInfo;