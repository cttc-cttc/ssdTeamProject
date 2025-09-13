import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonHomeStudy() {
  // 하나의 스켈레톤 레이아웃
  const skeletonLayout = () => {
    return (
      <div className="flex shadow-xl max-h-56 animate-pulse">
        {/* 왼쪽 정보 영역 */}
        <div className="flex-5 flex border border-accent bg-white dark:bg-muted/50 p-4">
          <div className="flex-4 flex flex-col gap-3 w-full">
            {/* 제목 */}
            <Skeleton className="h-6 w-3/5 rounded-md" />

            {/* 모집 기간 */}
            <Skeleton className="h-4 w-2/5 rounded-md" />

            {/* 작성자 */}
            <Skeleton className="h-4 w-1/3 rounded-md mb-6" />

            {/* 본문 미리보기 */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
            </div>
          </div>

          {/* 오른쪽 정보 (카테고리, 태그, 모집 인원, 찜하기) */}
          <div className="flex-1 flex flex-col items-end gap-3 pl-4">
            <Skeleton className="h-6 w-20 rounded-md" /> {/* 카테고리 */}
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16 rounded-2xl" />
              <Skeleton className="h-8 w-16 rounded-2xl" />
              <Skeleton className="h-8 w-16 rounded-2xl" />
            </div>
            <Skeleton className="h-4 w-24 rounded-md" /> {/* 모집 인원 */}
            <Skeleton className="h-4 w-20 rounded-md" /> {/* 찜하기 */}
          </div>
        </div>

        {/* 오른쪽 썸네일 */}
        <div className="flex-2 flex bg-muted">
          <Skeleton className="w-full h-full rounded-none" />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl flex flex-col gap-8 mb-25">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          {skeletonLayout()}
        </div>
      ))}
    </div>
  );
}
