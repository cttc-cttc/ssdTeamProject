import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Client, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { scrollDown, type ChatMessageProps } from "./components/chat-utils";
import RenderMessages from "./components/render-messages";

interface ChatRoomProps {
  roomId: string;
  roomName: string;
  username: string;
}

export default function ChatRoom({ roomId, roomName, username }: ChatRoomProps) {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [input, setInput] = useState("");
  const [client, setClient] = useState<Client | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // 1️⃣ 기존 메시지 로드
  useEffect(() => {
    axios.get(`/api/chat/room/${roomId}/messages`).then(res => setMessages(res.data));
  }, [roomId]);

  // 2️⃣ WebSocket 연결
  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS("/ws-chat"),
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe(`/sub/chat/room/${roomId}`, (msg: IMessage) => {
          const received: ChatMessageProps = JSON.parse(msg.body);
          setMessages(prev => [...prev, received]);
        });
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate().catch(() => {}); // cleanup에서 Promise 무시
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!client || !input.trim()) return;
    client.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({ roomId, sender: username, content: input }),
    });
    setInput("");
  };

  // 메시지 입력 시 채팅창 스크롤 하단으로 내리기
  useLayoutEffect(() => {
    scrollDown(rootRef);
  }, [messages]);

  return (
    <div className="flex flex-col gap-2">
      <h3>{roomName}</h3>

      {/* 채팅 메시지 랜더링 */}
      <RenderMessages rootRef={rootRef} messages={messages} username={username} />

      <div className="flex flex-col gap-1">
        <Textarea
          className="max-h-48 w-xl max-w-xl"
          value={input}
          placeholder="메시지를 입력하세요..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // 줄바꿈 막기
              sendMessage();
            }
          }}
        />
        <Button onClick={sendMessage}>전송</Button>
      </div>
    </div>
  );
}
