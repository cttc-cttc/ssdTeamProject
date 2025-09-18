import dayjs from "dayjs";
import { categoryNameMap } from "@/components/common/mappings";
import { ImageFrame } from "../study-list/image-frame";
import type { studyProps } from "../main/home-study-list";
import { Bookmark } from "lucide-react";
import Countdown from "./countdown";

interface ListThumbnailGridProps {
  study: studyProps;
  type: string; // "deadline" | "popular" | "recent"
}

export default function ListThumbnailGrid({ study, type }: ListThumbnailGridProps) {
  // 첫 번째 이미지 추출 (정규식)
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  const match = study.content.match(imageRegex);
  const firstImage = match ? match[1] : null; // 이미지 url

  return (
    <div className="shadow-xl border border-accent max-h-80 rounded overflow-hidden flex flex-col">
      {/* 첫 번째 이미지 썸네일 */}
      <div className="relative w-full h-60 overflow-hidden">
        {firstImage ? (
          <img src={firstImage} alt="thumbnail" className="w-full h-full object-cover" />
        ) : (
          <ImageFrame />
        )}
        {study.ended && (
          <div className="absolute top-2 right-2 text-sm text-white bg-destructive p-1 rounded">
            종료된 스터디
          </div>
        )}
      </div>

      {/* 정보 영역 */}
      <div className="flex flex-col gap-1 p-3 bg-white dark:bg-muted/50 flex-1">
        <div className="flex justify-between items-center">
          <div className="flex-3 text-[#2c3e50] dark:text-accent-foreground font-bold text-lg line-clamp-1">
            {study.title}
          </div>
          <div className="flex-1 text-end text-sm dark:text-muted-foreground">
            참여자 {study.currentCount}/{study.maxCount}
          </div>
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <div>카테고리 - {categoryNameMap[study.mainCategory]}</div>
          <div className="flex">
            <Bookmark className="text-yellow-500 fill-yellow-200" /> 찜하기 {study.wishCount}
          </div>
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <div>
            모집 기간 {dayjs(study.created).format("YYYY-MM-DD")} ~{" "}
            {dayjs(study.deadline).format("YYYY-MM-DD")}
          </div>
          {type === "deadline" ? (
            <div>
              <Countdown deadline={study.deadline} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
