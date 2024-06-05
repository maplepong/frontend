/* @jsx myReact.createElement */
import myReact, { useEffect, useState } from "../core/myReact.js";
import '../css/Chat.css';

const Chat = ({ gameId }) => {
    const [messages, setMessages] = useState([]);
    const [chatSocket, setChatSocket] = useState(null);

    useEffect(() => {
        if (gameId && !chatSocket) {
            const newChatSocket = new WebSocket("ws://localhost:9080/ws/chat/" + gameId + "/");
            setChatSocket(newChatSocket);

            newChatSocket.onopen = () => {
                console.log("chat socket opened");
                newChatSocket.send(JSON.stringify({ type: "connect", message: "hello", nickname: localStorage.getItem("nickname") }));
            };
        }
        if (chatSocket) {
            chatSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log("chat data :", data);
                if (data.type === "chat") {
                    const message = data.message;
                    const sender = data.nickname;
                    setMessages((prevMessages) => [...prevMessages, { sender, message }]);
                }
            };

            chatSocket.onclose = () => {
                console.log("채팅 연결 종료");
                setChatSocket(null);
            };
        }
            return () => {
                if (chatSocket)
                {   chatSocket.close();
                    setChatSocket(null);
                }
            };
    }, [chatSocket, gameId]);

    const sendMessage = (message) => {
        if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
            chatSocket.send(JSON.stringify({ type: "chat", message: message, nickname: localStorage.getItem("nickname") }));
        } else {
            alert("socket이 연결되지 않았습니다.");
        }
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
