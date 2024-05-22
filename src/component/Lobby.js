/* @jsx myReact.createElement */
import myReact, { useEffect, useState } from "../core/myReact.js";
import { requestLobbyList, requestCreateGame, requestGameInfo, requestJoinGame } from "../core/ApiGame.js";
import api from "../core/Api_.js";
import router from "../core/Router.js";

const Lobby = (props) => {
    const [lobbyData, setLobbyData] = useState([]);

    async function requestLogin() {
        const res = await api.login(() => ["test", "4545"]);
        console.log(res);
    }

    const resultLobby = (responsedata) => {
        console.log("Received lobby data:", responsedata);
        setLobbyData(responsedata);
    };

    const resultCreateGame = (responsedata) => {
        if (responsedata && responsedata.data.id) {
            setTimeout(() => {
                history.pushState({}, "", `/gameroom/${responsedata.data.id}`);
                router();
            }, 1000);
        }
        else
            alert("게임 생성 실패");
    };

    const create_game = async () => {
        console.log("create_game");
        const roomTitleElement = document.querySelector("#room-name");
        const passwordElement = document.querySelector("#room-password");
        const vibrationElement = document.querySelector("#vibration");

        if (!roomTitleElement || !passwordElement || !vibrationElement) {
            console.error("Required DOM elements are not found");
            return;
        }

        const room_title = roomTitleElement.value;
        const password = passwordElement.value;
        const vibration = vibrationElement.checked;

        console.log("room_title:", room_title, "password:", password, "vibration:", vibration);

        const createGameResponse = await requestCreateGame(room_title, password);
        if (createGameResponse === null) {
            return console.error("Failed to create game");
        }
        resultCreateGame(createGameResponse);
    };

    const updateList = async () => {
        const res = await requestLobbyList();
        if (res === null) {
            return console.log("requestLobbyList error");
        }
        console.log("Received lobby list:", res);
        setLobbyData(res);
    };

    const joinGame = async (gameId) => {
        const gameInfo = await requestGameInfo(gameId);
        if (gameInfo.status !== 200)
            return console.error("Failed to get game info:", gameInfo);
        let password = null;
        if (gameInfo.data.password !== null)
            password = prompt("비밀번호를 입력하세요");
        const joinGameResponse = await requestJoinGame(gameId, password);
        if (joinGameResponse && joinGameResponse.status === 201) {
            history.pushState({}, "", `/gameroom/${gameId}`);
            router();
        }
        else if (joinGameResponse.status === 400) alert("비밀번호가 필요합니다.");
        else if (joinGameResponse.status === 403) alert("비밀번호가 틀렸습니다.");
        else if (joinGameResponse.status === 409) alert("방에 입장할 수 없습니다.");
        else alert("게임 입장 실패");
    }


    useEffect(updateList, []);

    console.log("lobbyData", lobbyData);

    return (
        <div id="container-lobby" className="modal">
            <button onClick={requestLogin}>login: test</button>
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
                            <input type="button" id="confirmbtn" onClick={create_game} value="확인"></input>
                        </div>
                    </form>
                </div>
            </div>
            <button onClick={updateList}>방이 있을까?</button>
            <div id="lobby-body">
                <ul>
                    {lobbyData.length > 0 ? (lobbyData.map((room, index) => (
                        <li key={index} onClick={() => { joinGame(room.id) }} >
                            <ul>
                                <li>{room.id} : {room.name}</li>
                            </ul>
                        </li>
                    ))) : (<li>방이 없다고 만들라고</li>)}
                </ul>
            </div>
        </div>
    );
};

export default Lobby;
