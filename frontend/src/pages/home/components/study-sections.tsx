import { useEffect, useState } from "react";
import type { studyProps } from "../main/home-study-list";
import axios from "axios";
import { Link } from "react-router-dom";
import ListThumbnailGrid from "./list-thumbnail-grid";
import { Button } from "@/components/ui/button";
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface StudySectionProps {
  type: "deadline" | "popular" | "recent"; // 어떤 섹션인지 구분
  title: string; // 화면에 보여줄 타이틀
  studyCount: number; // 섹션당 보여줄 스터디 개수
}

/**
 * deadline : studyPost 테이블의 deadline 값 오름차순 기준
 * popular  : studyPost 테이블의 wish_count 값 내림차순 기준
 * recent   : studyPost 테이블의 id 값 내림차순 기준
 */
export default function StudySections({ type, title, studyCount }: StudySectionProps) {
  const [list, setList] = useState<studyProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query: Record<string, string | number> = {
      studySections: type,
      category: "all",
      page: 0,
      size: studyCount,
    };

    axios
      .get("/api/studyList/studySections", { params: query })
      .then(res => {
        console.log(res.data.content);
        setList(res.data.content);
      })
      .catch(err => console.error("리스트 조회 실패: ", err))
      .finally(() => setLoading(false));
  }, [type, studyCount]);

  if (loading) return <div>로딩 중..</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-11/12 mt-6 py-8 text-2xl font-medium dark:text-foreground">
        <div>{title}</div>
        <div>
          <Button asChild variant="destructive">
            <Link to="/study">
              다른 스터디 찾기
              <BreadcrumbSeparator className="list-none" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex max-w-7xl flex-col w-full gap-4 mb-16">
        <div className="grid grid-cols-3 gap-8">
          {list.map(study => (
            <Link
              key={study.id}
              to={`/posts/${study.id}`}
              className="hover:ring-3 ring-ring/50 transition-all duration-200 ease-in-out"
            >
              <ListThumbnailGrid study={study} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
