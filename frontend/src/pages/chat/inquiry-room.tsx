import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Client, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftToLine, SendHorizontal } from "lucide-react";
import { scrollDown, type InquiryChatMessage } from "./components/chat-utils";
import RenderMessages from "./components/render-messages";

interface InquiryRoomProps {
  roomId: string;
  roomName: string;
  username: string;
  onBack?: () => void;
}

export default function InquiryRoom({ roomId, roomName, username, onBack }: InquiryRoomProps) {
  const [messages, setMessages] = useState<InquiryChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [client, setClient] = useState<Client | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // 기존 메시지 로드
  useEffect(() => {
    if (!roomId) return; // roomId가 없으면 요청 안 보냄

    axios
      .get(`/api/inquiry/inquiry-room/${roomId}/messages`)
      .then(res => setMessages(res.data))
      .catch(err => console.error("기존 메시지를 불러오기 에러: ", err));
  }, [roomId]);

  // WebSocket 연결
  useEffect(() => {
    if (!roomId) return;

    const stompClient = new Client({
      webSocketFactory: () => new SockJS("/ws-chat"),
      reconnectDelay: 5000,
      onConnect: () => {
        // 구독
        stompClient.subscribe(`/sub/inquiry/${roomId}`, (msg: IMessage) => {
          const received: InquiryChatMessage = JSON.parse(msg.body);
          setMessages(prev => [...prev, received]);
        });
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [roomId]);

  // 메시지 보내기
  const sendMessage = () => {
    if (!client || !input.trim()) return;
    client.publish({
      destination: `/pub/inquiry/${roomId}/message`,
      body: JSON.stringify({
        sender: username,
        content: input,
      }),
    });
    setInput("");
  };

  // 메시지 입력 시 채팅창 스크롤 하단으로 내리기
  useLayoutEffect(() => {
    scrollDown(rootRef);
  }, [messages]);

  // 뒤로 가기 버튼 (관리자 전용, 채팅방에서 리스트로)
  const handleBack = () => {
    if (onBack) onBack();
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="flex gap-4 items-center mb-2">
        {username === "Admin" && (
          <Button
            variant="outline"
            size="sm"
            className="rounded hover:bg-accent"
            onClick={handleBack}
          >
            <ArrowLeftToLine className="w-6 h-6" />
            목록으로
          </Button>
        )}

        {roomName}
      </h3>

      {/* 채팅 메시지 랜더링 */}
      <RenderMessages rootRef={rootRef} messages={messages} username={username} />

      <div className="flex flex-col gap-1">
        <Textarea
          className="max-h-48 w-xl max-w-xl"
          value={input}
          placeholder="문의 내용을 입력하세요..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // 줄바꿈 막기
              sendMessage();
            }
          }}
        />
        <Button onClick={sendMessage}>
          전송
          <SendHorizontal />
        </Button>
      </div>
    </div>
  );
}
