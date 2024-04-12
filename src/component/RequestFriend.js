/* @jsx myReact.createElement */
import myReact, { Link } from "../core/myReact.js";
import { requestLogin, requestFriendList, requestUserInfo, requestFriend } from "../core/Api.js";
import { useState, useEffect } from "../core/myReact.js"
import "../css/index.css";
import "../css/friend.css";

const RequestFriend = () => {
    const [nickname, setNickname] = useState('');

    const handleClick = (event) => {
        event.preventDefault();
        const response = requestFriend(nickname);
        console.log('친구 요청 결과:', response);
    }

    return (
        <div id="requestFriend">
            <form id="requestBox">
            <input type="text" placeholder="닉네임 입력" onchange={e => {
                console.log("Input value:", e.target.value);
                setNickname(e.target.value);
            }} />
            <button type="button" onclick={handleClick}>친구 요청 보내기</button>
            </form>
        </div>
    );
}

export default RequestFriend;