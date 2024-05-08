/* @jsx myReact.createElement */
import myReact, { Link } from "../core/myReact.js";
import { useState, useEffect } from "../core/myReact.js";
import "../css/friend.css";
import api from "../core/Api_.js";
import NicknameHover from "./NicknameHover.js";
import RequestFriend from "./RequestFriend.js";
// import { requestFriendList } from "../core/Api.js";

const FriendList = ( props ) => {
	//testing
	// async function requestLogin() {
	// 	const res = await api.login(() => {return ["test", "4545"]})
	// 	console.log(res);
	// }
	// requestLogin();

    const [ list, setList ] = useState({
        sends: [],
        receives: []
    });
	
    const [ friendlist, setFriendList ] = useState([]); 
    
    useEffect(() => {
        const fetchData = async () => {
            const friendRequests = await api.getRequestFriendList();
            console.log("GET REQUEST LIST", friendRequests);
            
            const friends = await api.getFriendList();
            console.log("GET FRIEND LIST", friends);
            
            setList(friendRequests);
            setFriendList(friends);
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log("Updated LIST", list);
        console.log("Updated FRIENDLIST", friendlist);
    }, [list, friendlist]); // 상태 업데이트 후 확인
    
    const seeInfo = (nickname) => {
        // const res = await api.getUserInfomation(nickname);
		console.log("PROPS", props);
        props.callback(nickname); // Home 컴포넌트로 정보 전달
    }
    return (
        <div id="box">
            <span id="manage">친구 관리</span>
            <RequestFriend />
            <hr className="line" />
            <div class="content">
                <span id="request">받은 친구 요청</span>
                <ul>
					{props.list && props.list.receives.length > 0 ? 
					props.list.receives.map((req) => <div>
                        <li class="exchange">
                        {req.from_user}
                        <button class="inter" onClick={() => api.handleFriendRequest(req.from_user, "POST")}>수락</button>
                        <button class="inter" onClick={() => api.handleFriendRequest(req.from_user, "DELETE")}>거절</button>
                    </li></div>)
					: <span>받은 요청이 없습니다.</span>}
				</ul>
            </div>
            <hr className="line" />
            <div class="content">
                <span id="request">보낸 친구 요청</span>
				<ul>
					{props.list && props.list.sends.length > 0 ? 
					props.list.sends.map((req) => <div>
                        <li class="exchange">{req.to_user}
                        <button class="inter" onClick={() => api.handleFriendRequest(req.to_user, "DELETE")}>취소</button>
                    </li></div>)
					: <span>보낸 요청이 없습니다.</span>}
				</ul>
            </div>
            <hr className="line" />
            <div class="content">
                <span id="request">내 친구들</span>
                <ul>
					{props.friendlist && props.friendlist.length > 0 ? 
					props.friendlist.map((item) => <div>
                        <li class="exchange" key={item.id}>
							<NicknameHover nickname={item.nickname} />
                        {/* <button class="inter" onClick={() => {seeInfo(item.nickname)}}>정보</button>
                        <button class="inter" onClick={() => api.deleteFriend(item.nickname)}>삭제</button> */}
                        </li></div>)
					: <span>친구가 없습니다.</span>}
				</ul>
            </div>
        </div>
    );
}

export default FriendList;