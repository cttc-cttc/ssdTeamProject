import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../lib/api";
import { useAdminInfoStore } from "../account/admin-info-store";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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

export default function NoticeEdit() {
  const { API_BASE } = useApiStore();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { adminPkID, adminName } = useAdminInfoStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // 관리자 인증 확인
  useEffect(() => {
    if (!adminPkID) {
      alert("관리자만 공지사항을 수정할 수 있습니다.");
      navigate("/admin-log-in");
    }
  }, [adminPkID, navigate]);

  // 기존 공지사항 데이터 로드
  useEffect(() => {
    if (!id || !adminPkID) return;

    const loadNotice = async () => {
      try {
        const res = await axios.get<Notice>(`${API_BASE}/api/notices/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        console.error("공지사항 로드 실패:", error);
        alert("공지사항을 불러오는데 실패했습니다.");
        navigate("/notices");
      }
    };

    loadNotice();
  }, [id, adminPkID, navigate, API_BASE]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    setLoading(true);
    try {
      await axios.put(`${API_BASE}/api/notices/${id}`, { title, content });
      alert("공지사항 수정 완료!");
      navigate(`/notices/${id}`); // 수정 후 상세 페이지로 이동
    } catch (err) {
      console.error(err);
      alert("수정 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (confirm("수정을 취소하시겠습니까?")) {
      navigate(`/notices/${id}`);
    }
  };

  // 관리자가 아닌 경우 로딩 화면 표시
  if (!adminPkID) {
    return (
      <div
        className="max-w-2xl mx-auto mt-10 p-6 
                    bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-gray-100 
                    rounded shadow"
      >
        <div className="text-center">
          <p>관리자 인증 중...</p>
        </div>
      </div>
    );
  }

  // 뒤로가기
  const backStep = () => {
    navigate(-1);
  };

  return (
    <div
      className="max-w-2xl mx-auto mt-10 p-6 
                    bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-gray-100 
                    rounded shadow"
    >
      <Button
        onClick={backStep}
        variant="outline"
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="w-4 h-4" />
        뒤로가기
      </Button>
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-xl font-bold">공지사항 수정</h1>
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
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-800 hover:bg-green-700 
                       text-white px-4 py-2 rounded
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "수정 중..." : "수정하기"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 
                       text-white px-4 py-2 rounded"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
