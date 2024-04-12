/* @jsx myReact.createElement */
import myReact, { Link } from "../core/myReact.js";
import { requestLogin, requestFriendList, requestUserInfo, requestFriend } from "../core/Api.js";
import { useState, useEffect } from "../core/myReact.js"
import "../css/index.css";
import "../css/friend.css";

const RequestFriend = () => {
    requestLogin(() => { return (["subcho", "1234"])}, ()=>{} );

    const [nickname, setNickname] = useState('');
    // const nickname = "gyopark";
    const handleClick = (event) => {
        event.preventDefault();  // 폼의 기본 동작 방지
        try {
            const response = requestFriend(nickname);
                console.log('친구 요청 결과:', response);
        } catch (error) {
            console.error('친구 요청 에러:', error);
        }
    }

    return (
        <div id="requestFriend">
            <form id="requestBox">
                <input type="text" id="nickname" placeholder="닉네임 입력" value={nickname} onchange={e => {
                    console.log(e);
                    setNickname(e.target.value)}
                } />
                <button type="button" onclick={handleClick}>친구 요청 보내기</button>
            </form>
        </div>
    );
}

export default RequestFriend;