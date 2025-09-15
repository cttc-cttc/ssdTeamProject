import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";

interface ChatRoomType {
  id: string;
  name: string;
}

interface RoomListProps {
  onSelectRoom: (roomId: string, roomName: string) => void;
}

export default function RoomList({ onSelectRoom }: RoomListProps) {
  const [rooms, setRooms] = useState<ChatRoomType[]>([]);
  const [newRoomName, setNewRoomName] = useState("");

  // 기존 방 목록 가져오기
  useEffect(() => {
    axios
      .get("/api/chat/rooms")
      .then(res => setRooms(res.data))
      .catch(err => console.error("기존 방 조회 실패 ", err));
  }, []);

  // 채팅방 생성
  const createRoom = async () => {
    if (!newRoomName) return;
    await axios
      .post(`/api/chat/rooms?name=${newRoomName}`)
      .then(res => {
        const room = res.data;
        setRooms(prev => [...prev, room]);
        setNewRoomName("");
      })
      .catch(err => console.error("채팅방 생성 실패 ", err));
  };

  return (
    <div className="flex flex-col gap-2">
      <h3>채팅방 목록</h3>
      <ul className="flex flex-col gap-2 bg-accent py-2 px-2">
        {rooms.map(room => (
          <li key={room.id} className="flex justify-between items-center">
            <span>{room.name}</span>{" "}
            <Button onClick={() => onSelectRoom(room.id, room.name)}>접속</Button>
          </li>
        ))}
      </ul>
      <div className="flex gap-1">
        <Input
          value={newRoomName}
          onChange={e => setNewRoomName(e.target.value)}
          placeholder="새 방 이름"
        />
        <Button onClick={createRoom}>방 생성</Button>
      </div>
    </div>
  );
}
