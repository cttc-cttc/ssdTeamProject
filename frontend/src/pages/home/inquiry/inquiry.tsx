import { useApiStore } from "@/components/common/api-store";
import { useAdminInfoStore } from "@/pages/account/admin-info-store";
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
  const { API_BASE } = useApiStore();
  const { adminPkID, adminName } = useAdminInfoStore();
  const { userPkID, userNickname } = useInfoStore();
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomList, setRoomList] = useState<InquiryChatRoomType[]>([]);

  // 로그인 상태 확인
  const isAdminLoggedIn = !!adminPkID;
  const isUserLoggedIn = !!userPkID;

  useEffect(() => {
    if (isAdminLoggedIn) {
      // 관리자 → 모든 유저 채팅방 목록 불러오기
      axios
        .get(`${API_BASE}/api/inquiry/rooms`)
        .then(res => setRoomList(res.data))
        .catch(err => console.error("채팅방 목록 불러오기 에러 ", err));
      return;
    }

    if (isUserLoggedIn) {
      // 유저 → 본인 채팅방 불러오기
      axios
        .get(`${API_BASE}/api/inquiry/room/me`, { params: { userPkID } })
        .then(res => {
          setRoomId(res.data.roomId);
          setRoomName(res.data.roomName);
        })
        .catch(err => console.error("채팅방 불러오기 에러 ", err));
    }
  }, [isAdminLoggedIn, isUserLoggedIn, userPkID, API_BASE]);

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
  if (!isAdminLoggedIn && !isUserLoggedIn) return <Navigate to="/log-in" replace />;

  return (
    <div className="container m-auto my-16 flex flex-col items-center">
      <h1 className="font-bold text-2xl text-primary mb-8">관리자와 실시간 채팅</h1>

      {isAdminLoggedIn && adminName && (
        // 관리자 → 모든 유저 채팅방 목록 불러오기
        <>
          {roomId === "" ? (
            <InquiryRoomList roomList={roomList} onSelectRoom={onSelectRoom} />
          ) : (
            <InquiryRoom roomId={roomId} roomName={roomName} username={adminName} onBack={onBack} />
          )}
        </>
      )}

      {isUserLoggedIn && userNickname && (
        // 유저 → 본인 채팅방 바로 연결
        <InquiryRoom roomId={roomId} roomName={roomName} username={userNickname} />
      )}
    </div>
  );
}
