import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

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
      category: "Java",
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
    <div className="flex flex-col w-full gap-4">
      <div className="mt-10 py-8">스터디 리스트</div>
      {list.map(study => (
        <div key={study.id} className="border-1 border-primary">
          <div>{study.id}</div>
          <div>{study.title}</div>
          <div>{study.content}</div>
          <div>카테고리: {study.category}</div>
          <div>작성일: {dayjs(study.created).format("YYYY-MM-DD")}</div>
          <div>마감일: {dayjs(study.deadline).format("YYYY-MM-DD")}</div>
          <div>
            참가 인원 {study.currentCont}/{study.maxCount}
          </div>
          <div>찜하기 {study.wishCount}</div>
        </div>
      ))}
    </div>
  );
}
