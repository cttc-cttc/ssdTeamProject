import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ImageFrame } from "../study-list/image-frame";

interface studyProps {
  id: number;
  title: string;
  content: string;
  category: string;
  deadline: Date;
  created: Date;
  updated: Date;
  currentCont: number;
  maxCount: number;
  wishCount: number;
}

export default function HomeStudyList() {
  const [list, setList] = useState<studyProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query: Record<string, string | number> = {
      category: "",
      page: 0,
      size: 10,
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
            <div key={study.id} className="shadow-xl border-1 border-accent">
              <ImageFrame />
              <div className="flex flex-col gap-1 p-3 bg-white dark:bg-muted/50">
                <div className="flex justify-between">
                  <div className="text-[#2c3e50] dark:text-muted font-bold text-lg">
                    {study.title}
                  </div>
                  <div>
                    참가 인원 {study.currentCont}/{study.maxCount}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>카테고리 {study.category}</div>
                  <div>찜하기 {study.wishCount}</div>
                </div>
                <div>
                  스터디 기간 {dayjs(study.created).format("YYYY-MM-DD")} ~{" "}
                  {dayjs(study.deadline).format("YYYY-MM-DD")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
