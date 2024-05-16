/* @jsx myReact.createElement */
import myReact, { Link } from "../core/myReact.js";
import api from "../core/Api_.js";
import "../css/home.css"

const ChooseGame = () => {
    return (
        <div id="choose-container">
                <div id="mini">
                    <span class="word">미니게임</span>
                </div>
                <div id="tour">
                    <span class="word">토너먼트 참여</span>
                </div>
                <div id="pong">
                    <span class="word">게임하기</span>
                </div>
        </div>
    )
}

export default ChooseGame