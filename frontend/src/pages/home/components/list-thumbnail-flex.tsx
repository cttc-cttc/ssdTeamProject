import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { listDataType } from "../study-list/search-study";
import dayjs from "dayjs";
import { categoryNameMap } from "@/components/common/mappings";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "../study-list/image-frame";

export default function ListThumbnailFlex({ posts }: { posts: listDataType }) {
  // 첫 번째 이미지 추출 (정규식)
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  const match = posts.content.match(imageRegex);
  const firstImage = match ? match[1] : null; // 이미지 url

  const textWithoutImage = posts.content
    .replace(/!\[.*?\]\((.*?)\)/g, "") // 모든 이미지 제거
    .replace(/https?:\/\/[^\s]+/g, ""); // 순수 URL 제거

  const stripHtml = (str: string) => str.replace(/<\/?[^>]+(>|$)/g, ""); // HTML 태그 제거

  return (
    <div className="flex shadow-xl max-h-56">
      <div className="flex-5 flex border-1 border-accent bg-white dark:bg-muted/50 p-4">
        <div className="flex-4 flex flex-col gap-2">
          <div className="text-[#2c3e50] dark:text-accent-foreground text-xl font-bold">
            {posts.title}
          </div>
          <div>
            스터디 기간: {dayjs(posts.createdAt).format("YYYY-MM-DD")} ~{" "}
            {dayjs(posts.deadline).format("YYYY-MM-DD")}
          </div>
          <div className="mb-10 text-muted-foreground">작성자: {posts.userId}</div>
          {/* 왼쪽: 본문 미리보기 */}
          <div className="flex-1 line-clamp-5 text-muted-foreground">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: () => null, // 링크 안 보이게
                img: () => null, // 이미지 안 보이게
              }}
            >
              {stripHtml(textWithoutImage).slice(0, 1000)}
            </ReactMarkdown>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-end gap-2">
          <div>{categoryNameMap[posts.category]}</div>
          <div>
            <Button variant="ssd_tag" className="border-1 border-foreground/30 text-sm">
              #태그
            </Button>
          </div>
          <div className="text-sm">모집 인원: 1/5</div>
        </div>
      </div>

      <div className="flex-2 flex bg-muted">
        {/* 오른쪽: 첫 번째 이미지 썸네일 */}
        {firstImage ? (
          <img src={firstImage} alt="thumbnail" className="w-full h-full object-cover" />
        ) : (
          <ImageFrame />
        )}
      </div>
    </div>
  );
}
