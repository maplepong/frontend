/* @jsx myReact.createElement */
import myReact, { Link } from "../core/myReact.js";
import { requestLogin, requestFriendList, requestUserInfo, requestFriend } from "../core/Api.js";
import { useState, useEffect } from "../core/myReact.js"
import "../css/index.css";
import "../css/friend.css";

const RequestFriend = () => {
    // const [nickname, setNickname] = useState('');
    const nickname = "gyopark";
    const submit = (event) => {
        event.preventDefault();
        requestFriend(nickname);
    }

    return (
        <div id="requestFriend">
            <form onSubmit={submit}>
                <label for="nickname" id="requestName">닉네임:</label>
                {/* <input type="text" id="nickname" value={nickname} onClick={e => {
                    console.log(e);
                    setNickname(e.target.value)}
                } /> */}
                <button type="submit">친구 요청 보내기</button>
            </form>
        </div>
    );
}

export default RequestFriend;