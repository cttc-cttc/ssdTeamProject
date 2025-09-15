import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";

interface ChatRoomType {
  id: string;
  name: string;
}

export default function RoomList({ onSelectRoom }: { onSelectRoom: (roomId: string) => void }) {
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
    <div>
      <h3>채팅방 목록</h3>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            {room.name} <Button onClick={() => onSelectRoom(room.id)}>접속</Button>
          </li>
        ))}
      </ul>
      <Input
        value={newRoomName}
        onChange={e => setNewRoomName(e.target.value)}
        placeholder="새 방 이름"
      />
      <Button onClick={createRoom}>방 생성</Button>
    </div>
  );
}
