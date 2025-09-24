import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useInfoStore } from "../account/info-store";
import { useApiStore } from "@/components/common/api-store";

interface CreateGroupChatProps {
  onSelectRoom: (roomId: string) => void;
  postId: undefined | string;
}

export default function CreateGroupChat({ onSelectRoom, postId }: CreateGroupChatProps) {
  const { API_BASE } = useApiStore();
  const { userPkID, userNickname } = useInfoStore();
  const [newRoomName, setNewRoomName] = useState("");

  // 키보드 enter 입력
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 submit 같은 기본 동작 막고 싶을 경우
      createRoom();
    }
  };

  // 채팅방 생성
  const createRoom = async () => {
    if (!newRoomName) return;
    await axios
      .post(`${API_BASE}/api/chat/rooms`, {
        roomName: newRoomName,
        postId: parseInt(postId ?? "0", 10),
        creatorId: userPkID,
        creatorName: userNickname,
      })
      .then(res => {
        const room = res.data;
        onSelectRoom(room.id);
        setNewRoomName("");
      })
      .catch(err => console.error("채팅방 생성 실패 ", err));
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-6">채팅방 생성</h1>
      <div className="bg-green-50 dark:bg-green-950 border border-green-600 dark:border-green-900 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <div className="ml-3">
            <h3 className="text-lg font-medium text-green-600">주의사항</h3>
            <div className="mt-2 text-sm text-muted-foreground">
              <ul className="list-disc list-inside space-y-1">
                <li>채팅방은 게시글당 하나만 개설할 수 있습니다.</li>
                <li>채팅방은 생성 후 삭제하거나 다른 게시글로 옮길 수 없습니다.</li>
                <li>채팅방 이름은 생성 시 지정되며, 변경은 제한됩니다.</li>
                <li>채팅방은 해당 스터디 참여자들만 이용할 수 있습니다.</li>
                <li>채팅방은 스터디 모집 기간이 종료된 이후에도 계속 이용 가능합니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-1">
        <Input
          value={newRoomName}
          onChange={e => setNewRoomName(e.target.value)}
          placeholder="새 그룹 채팅방 이름"
          onKeyDown={handleKeyDown}
        />
        <Button onClick={createRoom}>만들기</Button>
      </div>
    </div>
  );
}
