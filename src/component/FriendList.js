/* @jsx myReact.createElement */
import myReact, { Link } from "../core/myReact.js";
import { useState, useEffect } from "../core/myReact.js";
import "../css/friend.css";
import api from "../core/Api_.js";
import { requestFriendList } from "../core/Api.js";

const FriendList = () => {

    const [ list, setList ] = useState({
        sends: [],
        receives: []
    });


	
	console.log(list);


	const fetchFriendRequestList = async () => {
		const res = await requestFriendList();
		console.log(res);
		setList(res);
	}
	useEffect(fetchFriendRequestList, []);
    // function renderReceives() {
    //     if (list.receives.length > 0) {
    //         const elements = list.receives.map((item, index) => {
    //             // 각 아이템의 fiberNode에서 첫 번째 child를 가져옴
    //             const content = item;
    //             console.log("Item:", item, "Content:", content);
    //             // 각 아이템에 대한 JSX 요소를 직접 반환
    //             console.log("초기", <div key={index}>{content}</div>);
    //             const value = <div key={index}>{content}</div>.children;
    //             console.log("value: ", value[0].from_user);
    //             return value[0].from_user;
    //         });
    //         console.log("Elements:", elements);
    //         return <div>{elements}</div>;  // 생성된 JSX 요소 배열을 반환
    //     } else {
    //         return <div>받은 요청이 없습니다.</div>;
    //     }
    // }
    
    // console.log("renderReceives", renderReceives());

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
					list.receives.map((req) => <li>{req.from_user}</li>)
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
        </div>
    );
}

export default FriendList;