/* @jsx createElement */
import {createElement} from "../core/myReact.js";
import '../css/Chat.css'

const Chat = () => {
	return (
		<div id="container-chat">
			<div id="chat-list"> 
				<button>전체</button>
			</div>
			<div id="chat" />
		</div>
	)
}

export default Chat;