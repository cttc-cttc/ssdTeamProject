import { Button } from "@/components/ui/button";
import CreateGroupChat from "@/pages/chat/create-group-chat";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GroupChatRoom from "@/pages/chat/group-chat-room";
import { useInfoStore } from "@/pages/account/info-store";
import { useApiStore } from "@/components/common/api-store";

interface RoomData {
  exists: boolean;
  roomId: string;
  roomName: string;
}

export default function GroupChat() {
  const { API_BASE } = useApiStore();
  const { id } = useParams();
  const { userNickname, userPkID } = useInfoStore();
  const [studyOpener, setStudyOpener] = useState(null);
  const [message, setMessage] = useState("");
  const [isExistRoom, setIsExistRoom] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 페이지에 새로 입장하거나 채팅방을 만들었을 때 실행
  useEffect(() => {
    const checkChatRoom = () => {
      axios
        .get(`${API_BASE}/api/chat/checkRoom`, { params: { postId: id } })
        .then(res => {
          const room: RoomData = res.data;
          if (room.exists) {
            setIsExistRoom(room.exists);
            setCurrentRoomId(room.roomId);
          } else {
            setIsExistRoom(room.exists);
          }
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    };

    const checkStudyStatus = async () => {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/api/posts/${id}`);
      setStudyOpener(response.data.userNickname);

      if (response.data.ended) {
        setMessage("종료된 스터디는 채팅방에 입장할 수 없습니다.");
        setLoading(false);
      } else {
        checkChatRoom();
      }
    };

    checkStudyStatus();
  }, [id, currentRoomId, API_BASE]);

  // CreateGroupChat에서 생성된 방을 받아 상태 변경
  const onSelectRoom = (roomId: string) => {
    setCurrentRoomId(roomId);
  };

  const studyOpenerRender = () => {
    if (studyOpener === userNickname) {
      return <CreateGroupChat onSelectRoom={onSelectRoom} postId={id} />;
    } else {
      return (
        <p className="text-center text-xl text-[#FE9CA2] font-semibold">
          아직 채팅방이 생성되지 않았습니다.
        </p>
      );
    }
  };

  // 뒤로가기
  const backStep = () => {
    navigate(-1);
  };

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-2xl mx-auto">
        {!loading && (
          <>
            <Button
              onClick={backStep}
              variant="outline"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              뒤로가기
            </Button>
            {message !== "" ? (
              <p className="text-center text-xl text-destructive font-semibold">{message}</p>
            ) : !isExistRoom ? (
              // 방이 없으면 스터디 개설자인 경우만 새로 생성
              // 스터디 개설자가 아니면 "아직 채팅방이 생성되지 않았습니다." 안내문 출력
              studyOpenerRender()
            ) : (
              // 방 정보와 로그인 유저 정보가 있으면 바로 채팅방 로드
              currentRoomId &&
              userPkID &&
              userNickname && (
                <GroupChatRoom
                  roomId={currentRoomId}
                  userId={parseInt(userPkID ?? "0", 10)}
                  username={userNickname}
                />
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}
