import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

interface Word {
  text: string;
}

interface WordCloudRowsProps {
  selectedTags: string[];
  onTagClick: (newTags: string[]) => void;
}

// TODO: db 데이터 사용자 태그 조회 값으로 변경 필요
const tempWords: Word[] = [
  { text: "# 부동산재무" },
  { text: "# C#" },
  { text: "# 독일어" },
  { text: "# 영어" },
  { text: "# 정보처리" },
  { text: "# Java" },
  { text: "# React" },
  { text: "# PHP" },
  { text: "# 헬스케어" },
  { text: "# 전기" },
  { text: "# 일본어" },
  { text: "# 바리스타" },
  { text: "# 중국어" },
  { text: "# Python" },
  { text: "# SQL" },
  { text: "# 아랍어" },
  { text: "# ERP운영" },
  { text: "# Aws" },
  { text: "# 사무경리" },
  { text: "# 주택관리" },
  { text: "# C++" },
  { text: "# 러시아어" },
  { text: "# 프랑스어" },
  { text: "# ㅎㅎ" },
  { text: "# 11" },
  { text: "# 태그" },
  { text: "# 태그1" },
  { text: "# 태그2" },
];

function WordCloudRows({ selectedTags, onTagClick }: WordCloudRowsProps) {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    setWords(tempWords);
  }, []);

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

  return (
    <div className="flex flex-col items-center gap-2">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-2 flex-wrap">
          {words.slice(rowIdx * wordsPerRow, (rowIdx + 1) * wordsPerRow).map((word, idx) => {
            const cleanTag = word.text.replace("# ", "");
            const isActive = selectedTags.includes(cleanTag);
            return (
              <Button
                key={idx}
                variant="ssd_tag"
                className={`text-sm transition-transform duration-200 ease-in-out hover:scale-105 select-none ${
                  isActive ? "bg-primary text-white hover:bg-none" : "hover:bg-[#B9A5D4]/50"
                }`}
                onClick={() => handleClick(word.text)}
              >
                {word.text}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default React.memo(WordCloudRows);
