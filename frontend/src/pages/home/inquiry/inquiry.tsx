import { useInfoStore } from "@/pages/account/info-store";
import InquiryRoom from "@/pages/chat/inquiry-room";
import InquiryRoomList from "@/pages/chat/inquiry-room-list";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export interface InquiryChatRoomType {
  roomId: string;
  roomName: string;
  userPk: number;
  createdAt: Date;
}

// 관리자와 채팅하기
export default function Inquiry() {
  const { userPkID, userNickname } = useInfoStore();
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomList, setRoomList] = useState<InquiryChatRoomType[]>([]);

  useEffect(() => {
    if (userNickname === "Admin(임시)") {
      // 관리자 → 모든 유저 채팅방 목록 불러오기
      axios
        .get("/api/inquiry/rooms")
        .then(res => setRoomList(res.data))
        .catch(err => console.error("채팅방 목록 불러오기 에러 ", err));
    } else {
      // 유저 → 본인 채팅방 불러오기
      if (!userPkID) return;
      axios
        .get("/api/inquiry/room/me", { params: { userPkID } })
        .then(res => {
          setRoomId(res.data.roomId);
          setRoomName(res.data.roomName);
        })
        .catch(err => console.error("채팅방 불러오기 에러 ", err));
    }
  }, [userNickname, userPkID]);

  // 방 선택 핸들러 (관리자 전용)
  const onSelectRoom = (roomId: string, roomName: string) => {
    setRoomId(roomId);
    setRoomName(roomName);
  };

  // 방 리스트로 나오기 (관리자 전용)
  const onBack = () => {
    setRoomId("");
    setRoomName("");
  };

  // 로그인 안 된 경우 → 로그인 페이지로 리다이렉트
  if (!userNickname) return <Navigate to="/log-in" replace />;

  return (
    <div className="container m-auto my-16 flex flex-col items-center min-h-[52vh]">
      <h1 className="font-bold text-2xl text-primary mb-8">관리자와 실시간 채팅</h1>

      {userNickname === "Admin(임시)" ? (
        // 관리자 → 모든 유저 채팅방 목록 불러오기
        <>
          {roomId === "" ? (
            <InquiryRoomList roomList={roomList} onSelectRoom={onSelectRoom} />
          ) : (
            <InquiryRoom
              roomId={roomId}
              roomName={roomName}
              username={userNickname}
              onBack={onBack}
            />
          )}
        </>
      ) : (
        // 유저 → 본인 채팅방 바로 연결
        <InquiryRoom roomId={roomId} roomName={roomName} username={userNickname} />
      )}
    </div>
  );
}
