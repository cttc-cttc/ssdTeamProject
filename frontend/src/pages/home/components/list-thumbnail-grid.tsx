import dayjs from "dayjs";
import { categoryNameMap } from "@/components/common/mappings";
import { ImageFrame } from "../study-list/image-frame";
import type { studyProps } from "../main/home-study-list";

export default function ListThumbnailGrid({ study }: { study: studyProps }) {
  // 첫 번째 이미지 추출 (정규식)
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  const match = study.content.match(imageRegex);
  const firstImage = match ? match[1] : null; // 이미지 url

  return (
    // <div className="shadow-xl border-1 border-accent max-h-72">
    //   {firstImage ? (
    //     <img src={firstImage} alt="thumbnail" className="w-full h-96 object-cover" />
    //   ) : (
    //     <ImageFrame />
    //   )}
    //   <div className="flex flex-col gap-1 p-3 bg-white dark:bg-muted/50">
    //     <div className="flex justify-between">
    //       <div className="text-[#2c3e50] dark:text-accent-foreground font-bold text-lg">
    //         {study.title}
    //       </div>
    //       <div>
    //         참가 인원 {study.currentCont}/{study.maxCount}
    //       </div>
    //     </div>
    //     <div className="flex justify-between">
    //       <div className="dark:text-muted-foreground">
    //         카테고리 - {categoryNameMap[study.category]}
    //       </div>
    //       <div className="dark:text-muted-foreground">찜하기 {study.wishCount}</div>
    //     </div>
    //     <div className="dark:text-muted-foreground">
    //       스터디 기간 {dayjs(study.created).format("YYYY-MM-DD")} ~{" "}
    //       {dayjs(study.deadline).format("YYYY-MM-DD")}
    //     </div>
    //   </div>
    // </div>

    <div className="shadow-xl border border-accent max-h-80 rounded overflow-hidden flex flex-col">
      {/* 이미지 영역 */}
      <div className="w-full h-60 overflow-hidden">
        {firstImage ? (
          <img src={firstImage} alt="thumbnail" className="w-full h-full object-cover" />
        ) : (
          <ImageFrame />
        )}
      </div>

      {/* 정보 영역 */}
      <div className="flex flex-col gap-1 p-3 bg-white dark:bg-muted/50 flex-1">
        <div className="flex justify-between items-center">
          <div className="flex-3 text-[#2c3e50] dark:text-accent-foreground font-bold text-lg line-clamp-1">
            {study.title}
          </div>
          <div className="flex-1 text-end text-sm dark:text-muted-foreground">
            참여자 {study.currentCont}/{study.maxCount}
          </div>
        </div>

        <div className="flex justify-between text-sm dark:text-muted-foreground">
          <div>카테고리 - {categoryNameMap[study.category]}</div>
          <div>찜하기 {study.wishCount}</div>
        </div>

        <div className="text-sm dark:text-muted-foreground">
          스터디 기간 {dayjs(study.created).format("YYYY-MM-DD")} ~{" "}
          {dayjs(study.deadline).format("YYYY-MM-DD")}
        </div>
      </div>
    </div>
  );
}
