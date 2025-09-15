import { useState } from "react";
import RoomList from "./room-list";
import ChatRoom from "./chat-room";
import { useInfoStore } from "../account/info-store";

export default function ChatApp() {
  const { userNickname } = useInfoStore();
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);

  // RoomList에서 선택된 방을 받아 상태 변경
  const onSelectRoom = (roomId: string) => {
    setCurrentRoomId(roomId);
  };

  if (!userNickname) return <div>로그인이 필요합니다</div>;

  return (
    <div className="p-4">
      <h2>채팅 앱</h2>

      <div className="flex gap-6">
        {/* 1️⃣ 채팅방 목록 */}
        <RoomList onSelectRoom={onSelectRoom} />

        {/* 2️⃣ 현재 선택된 방이 있으면 ChatRoom 렌더 */}
        {currentRoomId && <ChatRoom roomId={currentRoomId} username={userNickname} />}
      </div>
    </div>
  );
}
