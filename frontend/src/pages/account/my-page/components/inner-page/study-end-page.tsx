import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useApiStore } from "@/components/common/api-store";

export default function StudyEndPage() {
  const { API_BASE } = useApiStore();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const checkStudyStatus = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE}/api/posts/${id}`);
        // 마감일이 지났거나 사용자가 직접 종료한 경우
        const deadline = new Date(response.data.deadline);
        const now = new Date();
        const isDeadlinePassed = deadline < now;
        const isManuallyEnded = response.data.isEnded;

        setIsEnded(isDeadlinePassed || isManuallyEnded);
      } catch (error) {
        console.error("스터디 상태 확인 실패:", error);
        // API 실패 시 임시로 false 설정
        setIsEnded(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkStudyStatus();
  }, [id, API_BASE]);

  const handleEndStudy = async () => {
    if (!id) return;

    const confirmEnd = confirm(
      "정말로 이 스터디를 종료하시겠습니까?\n종료된 스터디는 복구할 수 없습니다."
    );

    if (!confirmEnd) return;

    setIsLoading(true);
    try {
      await axios.post(`${API_BASE}/api/posts/end-study/${id}`);
      alert("스터디가 성공적으로 종료되었습니다.");

      // 종료 성공 후 상태를 다시 확인
      const response = await axios.get(`${API_BASE}/api/posts/${id}`);
      setIsEnded(response.data.ended);

      // 페이지 새로고침으로 상태 업데이트 확인
      window.location.reload();
    } catch (error) {
      console.error("스터디 종료 실패:", error);
      alert("스터디 종료에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 뒤로가기
  const backStep = () => {
    navigate(-1);
  };

  if (isLoading) return <div></div>;

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <Button
          onClick={backStep}
          variant="outline"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          뒤로가기
        </Button>
        <h1 className="text-3xl font-bold mb-6">스터디 종료</h1>

        {isEnded ? (
          // 종료된 스터디 내용
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-8 mb-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">이 스터디는 종료되었습니다</h3>
              <p className="text-sm text-gray-600">더 이상 참여할 수 없습니다.</p>
            </div>
          </div>
        ) : (
          // 진행 중인 스터디 내용
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
        )}

        <div className="flex gap-4">
          {isEnded ? (
            // 종료된 스터디 버튼
            <Button onClick={() => navigate(-1)} className="px-8 py-3">
              돌아가기
            </Button>
          ) : (
            // 진행 중인 스터디 버튼
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
