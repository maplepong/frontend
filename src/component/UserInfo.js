/* @jsx myReact.createElement */
import api from "../core/Api_.js";
import myReact , { useEffect, useState } from "../core/myReact.js";
import "../css/MyInfo.css"

const UserInfo = (props) => {
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
	console.log("data", data);

    useEffect(() => {
        const fetchData = async () => {
			const response = await api.getUserInfomation(props.nickname);
			console.log("대답", response);
			if (response) {
				console.log("정보 받아옴")
				setData(response);
			} else {
				console.error("No data returned from API");
			}
        };
        fetchData();
    }, []);

	// useEffect(() => console.log(data), [data]);

	// useEffect(() => {
	// 	console.log("변동사항", data);  // 이 위치에서 data 상태 로그를 확인
	// }, [data]);  // data가 변경될 때마다 실행
	
	return (
		<div id="container-myinfo" class="modal">
			<div id="myinfo-headline">
				<p>내정보</p>
				<button>X</button>	
			</div>
			<div id="myinfo-body" onclick={() => console.log(data)}>
				<img id="myinfo-img" src={data.image}></img>
				<ul>
					<li>id {data.id}</li>
					<li>information {data.introduction}</li>
					<li>lose {data.losses}</li>
					<li>nickname {data.nickname}</li>
					<li>totalgame {data.total_games}</li>
					<li>username {data.username}</li>
					<li>wins {data.wins}</li>
					<li>win_rate {data.win_rate}</li>
					<li>email {data.email}</li>
					{/* <li>image {data.image}</li> */}
				</ul>
			</div>
		</div>
	)
}

export default UserInfo;