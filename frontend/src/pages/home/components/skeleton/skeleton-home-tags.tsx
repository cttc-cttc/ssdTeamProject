import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonHomeTags() {
  // 각 줄에 표시할 버튼 개수 (랜덤 또는 고정)
  const wordsPerRow = 10;
  const rows = 3;

  return (
    <div className="flex flex-col items-center gap-2">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-2 flex-wrap">
          {Array.from({ length: wordsPerRow }).map((_, idx) => {
            const randomWidth = Math.random() * 41 + 50; // 60~91px
            return (
              <Skeleton
                key={idx}
                className="rounded-3xl h-9 shadow-xs"
                style={{ width: `${randomWidth}px` }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
