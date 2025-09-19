import { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import { Client, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import RenderMessages from "./components/render-messages";
import { scrollDown, type GroupChatMessage } from "./components/chat-utils";

interface GroupChatRoomProps {
  roomId: string;
  userId: number;
  username: string;
}

export default function GroupChatRoom({ roomId, userId, username }: GroupChatRoomProps) {
  const [messages, setMessages] = useState<GroupChatMessage[]>([]);
  const [roomInfo, setRoomInfo] = useState({ roomName: "", currentCount: 0, maxCount: 0 });
  const [input, setInput] = useState("");
  const [client, setClient] = useState<Client | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  // --- 채팅방 데이터 처리 useEffect
  useEffect(() => {
    let stompClient: Client | null = null;
    setLoading(true);

    const initChat = async () => {
      try {
        // 1. 방 정보 가져오기
        const roomRes = await axios.get(`/api/chat/rooms/${roomId}/info`);
        setRoomInfo(roomRes.data);

        // 2. WebSocket + STOMP 클라이언트 생성
        const socket = new SockJS("/ws-chat");
        stompClient = new Client({
          webSocketFactory: () => socket,
          reconnectDelay: 5000,
        });

        // 3. 연결 이벤트 처리
        stompClient.onConnect = async () => {
          // 3-1. 구독
          stompClient!.subscribe(`/sub/groupChat/${roomId}`, (message: IMessage) => {
            const msg: GroupChatMessage = JSON.parse(message.body);
            setMessages(prev => [...prev, msg]);

            if (msg.messageType === "JOIN") {
              setRoomInfo(prev => ({
                ...prev,
                currentCount: prev.currentCount + 1,
              }));
            }
          });
          // 3-2. 과거 메시지 로드
          const msgRes = await axios.get(`/api/chat/rooms/${roomId}/messages`);
          setMessages(msgRes.data);

          // 3-3. 입장 API 호출
          await axios.post(`/api/chat/rooms/${roomId}/join`, { userId, username });
        };

        // 4. STOMP 연결 시작
        stompClient.activate();
        setClient(stompClient);
      } catch (err) {
        console.error("채팅 초기화 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    initChat();

    // cleanup
    return () => {
      if (stompClient) {
        stompClient.deactivate().catch(() => {});
      }
    };
  }, [roomId, userId, username]);
  // -------------------------------------

  // 메세지 보내기
  const sendMessage = () => {
    if (!client || !input.trim()) return;
    client.publish({
      destination: `/pub/groupChat/${roomId}/message`,
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

  return (
    <div className="flex flex-col w-xl gap-2">
      {!loading && (
        <h2 className="flex gap-4 items-center mb-2">
          {roomInfo.roomName} ({roomInfo.currentCount}/{roomInfo.maxCount})
        </h2>
      )}

      {/* 채팅 메시지 랜더링 */}
      <RenderMessages rootRef={rootRef} messages={messages} username={username} />

      <div className="flex flex-col gap-1">
        <Textarea
          className="max-h-48 w-xl max-w-xl"
          value={input}
          placeholder="메시지를 입력하세요"
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
