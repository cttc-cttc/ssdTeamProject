import { useState } from "react";
import RoomList from "./room-list";
import ChatRoom from "./chat-room";
import { useInfoStore } from "../account/info-store";

export default function ChatApp() {
  const { userNickname } = useInfoStore();
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [currentRoomName, setCurrentRoomName] = useState<string | null>(null);

  // RoomList에서 선택된 방을 받아 상태 변경
  const onSelectRoom = (roomId: string, roomName: string) => {
    setCurrentRoomId(roomId);
    setCurrentRoomName(roomName);
  };

  if (!userNickname) return <div>로그인이 필요합니다</div>;

  return (
    <div className="container m-auto flex flex-col items-center">
      <div className="w-full max-w-7xl flex flex-col items-center h-[60vh] mb-12">
        <h2 className="text-primary text-2xl text-bold my-8">채팅 앱</h2>

        <div className="flex gap-6 justify-between">
          {/* 1️⃣ 채팅방 목록 */}
          <RoomList onSelectRoom={onSelectRoom} />

          {/* 2️⃣ 현재 선택된 방이 있으면 ChatRoom 렌더 */}
          {currentRoomId && currentRoomName && (
            <ChatRoom roomId={currentRoomId} roomName={currentRoomName} username={userNickname} />
          )}
        </div>
      </div>
    </div>
  );
}
