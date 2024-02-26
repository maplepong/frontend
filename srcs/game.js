export function Game() {
    console.log("게임 시작!");
    return `
        <div class="game-container">
            <h1>Pong!</h1>
            <p>아래 버튼을 클릭하여 게임 시작</p>
            <button id="startGame">게임 시작</button>
        </div>
        <canvas id="pongCanvas" width="800" height="400" style="display:none;"></canvas>
        <div class="chat-container">
            <h2>Chat</h2>
            <div id="chatMessages" class="chat-messages"></div>
            <input type="text" id="chatInput" placeholder="메시지 입력..." />
            <button id="sendChat">전송</button>
        </div>
    `;
}
