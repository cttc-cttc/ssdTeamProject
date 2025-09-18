import ChatApp from "@/pages/chat/chat-app";

export default function GroupChat() {
  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <h1>그룹 채팅방</h1>
        <ChatApp />
      </div>
    </div>
  );
}
