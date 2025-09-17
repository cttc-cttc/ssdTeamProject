import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { SkeletonHomeTags } from "../components/skeleton/skeleton-home-tags";

interface Word {
  name: string;
  usageCount: number;
}

interface WordCloudRowsProps {
  selectedTags: string[];
  onTagClick: (newTags: string[]) => void;
}

// const tempWords: Word[] = [
//   { text: "# 부동산재무" },
//   { text: "# C#" },
//   { text: "# 독일어" },
//   { text: "# 영어" },
//   { text: "# 정보처리" },
//   { text: "# Java" },
//   { text: "# React" },
//   { text: "# PHP" },
//   { text: "# 헬스케어" },
//   { text: "# 전기" },
//   { text: "# 일본어" },
//   { text: "# 바리스타" },
//   { text: "# 중국어" },
//   { text: "# Python" },
//   { text: "# SQL" },
//   { text: "# 아랍어" },
//   { text: "# ERP운영" },
//   { text: "# Aws" },
//   { text: "# 사무경리" },
//   { text: "# 주택관리" },
//   { text: "# C++" },
//   { text: "# 러시아어" },
//   { text: "# 프랑스어" },
//   { text: "# ㅎㅎ" },
//   { text: "# 11" },
//   { text: "# 태그" },
//   { text: "# 태그1" },
//   { text: "# 태그2" },
//   { text: "# 123" },
//   { text: "# qwe" },
//   { text: "# asd" },
// ];

/**
 * 사용자가 입력한 태그들 중 중복 입력된 태그의 수를 합산해서
 * 합산 수치가 높은 순으로 [인기 태그 Top 30] 처럼 표시
 */
function WordCloudRows({ selectedTags, onTagClick }: WordCloudRowsProps) {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTagData = useCallback(() => {
    setLoading(true);
    const startTime = Date.now();
    axios
      .get("/api/tags/popular")
      .then(res => {
        // console.log(res.data);
        setWords(res.data);
      })
      .catch(err => console.error("태그 불러오기 에러 ", err))
      .finally(() => {
        const elapsed = Date.now() - startTime;
        const minLoadingTime = 500; // 최소 0.5초는 스켈레톤 보여주기

        if (elapsed < minLoadingTime) {
          setTimeout(() => setLoading(false), minLoadingTime - elapsed);
        } else {
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    fetchTagData();
  }, [fetchTagData]);

  const handleClick = (tag: string) => {
    const cleanTag = tag.replace("# ", "");
    let newTags: string[];

    if (selectedTags.includes(cleanTag)) {
      // 이미 있으면 제거
      newTags = selectedTags.filter(t => t !== cleanTag);
    } else {
      // 없으면 추가
      newTags = [...selectedTags, cleanTag];
    }

    // 상위 컴포넌트로 상태 전달
    onTagClick(newTags);
  };

  // 한 줄에 들어갈 개수
  const rows = 3;
  const wordsPerRow = Math.ceil(words.length / rows);

  if (loading) return <SkeletonHomeTags />;

  return (
    <div className="flex flex-col items-center gap-2">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-2 flex-wrap">
          {words.slice(rowIdx * wordsPerRow, (rowIdx + 1) * wordsPerRow).map((word, idx) => {
            const cleanTag = word.name.replace("# ", "");
            const isActive = selectedTags.includes(cleanTag);
            return (
              <Button
                key={idx}
                variant="ssd_tag"
                className={`text-sm transition-transform duration-200 ease-in-out hover:scale-105 select-none ${
                  isActive ? "bg-primary text-white hover:bg-none" : "hover:bg-[#B9A5D4]/50"
                }`}
                onClick={() => handleClick(word.name)}
              >
                {word.name}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default React.memo(WordCloudRows);
