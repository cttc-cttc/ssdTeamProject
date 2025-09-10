import { Button } from "@/components/ui/button";
import CommonPagination from "@/components/common/common-pagination";
import { useState } from "react";

export default function OpenStudy() {
  // 페이지네이션 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지에 보여줄 스터디 수
  const [studyPerPage] = useState(6);

  // 페이지네이션 로직 추가
  // const indexOfLastStudy = currentPage * studyPerPage;
  // const indexOfFirstStudy = indexOfLastStudy - studyPerPage;
  const totalPages = Math.ceil(20 / studyPerPage); // 예시로 총 20개의 스터디가 있다고 가정
  
  return (
    <>
      <div className="px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">개설 스터디</h1>
        <div className="flex items-center justify-between">
          <p>개설한 스터디를 확인할 수 있습니다.</p>
          <Button asChild size="sm">
            <a href="/study">스터디 찾아보기</a>
          </Button>
        </div>
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
