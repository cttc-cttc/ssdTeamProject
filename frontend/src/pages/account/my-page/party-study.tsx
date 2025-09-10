import { Button } from "@/components/ui/button";
import CommonPagination from "@/components/common/common-pagination";
import { useState } from "react";

export default function PartyStudy() {
  // 페이지네이션 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지에 보여줄 스터디 수
  const [studyPerPage] = useState(6);

  // 더미 데이터
  const studies = Array.from({ length: 13 }, (_, i) => ({
    id: i + 1,
    title: `참여 스터디 ${i + 1}`,
    description: `참여 중인 스터디에 대한 간단한 설명입니다. (${i + 1})`,
  }));

  // 페이지네이션 로직 추가
  const totalPages = Math.max(1, Math.ceil(studies.length / studyPerPage));
  const indexOfLastStudy = currentPage * studyPerPage;
  const indexOfFirstStudy = indexOfLastStudy - studyPerPage;
  const visibleStudies = studies.slice(indexOfFirstStudy, indexOfLastStudy);

  return (
    <>
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold">참여 스터디</h1>
        <div className="flex items-center justify-between">
          <p>참여하고 있는 스터디를 확인할 수 있습니다.</p>
          <Button asChild size="sm">
            <a href="/study">스터디 찾아보기</a>
          </Button>
        </div>
      </div>

      {/* 참여 스터디 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
        {visibleStudies.map(study => (
          <div key={study.id} className="border rounded-md p-4">
            <h3 className="font-semibold mb-1">{study.title}</h3>
            <p className="text-sm text-muted-foreground">{study.description}</p>
          </div>
        ))}
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
