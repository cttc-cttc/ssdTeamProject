import { Button } from "@/components/ui/button";
import ChatApp from "@/pages/chat/chat-app";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GroupChat() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkChatRoom = () => {
      axios
        .get("/api/chat/checkRoom", { params: { postId: id } })
        .then(res => {
          if (res.data.exists) {
            console.log("채팅방 있음:", res.data.roomId);
          } else {
            console.log("채팅방 없음");
          }
        })
        .catch(err => console.error(err));
    };

    const checkStudyStatus = async () => {
      const response = await axios.get(`/api/create-post/${id}`);
      if (response.data.ended) {
        setMessage("종료된 스터디는 채팅방에 입장할 수 없습니다.");
      } else {
        checkChatRoom();
      }
    };

    checkStudyStatus();
  }, [id]);

  // 뒤로가기
  const backStep = () => {
    navigate(-1);
  };

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-2xl mx-auto">
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
        ) : (
          <ChatApp />
        )}
      </div>
    </div>
  );
}
