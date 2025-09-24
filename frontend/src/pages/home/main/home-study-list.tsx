import StudySections from "../components/study-sections";

export interface studyProps {
  id: number;
  title: string;
  userNickname: string;
  content: string;
  mainCategory: string;
  subCategories: string[];
  deadline: Date;
  created: Date;
  updated: Date;
  currentCount: number;
  maxCount: number;
  wishCount: number;
  isEnded: boolean;
}

export default function HomeStudyList() {
  return (
    <div className="container">
      <StudySections type="deadline" title="⏰ 마감 임박 스터디" studyCount={6} />
      <StudySections type="popular" title="🔥 인기 스터디" studyCount={6} />
      <StudySections type="recent" title="🌟 최신 스터디" studyCount={9} />
    </div>
  );
}
