import { useState } from "react";
import Banner from "./banner";
import HomeStudyList from "./home-study-list";
import TagSearchList from "./tag-search-list";
import WordCloudRows from "./word-cloud-rows";

export default function HomeMain() {
  // 선택된 태그 상태 관리
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <>
      <Banner />
      <div className="container m-auto">
        <div className="flex flex-col items-center gap-4">
          {/* WordCloudRows에 상태와 클릭 콜백 전달 */}
          <WordCloudRows selectedTags={selectedTags} onTagClick={setSelectedTags} />

          {/* 선택된 태그가 있으면 필터링된 리스트, 없으면 기본 리스트 */}
          {selectedTags.length === 0 ? (
            <HomeStudyList /> // 기본 리스트
          ) : (
            <TagSearchList tags={selectedTags} /> // 선택된 태그 기준 필터링된 리스트
          )}
        </div>
      </div>
    </>
  );
}
