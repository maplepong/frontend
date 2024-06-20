/* @jsx myReact.createElement */
import api from "../core/Api_.js";
import myReact, { Link } from "../core/myReact.js";
import "../css/NicknameModal.css";

const NicknameModal = ({ nickname }) => {
  var show = 0; //0 hidden 1 show;
  function showmenu(e) {
    const menu = e.target
      .closest(".nicknameContainer")
      .getElementsByClassName("hovermenu");
    console.log(menu);
    const xPos = menu[0].parentNode.children[0].offsetWidth + 30; //원래 아이디 노드의 너비
    if (show) menu[0].classList.remove("hidden");
    else menu[0].classList.add("hidden");
    show = show ? 0 : 1;
    console.log(menu[0].parentNode.children[0].offsetWidth);
    menu[0].style.left = xPos + "px";
    console.log(menu[0].parentNode.offsetWidth);
  }
  function routeToFriend() {
    myReact.redirect("userinfo/" + nickname);
  }
  async function requestFriend() {
    const response = await api.sendFriendRequest(nickname);
    console.log(response);
  }
  async function inviteToGame() {
    const res = await api.inviteToGame(450, nickname); //임의로 gameid 넣음
    console.log(res);
  }
  function wisper() {
    alert("귓속말은 아직 불가능");
  }

  return (
    <div class="nicknameContainer" id={nickname} onclick={showmenu}>
      <p class="nickname">{nickname} </p>
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
