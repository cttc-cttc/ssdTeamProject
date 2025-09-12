import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListThumbnailGrid from "../components/list-thumbnail-grid";

export interface studyProps {
  id: number;
  title: string;
  content: string;
  mainCategory: string;
  subCategories: string[];
  deadline: Date;
  created: Date;
  updated: Date;
  currentCount: number;
  maxCount: number;
  wishCount: number;
}

export default function HomeStudyList() {
  const [list, setList] = useState<studyProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query: Record<string, string | number> = {
      category: "all",
      page: 0,
      size: 9,
      keyword: "",
    };

    axios
      .get("/api/studyList", { params: query })
      .then(res => {
        // console.log(res.data.content);
        setList(res.data.content);
      })
      .catch(err => console.error("리스트 조회 실패: ", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>로딩 중..</div>;

  return (
    <>
      <div className="w-full max-w-11/12 mt-6 py-8 text-2xl font-medium dark:text-foreground">
        최신 스터디
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
    </>
  );
}
