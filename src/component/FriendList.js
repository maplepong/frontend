/* @jsx myReact.createElement */
import myReact, { Link } from "../core/myReact.js";
import { useState, useEffect } from "../core/myReact.js";
import "../css/friend.css";
import api from "../core/Api_.js";

const FriendList = () => {

    const [friendreq, setfriendreq] = useState({
        sends: [],
        receives: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.getRequestFriendList();
            if (response && response.status === 200 && response.data) {
                setfriendreq(response.data);
            }
        };
        fetchData();
    }, []);

    const createRequestList = (requests, type) => {
        let requestList = [];
        for (let i = 0; i < requests.length; i++) {
            requestList.push(
                <div key={i}>
                    <span>👤 {requests[i].from_user || requests[i].to_user} 요청</span>
                    <button onClick={() => console.log(`${type === 'receive' ? '수락' : '취소'}`)}>{type === 'receive' ? '수락' : '취소'}</button>
                </div>
            );
        }
        return requestList;
    };

    const receivedRequestsElements = createRequestList(friendreq.receives, 'receive');
    const sentRequestsElements = createRequestList(friendreq.sends, 'send');

    return (
        <div id="box">
            <span id="manage">친구 관리</span>
            <form id="find">⌕
                <input />
            </form>
            <hr className="line" />
            <div>
                <span id="request">받은 친구 요청</span>
                {receivedRequestsElements}
            </div>
            <hr className="line" />
            <div>
                <span id="request">보낸 친구 요청</span>
                {sentRequestsElements}
            </div>
        </div>
    );
}

export default FriendList;