import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../../lib/api";
import { useAdminInfoStore } from "../account/admin-info-store";
import { useApiStore } from "@/components/common/api-store";

type Notice = {
  id: number;
  title: string;
  content: string;
  author: string;
  viewCount: number;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function NoticeDetail() {
  const { API_BASE } = useApiStore();
  const { id } = useParams<{ id: string }>();
  const [notice, setNotice] = useState<Notice | null>(null);
  const navigate = useNavigate();
  const { adminPkID } = useAdminInfoStore();

  useEffect(() => {
    if (!id) return;
    axios
      .get<Notice>(`${API_BASE}/api/notices/${id}?inc=true`)
      .then(res => setNotice(res.data))
      .catch(console.error);
  }, [id, API_BASE]);

  // 공지사항 삭제
  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`${API_BASE}/api/notices/${id}`);
      alert("공지사항이 삭제되었습니다.");
      navigate("/notices"); // 삭제 후 목록으로 이동
    } catch (error) {
      console.error(error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  if (!notice) return <div className="p-6"> 로딩중...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <Link to="/notices" className="text-blue-500 hover:underline text-sm">
        ← 목록으로
      </Link>

      {notice.pinned && (
        <div className="mt-2 text-amber-600 text-xs border px-2 py-0.5 rounded-full inline-block">
          상단고정
        </div>
      )}

      <h1 className="text-2xl font-bold mt-2">{notice.title}</h1>

      <div className="text-sm text-gray-500 mt-1">
        작성자 {notice.author} · 조회 {notice.viewCount} ·{" "}
        {new Date(notice.createdAt).toLocaleString()}
      </div>

      <hr className="my-4" />

      <div className="whitespace-pre-wrap break-words">{notice.content}</div>

      {/* 공지사항 수정 & 삭제 */}
      {adminPkID && (
        <div className="mt-6 flex gap-2">
          <button
            onClick={() => navigate(`/notices/edit/${id}`)}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            수정하기
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
