import { Button } from "@/components/ui/button";
import CommonPagination from "@/components/common/common-pagination";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListThumbnailGrid from "../../home/components/list-thumbnail-grid";
import type { studyProps } from "../../home/main/home-study-list";
import axios from "axios";
import { useInfoStore } from "../info-store";
import { useApiStore } from "@/components/common/api-store";

export default function OpenStudy() {
  const { API_BASE } = useApiStore();
  // 사용자 정보 가져오기
  const { userNickname } = useInfoStore();

  // 페이지네이션 상태 추가
  const [currentPage, setCurrentPage] = useState(1);

  // 한 페이지에 보여줄 스터디 수
  const [studyPerPage] = useState(6);

  // API 연동을 위한 상태
  const [studies, setStudies] = useState<studyProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // 개설한 스터디 데이터 가져오기
  useEffect(() => {
    const fetchMyStudies = async () => {
      if (!userNickname) {
        console.error("사용자 닉네임이 없습니다.");
        setStudies([]);
        setTotalPages(1);
        return;
      }

      setLoading(true);
      try {
        // 백엔드 API 호출
        const response = await axios.get(`${API_BASE}/api/posts/open-study`, {
          params: { userNickname },
        });

        // 실제 API 데이터만 사용 (개설한 스터디가 없으면 빈 배열)
        const apiData = response.data || [];
        setStudies(apiData);
        setTotalPages(Math.max(1, Math.ceil(apiData.length / studyPerPage)));
      } catch (error) {
        console.error("개설한 스터디 조회 실패:", error);
        // 에러 시 빈 배열로 설정
        setStudies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchMyStudies();
  }, [userNickname, currentPage, studyPerPage, API_BASE]);

  // 페이지네이션 로직
  const indexOfLastStudy = currentPage * studyPerPage;
  const indexOfFirstStudy = indexOfLastStudy - studyPerPage;
  const visibleStudies = studies.slice(indexOfFirstStudy, indexOfLastStudy);

  if (loading) {
    return (
      <>
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold">개설 스터디</h1>
          <div className="flex items-center justify-between">
            <p>개설한 스터디를 확인할 수 있습니다.</p>
            <Button asChild size="sm">
              <a href="/study">스터디 찾아보기</a>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">로딩 중...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold">개설 스터디</h1>
        <div className="flex items-center justify-between">
          <p>개설한 스터디를 확인할 수 있습니다.</p>
          <Button asChild size="sm">
            <a href="/study">스터디 찾아보기</a>
          </Button>
        </div>
      </div>

      {/* 개설 스터디 목록 */}
      <div className="flex flex-col w-full max-w-full gap-4 px-6 mb-16">
        {visibleStudies.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-muted-foreground">개설한 스터디가 없습니다.</div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {visibleStudies.map(study => (
              <Link
                key={study.id}
                to={`/my-page/open-study/${study.id}/study-detail`}
                className="transition-all duration-200 ease-in-out hover:ring-3 ring-ring/50"
              >
                <ListThumbnailGrid study={study} type="string" />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="mb-8">
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
