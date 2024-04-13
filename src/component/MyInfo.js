/* @jsx myReact.createElement */
import { requestUserInfo } from "../core/Api.js";
import myReact , { Link, useEffect, useState} from "../core/myReact.js";
import "../css/MyInfo.css"

const MyInfo = () => {
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
	});
	const resultInfo = (responsedata) => {
		if (!responsedata)
			return console.error("noDATA")
		// console.log("image...",responsedata.image)
		// console.log(responsedata);
		setData({...responsedata});		
	}
	useEffect(() => requestUserInfo(localStorage.nickname, resultInfo), []);
	// useEffect(() => console.log(data), [data]);
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
					{/* <li>image {data.image}</li> */}
				</ul>
			</div>
		</div>
	)
}

export default MyInfo;