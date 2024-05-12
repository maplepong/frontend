/* @jsx myReact.createElement */
import api from "../core/Api_.js";
import myReact, { useEffect, useState } from "../core/myReact.js";
import '../css/UserStatus.css';

const UserStatus = (props) => {
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
	
	return <div id="container-UserStatus">
			<div id="info-line">
				<div class="level">level</div>
				<div class="level">42</div>
				<div class="usernickname">{data.nickname}</div>
			</div>
			<div class="status-line" style="background-color: #f1f1f1">
				<div id="stat-name">핑퐁 승률</div>
				<div id="stat-value">
					<div id="stat-value-text">25/50</div>
					<div id="stat-value-bar" class="red" data-value="25" />
				</div>
			</div>
			<div class="status-line" style="background-color: #DADADA; border-bottom-left-radius: 10px;">
				<div id="stat-name">토너먼트 성적</div>
				<div id="stat-value">
					<div id="stat-value-text">4/5</div>
					<div id="stat-value-bar" class="blue" data-value="4" />
				</div>
			</div>
		</div>
}

export default UserStatus;