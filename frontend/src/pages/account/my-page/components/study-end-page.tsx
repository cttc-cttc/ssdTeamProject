import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function StudyEndPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleEndStudy = async () => {
    if (!id) return;

    const confirmEnd = window.confirm(
      "정말로 이 스터디를 종료하시겠습니까?\n종료된 스터디는 복구할 수 없습니다."
    );

    if (!confirmEnd) return;

    setIsLoading(true);
    try {
      await axios.post(`/api/end-study/${id}`);
      alert("스터디가 성공적으로 종료되었습니다.");
      navigate("/my-page/open-study");
    } catch (error) {
      console.error("스터디 종료 실패:", error);
      alert("스터디 종료에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">스터디 종료</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="ml-3">
              <h3 className="text-lg font-medium text-yellow-800">주의사항</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>스터디를 종료하면 더 이상 새로운 참여자를 받을 수 없습니다.</li>
                  <li>스터디 목록에서 "종료됨" 상태로 표시됩니다.</li>
                  <li>종료된 스터디는 복구할 수 없습니다.</li>
                  <li>스터디 데이터는 보존되지만 활성 상태가 해제됩니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleEndStudy}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
          >
            {isLoading ? "종료 중..." : "스터디 종료하기"}
          </Button>

          <Button onClick={() => navigate(-1)} variant="outline" className="px-8 py-3">
            취소
          </Button>
        </div>
      </div>
    </div>
  );
}
