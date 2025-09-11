import React, { useState } from "react";
import axios from "axios";

export default function NoticeForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 등록 버튼 클릭 시 실행
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지

    try {
      // 서버에 POST 요청 보내기
      const response = await axios.post("http://localhost:8080/api/notices", {
        title,
        content,
      });

      alert("공지사항 등록 완료!");
      console.log("서버 응답:", response.data);

      // 입력칸 초기화
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-2">
      <div>
        <label className="block mb-1">제목</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-1">내용</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        공지사항 등록
      </button>
    </form>
  );
}
