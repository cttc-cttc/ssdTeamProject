import { useState } from "react";
import axios from "../../lib/api";

type Guide = {
  id: number;
  type: "BOARD" | "CAFE"; // 여기서도 명확히 지정
  content: string;
  imageUrl?: string;
};

// 🔥 타입 별칭 분리
type GuideType = "BOARD" | "CAFE";

export default function GuidePage() {
  // selected는 GuideType 또는 null
  const [selected, setSelected] = useState<GuideType | null>(null);
  const [guide, setGuide] = useState<Guide | null>(null);

  const loadGuide = async (type: GuideType) => {
    try {
      const res = await axios.get<Guide>(`/api/guides/${type}`);
      setGuide(res.data);
      setSelected(type); // ✅ 이제 타입 완전 일치
    } catch (e) {
      console.error(e);
      alert("가이드 불러오기 실패");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">이용 가이드</h1>
      <div className="flex gap-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => loadGuide("BOARD")}
        >
          게시판 작성방법
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => loadGuide("CAFE")}
        >
          스터디카페 이용방법
        </button>
      </div>
      <p>{selected}</p>

      {guide && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            {guide.type === "BOARD" ? "게시판 작성방법" : "스터디카페 이용방법"}
          </h2>
          <p className="mb-4 whitespace-pre-line">{guide.content}</p>

          {/* 🔥 업로드 버튼을 이 위치에 추가 */}
          <input
            type="file"
            onChange={async e => {
              if (!e.target.files) return;
              const formData = new FormData();
              formData.append("file", e.target.files[0]);
              const res = await axios.post("/api/files/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
              alert("업로드 성공! URL: " + res.data);
            }}
            className="mb-4"
          />

          {/* 업로드 후 표시되는 이미지 */}
          {guide.imageUrl && (
            <img src={guide.imageUrl} alt="guide" className="max-w-full rounded mt-4" />
          )}
        </div>
      )}
    </div>
  );
}
