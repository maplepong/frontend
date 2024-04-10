/* @jsx myReact.createElement */
import myReact, { Link } from "../core/myReact.js";
import { requestLogin, requestFriendList, requestUserInfo } from "../core/Api.js";
import { useState, useEffect } from "../core/myReact.js"
import "../css/index.css";
// import "../css/friend.css";

const FriendList = () => {
    requestLogin(() => { return (["subcho", "1234"])}, ()=>{} );

    requestFriendList();
    const [friendRequests, setFriendRequests] = useState({
        receives: [
            { from_user: "user1", id: 1 },
            { from_user: "user2", id: 2 }
        ],
        sends: [
            { to_user: "user3", id: 3 },
            { to_user: "user4", id: 4 }
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await requestFriendList();
            if (result && result.status == 200 && result.data) {
                setFriendRequests(result.data);
            }
        };
        fetchData();
    }, []);

    return (
        <div id="box">
            <span id="manage">친구 관리</span>
            <form id="find">⌕
                <input />
            </form>
            <hr className="line" />
            <div>
                <span id="request">받은 친구 요청</span>
                {friendRequests.receives.map((request, index) => (
                    <div key={index} className="icon">
                        <span className="user-name">👤{request.from_user}</span>
                        <div className="decide">
                            <span className="agree">수락</span>
                            <span className="ignore">거절</span>
                        </div>
                    </div>
                ))}
            </div>
            <hr className="line" />
            <div>
                <span id="request">보낸 친구 요청</span>
                {friendRequests.sends.map((request, index) => (
                    <div key={index} className="icon">
                        <span className="user-name">👤{request.to_user}</span>
                        <div className="decide">
                            <span className="agree">취소</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FriendList;