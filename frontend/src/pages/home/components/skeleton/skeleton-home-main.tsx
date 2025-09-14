import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonHomeMain() {
  // 하나의 스켈레톤 레이아웃
  const skeletonLayout = () => {
    return (
      <div className="shadow-xl border border-accent max-h-80 rounded overflow-hidden flex flex-col">
        {/* 이미지 영역 */}
        <div className="w-full h-60 overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>

        {/* 정보 영역 */}
        <div className="flex flex-col gap-2 p-3 bg-white dark:bg-muted/50 flex-1">
          {/* 제목 + 참여자 */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-2/3 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>

          {/* 카테고리 + 찜하기 */}
          <div className="flex justify-between text-sm">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>

          {/* 모집 기간 + (마감 임박 시) 카운트다운 */}
          <div className="flex justify-between text-sm">
            <Skeleton className="h-4 w-40 rounded" />
            <Skeleton className="h-4 w-16 rounded" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex max-w-7xl flex-col w-full gap-4 mb-16">
      <div className="grid grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            {skeletonLayout()}
          </div>
        ))}
      </div>
    </div>
  );
}
