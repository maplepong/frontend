let socket = null; // 전역 변수로 WebSocket 인스턴스 선언

/* @jsx myReact.createElement */
import myReact, { useEffect, useState } from "../core/myReact.js";
import { requestGameInfo, requestExitGame } from "../core/ApiGame.js";
import router from "../core/Router.js";
import "../css/GameRoom.css"
import PingPong from "./Game.js";
import { redirect } from "react-router-dom";

const GameRoom = () => {
    const [ready, setReady] = useState(false);

    const [gameInfo, setGameInfo] = useState({
        id: "",
        name: "",
        current_players_num: "",
        owner: "",
        password: "",
        players: [],
        status: "",
        isGameReady: false,
        owner_info: {},
        player_info: {},
    });

    useEffect(() => {
        const fetchGameInfo = async () => {
            const path = window.location.pathname;
            const gameIdMatch = path.match(/^\/gameroom\/(\d+)$/);

            if (gameIdMatch) {
                const gameId = gameIdMatch[1];
                try {
                    const data = await requestGameInfo(gameId);
                    if (data.status === 200) {
                        const updatedGameInfo = data.data;
                        updatedGameInfo.owner_info = updatedGameInfo.players.find(player => player.nickname === updatedGameInfo.owner);
                        updatedGameInfo.player_info = updatedGameInfo.players.find(player => player.nickname !== updatedGameInfo.owner);
                        setGameInfo(updatedGameInfo);
                    } else {
                        console.error("Failed to fetch game info:", data);
                    }
                } catch (error) {
                    console.error("Failed to fetch game info:", error);
                }
            } else {
                console.error("Invalid gameIdMatch:", gameIdMatch);
            }
        };

        fetchGameInfo();

        return () => {
            if (socket) {
                socket.close();
                socket = null;
            }
        };
    }, []);

    useEffect(() => {
        if (gameInfo.id && !socket) {
            socket = new WebSocket("ws://localhost:8000/ws/game/" + gameInfo.id + "/");
            console.log("Creating new WebSocket connection...");
            socket.onopen = () => {
                console.log("서버 연결 완료");
                socket.send(JSON.stringify({ type: 'client_connected', nickname: localStorage.getItem("nickname") }));
            };
		}
		if (socket){
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log("data : ", data);
                if (data.type === "game_ready") {
                    console.log("game_ready");
                    console.log("data.player_info : ", data.player_info);
                    setGameInfo({...gameInfo,
                        isGameReady: true,
                        player_info: data.player_info
                    });
                }
                else if (data.type === "client_left")
                {
                    console.log("client_left");

                    if (gameInfo.owner === localStorage.getItem("nickname"))
                    {
                        console.log("나는 오너");
                        setGameInfo({...gameInfo,
                            players: gameInfo.players.filter(player => player.nickname === gameInfo.owner),
                            isGameReady: false,
                            player_info: {},
                        });
                    }
                    else
                    {
                        if (socket) socket.close();
                        alert("방장이 나갔습니다!");
                        myReact.redirect("lobby");
                    }
                }
            };

            socket.onclose = () => {
                console.log("서버 연결 종료");
                socket = null;
            };
        }
    }), [gameInfo];

    const startGame = () => {
        setReady(true);
    };

    const exitGame = async () => {
		console.log("--------exit");
        if (socket) {
            socket.send(JSON.stringify({ type: 'client_left', nickname: localStorage.getItem("nickname") }));
			socket.close();
		}
        const response = await requestExitGame(gameInfo.id);
        if (response && response.status === 200)
            console.log("exitGame success")

        myReact.redirect("lobby");
    };

    return (
        ready ? <PingPong gameinfo={gameInfo} socket={socket} />
        : 
        (gameInfo.id ? (
            <div class="bg">
                <div class="room">
                    <div class="room_header">
                        <span class="room_title">{gameInfo.name}   </span>
                        <span class="locked">****</span>
                        <span><input type="button" class="pwdbtn"/></span>
                    </div>
                    <div class="game_interface">
                        <div class="closebtn-section">
                            <input type="button" class="closebtn" onClick={exitGame}/>
                        </div>
                        <div class="top-section">
                          <div class = "owner">
                            {gameInfo.owner_info ? (
                                <div>
                                    <img src={gameInfo.owner_info.image} class="owner-img"></img>
                                    <div class="owner_name">{gameInfo.owner_info.nickname}</div>
                                    <div class="owner_stat">{gameInfo.owner_info.win_rate}</div>
                                </div>
                            ) : null}
                            </div>
                            <div class="logo-section">
                                <input type ="button" class ="logo"></input>
                            {
                              gameInfo.owner === localStorage.getItem("nickname") ? (
                                  <div>
                                    <input type="button" class="strbtn" onClick={ startGame }></input>
                                    <input type="button" class="invbtn"></input>
                                  </div>
                                ) 
                                 : (
                                  <span>아무거또 모태</span>
                                )
                            }
                            </div>
                            <div class="player">
                                  {gameInfo.player_info && gameInfo.player_info.nickname ? ( <div>
                                          <img src={gameInfo.player_info.image} class="player-img"></img>
                                          <div class="player_name">{gameInfo.player_info.nickname}</div>
                                          <div class="player_stat">{gameInfo.player_info.win_rate}</div>
                                      </div>
                                  ) : (<div>
                                    <div class="player-img"></div>
                                    <div class="player_name">기다리는 중...</div>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div>
                <h2>Room Number: No Room</h2>
            </div>
        ))
    );
};

export default GameRoom;
