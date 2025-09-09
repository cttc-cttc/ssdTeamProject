import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../lib/api";

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

const fmt = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  const z = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())} ${z(d.getHours())}:${z(d.getMinutes())}`;
};
const escapeHtml = (s = "") =>
  s.replace(
    /[&<>"']/g,
    c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );

export default function NoticeDetail() {
  const { id } = useParams();
  const [n, setN] = useState<Notice | null>(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get<Notice>(`/api/notices/${id}?inc=true`)
      .then(res => setN(res.data))
      .catch(console.error);
  }, [id]);

  if (!n) return <div className="max-w-3xl mx-auto p-6">로딩...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <Link to="/" className="text-sm text-blue-600 underline">
        ← 목록으로
      </Link>
      {n.pinned && (
        <div className="mt-2 text-amber-600 text-xs border px-2 py-0.5 rounded-full inline-block">
          상단고정
        </div>
      )}
      <h1 className="text-2xl font-bold mt-2">{n.title}</h1>
      <div className="text-sm text-gray-500 mt-1">
        작성자 {n.author} · 조회 {n.viewCount} · {fmt(n.createdAt)}
      </div>
      <hr className="my-4" />
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: escapeHtml(n.content).replace(/\n/g, "<br/>") }}
      />
    </div>
  );
}
