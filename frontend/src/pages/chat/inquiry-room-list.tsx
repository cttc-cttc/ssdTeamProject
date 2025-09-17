import { Button } from "@/components/ui/button";
import type { InquiryChatRoomType } from "../home/inquiry/inquiry";

interface InquiryRoomListProps {
  roomList: InquiryChatRoomType[];
  onSelectRoom: (roomId: string, roomName: string) => void;
}

export default function InquiryRoomList({ roomList, onSelectRoom }: InquiryRoomListProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3>채팅방 목록</h3>
      <ul className="flex flex-col w-xl gap-2 border-1 border-primary rounded bg-accent py-2 px-2">
        {roomList.map(room => (
          <li
            key={room.roomId}
            className="flex justify-between items-center gap-2 hover:bg-accent-foreground/10 rounded -mx-2 px-2"
          >
            <span>{room.roomName}</span>
            <Button onClick={() => onSelectRoom(room.roomId, room.roomName)}>접속</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
