/* @jsx myReact.createElement */
import myReact , { useEffect, useState } from "../core/myReact.js";
import '../css/Chat.css'

const Chat = ( {socket} ) => {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (socket){
			socket.onmessage = (event) => {
				const data = JSON.parse(event.data);
				console.log("data : ", data);
				if (data.type === "chat") {
					const message = data.message;
					const sender = data.nickname;
					setMessages([...messages, { sender, message }]);
				}
			}
		}
	}, []);

	const sendMessage = (message) => {
        if (socket) {
            socket.send(JSON.stringify({ type: "chat", message: message, nickname: localStorage.getItem("nickname") }));
        }
		else
			alert("socket이 연결되지 않았습니다.");
    };

	return (
        <div id="container-chat">
            <div id="chat-list"> 
                <button>전체</button>
            </div>
            <div id="chat">
                <div id="messages">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.sender}:</strong> {msg.message}
                        </div>
                    ))}
                </div>
            </div>
			<input type="text" onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        sendMessage(e.target.value);
                        e.target.value = '';
                    }
                }} />
        </div>
    );
}


export default Chat;