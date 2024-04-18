/* @jsx myReact.createElement */
import myReact, { Link } from "../core/myReact.js";
import { useState, useEffect } from "../core/myReact.js";
import "../css/friend.css";
import api from "../core/Api_.js";

const FriendList = () => {

    // const result = async () => {
    //     const data = await api.getRequestFriendList();
    //     console.log(data);
    // }
    // result();

    const [ list, setList ] = useState({
        sends: [],
        receives: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await api.getRequestFriendList();
            setList(data);
        };
        fetchData();
    }, [])

    function renderReceives() {
        if (list.receives.length > 0) {
            const elements = list.receives.map((item, index) => {
                // fiberNode에서 children을 직접 참조하여 추출
                console.log("item", item);
                const content = item.from_user ? item.from_user : null;
                console.log("content", content);
                return <div key={index}>{content}</div>;
            });
            console.log("elements", elements.fiberNode);
            return <div>{elements}</div>;
        } else {
            return <div>받은 요청이 없습니다.</div>;
        }
    }
    
    

    return (
        <div id="box">
            <span id="manage">친구 관리</span>
            <form id="find">⌕
                <input />
            </form>
            <hr className="line" />
            <div>
                <span id="request">받은 친구 요청</span>
                {renderReceives()}
            </div>
            <hr className="line" />
            <div>
                <span id="request">보낸 친구 요청</span>
            </div>
        </div>
    );
}

export default FriendList;