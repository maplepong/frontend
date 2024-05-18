/* @jsx myReact.createElement */
import myReact, { useEffect, useState } from "../core/myReact.js";

const GameRoom = ({ roomId }) => {
//   const [roomId, setRoomId] = useState(null);



//   useEffect(() => {
//     // 서버에서 roomId에 해당하는 방 정보를 가져온다고 가정합니다.
//     const fetchRoomDetails = async () => {
//       try {
//         const response = await api.getRoomDetails(roomId); // 서버에서 방 정보 가져오기
//         setRoom(response.data);
//       } catch (error) {
//         console.error("Error fetching room details:", error);
//       }
//     };

//     fetchRoomDetails();
//   }, [roomId]);

//   if (!room) {
//     return <div>Loading...</div>;
//   }

  return (
    <div>
      <h2>Room Number: {room.id}</h2>
    </div>
  );
};

export default GameRoom;
