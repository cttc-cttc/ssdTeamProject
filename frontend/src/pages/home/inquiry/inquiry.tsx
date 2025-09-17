import { useInfoStore } from "@/pages/account/info-store";
import InquiryRoom from "@/pages/chat/inquiry-room";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// 관리자와 채팅하기
export default function Inquiry() {
  const { userPkID, userNickname } = useInfoStore();
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (!userPkID) return; // userPkID가 없으면 요청하지 않음
    axios
      .get("/api/inquiry/room/me", { params: { userPkID } })
      .then(res => {
        console.log(res.data);
        setRoomId(res.data.roomId);
        setRoomName(res.data.roomName);
      })
      .catch(err => console.error("채팅방 불러오기 에러 ", err));
  }, [userPkID]);

  // 로그인 안 된 경우 → 로그인 페이지로 리다이렉트
  if (!userNickname) return <Navigate to="/log-in" replace />;

  return (
    <div className="container m-auto my-16 flex flex-col items-center">
      <h1 className="font-bold text-2xl text-primary mb-8">관리자와 실시간 채팅</h1>
      <div className="flex justify-center">
        <InquiryRoom roomId={roomId} roomName={roomName} username={userNickname} />
      </div>
    </div>
  );
}
