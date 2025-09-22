import { useState, useEffect } from "react";
import axios from "../../lib/api";
import { Link, useNavigate } from "react-router-dom";
import { useAdminInfoStore } from "../account/admin-info-store";
import { useApiStore } from "@/components/common/api-store";

export default function NoticeCreate() {
  const { API_BASE } = useApiStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { adminPkID, adminName } = useAdminInfoStore();

  // 관리자 확인
  useEffect(() => {
    if (!adminPkID) {
      alert("관리자만 공지사항을 작성할 수 있습니다.");
      navigate("/notices");
    }
  }, [adminPkID, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/api/notices/create`, { title, content });
      alert("공지사항 등록 완료!");
      navigate("/notices"); // 등록 후 목록으로 이동
    } catch (err) {
      console.error(err);
      alert("등록 실패");
    }
  };

  return (
    <div
      className="max-w-2xl mx-auto mt-10 p-6 
                    bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-gray-100 
                    rounded shadow"
    >
      <Link to="/notices" className="text-blue-500 hover:underline text-sm">
        ← 목록으로
      </Link>
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-xl font-bold">공지사항 등록</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 pt-2">관리자: {adminName}님</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1">제목</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 
                       bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div>
          <label className="block mb-1">내용</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full border rounded px-3 py-2 
                       bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-gray-100"
            rows={6}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 
                     text-white px-4 py-2 rounded"
        >
          등록하기
        </button>
      </form>
    </div>
  );
}
