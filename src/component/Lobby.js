/* @jsx myReact.createElement */
import myReact, { useEffect, useState } from "../core/myReact.js";
import { requestLobbyList, requestCreateGame, requestGameInfo, requestJoinGame } from "../core/ApiGame.js";
import api from "../core/Api_.js";
import router from "../core/Router.js";
import GameList from "./GameList.js";

const Lobby = (props) => {
    // const [lobbyData, setLobbyData] = useState([]);
    const [lobbyData, setLobbyData] = useState([{ //test
		id: 1234,
        number: 1,
		title: "title1",
		players: ["pl1", "pl2"],
		status: 0,
		password: "1234",
	},{
		id: 1234,
        number: 2,
		title: "title2",
		players: ["pl1", "pl2"],
		status: 1,
		password: "",
	}
]); 
	console.log(lobbyData);

    async function requestLogin() {
        const res = await api.login(() => ["test1", "1234"]);
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

	function renderRooms() {}
    //     const roomList = document.getElementById("roomList");
    //     if (lobbyData.length == 0) {
    //         const noRoomList = document.createElement("p");
    //         noRoomList.textContent = "생성된 방이 없습니다.";
    //         noRoomList.align = "center";
    //         noRoomList.style.marginTop = "50px";
    //         roomList.appendChild(noRoomList);
    //         return;
    //     }

    //     lobbyData.forEach((room, index) => {
    //         const li = document.createElement("li");
    //         li.classList.add("room");

    //         if (lobbyData.status === "대기중") {
    //             li.classList.add("waiting");
    //         } else if (lobbyData.status === "게임중") {
    //             li.classList.add("playing");
    //         }

    //         li.innerHTML = `
    //             <span class="room_number">${room.number}</span>
    //             <span class="room_title" onclick="showPasswordPrompt('${room.name}', '${room.password}', '${room.status}', '${room.players}')">${room.name}</span>
    //             <span class="players">${room.players}</span>
    //             <span class="room_status">${room.status}</span>
    //             <span class="locked">
    //                 ${room.password ? '<img src="lock.png" alt="🔒">' : '<img src="unlock.png" alt="🔓">' }
    //             </span>
    //         `;
    //         roomList.appendChild(li);
    //     });
    // }

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
	// useEffect(renderRooms, lobbyData);

    console.log("lobbyData", lobbyData);

    return (
        <div id="container-lobby" className="modal">
            <button onClick={requestLogin}>login: test</button>
            {/* <div id="lobby-headline">
                <p>Pingpong🏓</p>
                <button>X</button>
                <button id="open-modal" onClick={create_game}>게임 만들기</button>
                <div id="modal-backdrop" className="hidden"></div>
            </div> */}
            <div id="modal" className="hidden">
                <div id="modal-content">
                    <form id="room-form" onSubmit={create_game}>
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
			{/* <GameList /> */}
            <button onClick={updateList}>방이 있을까?</button>
            {/* <div id="lobby-body">
                <ul>
                    {lobbyData.length > 0 ? (lobbyData.map((room, index) => (
                        <li key={index} onClick={() => { joinGame(room.id) }} >
                            <ul>
                                <li>{room.id} : {room.name}</li>
                            </ul>
                        </li>
                    ))) : (<li>방이 없다고 만들라고</li>)}
                </ul>
            </div> */}
            <div class="game_interface">
                <div class="lobby_body">
                    <ul class="room_info" id="roomList">
                        <li class="room_header" key="0">
                            <span class="room_number">방 번호</span>
                            <span class="room_title">방 제목</span>
                            <span class="players">인원</span>
                            <span class="room_status">상태</span>
                        </li>
                        {lobbyData.length > 0 ? lobbyData.map((room, index) => (
                        <li class="room " onClick={() => { joinGame(room.id) }}>
                            <span class="room_number">{room.id}</span>
                            <span class="room_title" >{room.name}</span>
                            <span class="players">{room.current_players_num}</span>
                            <span class="room_status">{room.status}</span>
                        </li>
                        )) : "dfs"}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Lobby;
