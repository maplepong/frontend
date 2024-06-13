/* @jsx myReact.createElement */
import api from "../core/Api_.js";
import myReact, { Link } from "../core/myReact.js";
import "../css/NicknameModal.css";
import RequestFriend from "./RequestFriend";

const NicknameModal = ({ nickname }) => {
  var show = 0; //0 hidden 1 show;
  function showmenu(e) {
    const menu = e.target
      .closest(".nicknameContainer")
      .getElementsByClassName("hovermenu");
    console.log(menu);
    if (show) menu[0].classList.remove("hidden");
    else menu[0].classList.add("hidden");
    show = show ? 0 : 1;
  }
  function routeToFriend() {
    myReact.redirect("userinfo/" + nickname);
  }
  async function requestFriend() {
    const response = await api.sendFriendRequest(nickname);
    console.log(response);
  }
  function inviteToGame() {
    console.log("게임초대아직미구현임");
  }
  function wisper() {
    console.log("1on1");
  }

  return (
    <div class="nicknameContainer" id={nickname} onclick={showmenu}>
      <p class="nickname">{nickname}</p>
      <div class="hidden hovermenu">
        <ul>
          <li>
            <span
              onclick={() => {
                routeToFriend();
              }}
            >
              🔍 {nickname} 정보보기
            </span>
          </li>
          <li
            onclick={() => {
              requestFriend();
            }}
          >
            👐 친구신청하기
          </li>
          <li
            onclick={() => {
              inviteToGame();
            }}
          >
            🏓 게임초대하기
          </li>
          <li
            onclick={() => {
              wisper();
            }}
          >
            💌 대화하기
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NicknameModal;
