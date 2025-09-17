import { useEffect, useRef, useState } from "react";
import { Client, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfoStore } from "../account/info-store";
import { Textarea } from "@/components/ui/textarea";

interface ChatMessage {
  roomId: string;
  sender: string;
  content: string;
}

interface InquiryRoomProps {
  roomId: string;
  roomName: string;
  username: string;
}

export default function InquiryRoom({ roomId, roomName, username }: InquiryRoomProps) {
  const { userNickname } = useInfoStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [client, setClient] = useState<Client | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 1️⃣ 기존 메시지 로드
  useEffect(() => {
    axios.get(`/api/chat/inquiry-room/${roomId}/messages`).then(res => setMessages(res.data));
  }, [roomId]);

  // 2️⃣ WebSocket 연결
  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS("/ws-chat"),
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe(`/sub/chat/inquiry-room/${roomId}`, (msg: IMessage) => {
          const received: ChatMessage = JSON.parse(msg.body);
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

  // 메시지가 바뀔 때마다 스크롤 이동
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-2">
      <h3>{roomName}</h3>
      <ScrollArea className="w-xl rounded-md h-96 border p-4">
        <div className="flex flex-col gap-4">
          {messages.map((msg, i) =>
            msg.sender === userNickname ? (
              // 내 매시지
              <div
                key={i}
                className="self-end max-w-10/12 bg-primary text-white px-3 py-2 rounded-2xl shadow-sm whitespace-pre-wrap"
              >
                {msg.content}
              </div>
            ) : (
              // 상대방 메시지
              <div key={i} className="flex flex-col self-start max-w-10/12 gap-2">
                <span className="font-medium text-muted-foreground">{msg.sender}</span>
                <div className="bg-muted px-3 py-2 rounded-2xl shadow-sm whitespace-pre-wrap">
                  {msg.content}
                </div>
              </div>
            )
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
      <div className="flex flex-col gap-1">
        <Textarea
          className="max-h-48"
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
        <Button onClick={sendMessage}>전송</Button>
      </div>
    </div>
  );
}
