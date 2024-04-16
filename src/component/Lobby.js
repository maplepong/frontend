/* @jsx myReact.createElement */
import myReact , { useEffect, useState} from "../core/myReact.js";
import { requestLobbyList, requestCreateGame } from "../core/ApiGame.js";

const Lobby = (props) => {
    const [lobbyData, setLobbyData] = useState([]);

	const resultLobby = (responsedata) => {
        setLobbyData(responsedata);		
        console.log("resultLobby", responsedata);
	}

    const resultCreateGame = (responsedata) => {
        console.log("responsedata : ", responsedata);
    }

    const create_game = async () => {
        console.log("create_game");
        const room_title = document.querySelector("#room-name").value;
        const password = document.querySelector("#room-password").value;
        const vibration = document.querySelector("#vibration").checked;
        console.log("room_title: ", room_title, "password: ", password, "vibration: ", vibration);
        resultCreateGame(await requestCreateGame(room_title, password));
        const res = await requestLobbyList();
        if (res === null) return console.log("requestLobbyList error");
        resultLobby(res);
    }

	useEffect(async () => {
        const res = await requestLobbyList();
        if (res === null) return console.log("requestLobbyList error");
        resultLobby(res);
    }, []);

	return (
        <div id="container-lobby" className="modal">
            <div id="lobby-headline">
                <p>Pingpong🏓</p>
                <button>X</button>
                <button id="open-modal" onClick={create_game}>게임 만들기</button>
                <div id="modal-backdrop" className="hidden"></div>
            </div>
            <div id="modal" className="hidden">
                <div id="modal-content">
                    <form id="room-form">
                        <div id="modal-title">방 제목</div>
                        <input type="text" id="room-name" name="room-name" placeholder="방 제목 입력"></input>
                        <div id="checkbox-container">
                            <input type="checkbox" id="vibration" name="vibration"></input>
                            <label htmlFor="vibration">비밀방 설정</label>
                        </div>
                        <input type="password" id="room-password" name="room-password" placeholder="비밀번호 입력"></input>
                        <div id="modal-buttons">
                            <input type="button" id="cancelbtn" value="취소"></input>
                            <input type="submit" id="confirmbtn" value="확인"></input>
                        </div>
                    </form>
                </div>
            </div>
            <div id="lobby-body">
                <ul>
                    {lobbyData ? lobbyData.map(room => (
                        <li key={room.id}>
                            <ul>
                                <li>Room Number: {room.id}</li>
                                <li>Room Title: {room.name}</li>
                                <li>Players:</li>
                                <ul>
                                    {room.players.map(player => (
                                        <li key={player.id}>{player.nickname}</li>
                                    ))}
                                </ul>
                                <li>Room Status: {room.status}</li>
                                <li>Locked: {room.password}</li>
                            </ul>
                        </li>
                    )) : <li>방이 없습니다.</li>}
                </ul>
            </div>
        </div>
    );
}

export default Lobby;