/* @jsx myReact.createElement */
import myReact, { useEffect, useState } from "../core/myReact.js";
import { requestGameInfo } from "../core/ApiGame.js";
import "../css/GameRoom.css"

const GameRoom = () => {
  const [socket, setSocket] = useState(null);
    const [gameInfo, setGameInfo] = useState({
        id: "",
        name: "",
        current_players_num: "",
        owner: "",
        password: "",
        players: [],
        status: "",
        isGameReady: false,
        owner_info : {},
        player_info : {},
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
          if (newSocket) {
              newSocket.close();
          }
      };
    }, []);

    useEffect(() => {
        if (gameInfo) {
          console.log("gameInfo : ", gameInfo)
          if (gameInfo.id && !socket)
            {
              const newSocket = new WebSocket("ws://localhost:8000/ws/game/" + gameInfo.id + "/");
    
              newSocket.onopen = function() {
                  console.log("서버 연결 완료");
                  setSocket(newSocket);
                  newSocket.send(JSON.stringify({type: 'client_connected', nickname: localStorage.getItem("nickname")}));
              };
    
              newSocket.onmessage = (event) => {
                  const data = JSON.parse(event.data);
                  console.log("data : ", data);
                  if (data.type === "game_ready")
                  {
                    console.log("game_ready")
                    console.log("data.player_info : ", data.player_info)
                    // 들어오는데 gameInfo 업데이트가 안되는 문제가 있음
                    setGameInfo(prevGameInfo => ({
                      ...prevGameInfo,
                      isGameReady: true,
                      player_info: data.player_info
                    }));
                  }
              };
    
              newSocket.onclose = function() {
                  console.log("서버 연결 종료");
                  setSocket(null);
              };
            }
        }
    }, [gameInfo.id]);

    const startGame = () => {
      if (gameInfo.isGameReady)
        alert("게임 시작");
      else
        alert("아직 안 됨!!");
    }

    return (
        gameInfo.id ? (
            <div class="bg">
                <div class="room">
                    <div class="room_header">
                        <span class="room_title">{gameInfo.name}   </span>
                        <span class="locked">****</span>
                        <span><input type="button" class="pwdbtn"/></span>
                    </div>
                    <div class="game_interface">
                        <div class="closebtn-section">
                            <input type="button" class="closebtn"/>
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
                                  {gameInfo.player_info ? ( <div>
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
        )
    );
};

export default GameRoom;
