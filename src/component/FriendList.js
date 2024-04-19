/* @jsx myReact.createElement */
import myReact, { Link } from "../core/myReact.js";
import { useState, useEffect } from "../core/myReact.js";
import "../css/friend.css";
import api from "../core/Api_.js";
// import { requestFriendList } from "../core/Api.js";

const FriendList = () => {

    const [ list, setList ] = useState({
        sends: [],
        receives: []
    });
	
    const [ friendlist, setFriendList ] = useState([]); 
    
    useEffect(() => {
        const fetchData = async () => {
            const friendRequests = await api.getRequestFriendList();
            console.log("GET REQUEST LIST", friendRequests);
            setList(friendRequests);
    
            const friends = await api.getFriendList();
            console.log("GET FRIEND LIST", friends);
            setFriendList(friends);
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
                <ul>
					{list && list.receives.length > 0 ? 
					list.receives.map((req) => <div>
                        <li id="receives">
                        {req.from_user}
                        <button onClick={() => api.handleFriendRequest(req.from_user, "POST")}>수락</button>

                        <button onClick={() =>  api.handleFriendRequest(req.from_user, "DELETE")}>거절</button>
                    </li></div>)
					: <li>받은 요청이 없습니다.</li>}
				</ul>
            </div>
            <hr className="line" />
            <div>
                <span id="request">보낸 친구 요청</span>
				<ul>
					{list && list.sends.length > 0 ? 
					list.sends.map((req) => <li>{req.to_user}</li>)
					: <li>받은 요청이 없습니다.</li>}
				</ul>
            </div>
            <hr className="line" />
            <div>
                <span id="request">내 친구들</span>
                <ul>
					{friendlist && friendlist.length > 0 ? 
					friendlist.map((item) => <li key={item.id}>{item.nickname}</li>)
					: <li>친구가 없습니다.</li>}
				</ul>
            </div>
        </div>
    );
}

export default FriendList;