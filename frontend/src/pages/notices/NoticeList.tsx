import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../lib/api";
import { Button } from "@/components/ui/button";
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

const fmt = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  const z = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())} ${z(d.getHours())}:${z(d.getMinutes())}`;
};

export default function NoticeList() {
  const { API_BASE } = useApiStore();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const [data, setData] = useState<Notice[]>([]);

  const load = async () => {
    let url = `${API_BASE}/api/notices`;
    if (q.trim()) {
      url = `${API_BASE}/api/notices/search?q=${encodeURIComponent(q.trim())}`;
    } else {
      // 검색어가 없으면 전체 목록 API (페이지네이션 포함)
      const params = new URLSearchParams({ page: String(page), size: "10" });
      params.append("sort", "pinned,desc");
      params.append("sort", "createdAt,desc");
      url = `${API_BASE}/api/notices/list?${params.toString()}`;
    }

    const res = await axios.get<Notice[]>(url);
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, [page]); // page 바뀔 때 로드

  return (
    <div className="max-w-3xl mx-auto p-6 bg-accent rounded-xl shadow">
      <div className="flex gap-2 mb-3">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="검색어(제목)"
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              setPage(0);
              load();
            }
          }}
        />
        <Button
          onClick={() => {
            setPage(0);
            load();
          }}
          className="border rounded #2C5536 text-white px-4"
        >
          검색
        </Button>

        <Button className="border rounded #2C5536 text-white px-4">
          <Link to="/notices/create">공지 등록</Link>
        </Button>
      </div>

      <ul className="divide-y">
        {data &&
          data.map(n => (
            <li key={n.id} className="py-3 flex items-center gap-3">
              {n.pinned ? (
                <span className="text-amber-600 text-xs border px-2 py-0.5 rounded-full">
                  상단고정
                </span>
              ) : (
                <span className="text-xs border px-2 py-0.5 rounded-full">공지</span>
              )}
              <Link to={`/notices/${n.id}`} className="font-semibold hover:underline">
                {n.title}
              </Link>
              <span className="ml-auto text-sm text-gray-500">
                조회 {n.viewCount} · {fmt(n.createdAt)}
              </span>
            </li>
          ))}
        <li className="py-6 text-center text-gray-500">목록이 비었습니다.</li>
      </ul>
    </div>
  );
}
