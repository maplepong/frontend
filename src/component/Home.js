/* @jsx myReact.createElement */
import myReact , { Link } from "../core/myReact.js";
import { useState } from "../core/myReact.js";
import Navbar from "./Navbar.js";
import FriendList from "./FriendList.js";
import Modal from "./Modal.js";
import "../css/home.css"
import UserInfo from "./UserInfo.js";

const Home = () => {

	// const [modalVisible, setModalVisible] = useState(false);
    // const [modalContent, setModalContent] = useState(null);

	var friendNickname = "";
	const	[status, setStatus] = useState({nickname : "", class: "hidden"});
    const showModal = (nickname) => {
		setStatus({nickname, class: ""});
    };

    // const hideModal = () => {
    //     setModalVisible(false);
    //     setModalContent(null); // 모달 정보 초기화
    // };

	return <div id="home">
			{/* 아래 라인 주석 치면 에러안남 */}
			{/*<Modal content={modalContent} onClose={hideModal} /> && modalVisible */}
			<FriendList callback={showModal}/>
			{/* <UserInfo class={status.class} nickname={status.nickname}></UserInfo> */}
			<div id="info">
			</div>
			{/* <Navbar /> */}
		</div>
}

export default Home;