import { useEffect, useState } from "react";
import { Client, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  roomId: string;
  sender: string;
  content: string;
}

interface ChatRoomProps {
  roomId: string;
  roomName: string;
  username: string;
}

export default function ChatRoom({ roomId, roomName, username }: ChatRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [client, setClient] = useState<Client | null>(null);

  // 1️⃣ 기존 메시지 로드
  useEffect(() => {
    axios.get(`/api/chat/room/${roomId}/messages`).then(res => setMessages(res.data));
  }, [roomId]);

  // 2️⃣ WebSocket 연결
  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws-chat"),
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe(`/sub/chat/room/${roomId}`, (msg: IMessage) => {
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

  return (
    <div className="flex flex-col gap-2">
      <h3>{roomName}</h3>
      <div className="bg-accent flex flex-col gap-1 p-2" style={{ height: 200, overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.sender}:</b> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
