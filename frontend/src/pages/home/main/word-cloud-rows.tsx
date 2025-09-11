import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Word {
  text: string;
}

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
];

function WordCloudRows() {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    setWords(tempWords);
  }, []);

  // 한 줄에 들어갈 개수
  const rows = 3;
  const wordsPerRow = Math.ceil(words.length / rows);

  return (
    <div className="flex flex-col items-center gap-2">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-2 flex-wrap">
          {words.slice(rowIdx * wordsPerRow, (rowIdx + 1) * wordsPerRow).map((word, idx) => (
            <Button
              key={idx}
              variant="ssd_tag"
              className="text-sm transition-transform duration-200 ease-in-out hover:scale-105 select-none"
              asChild
            >
              <Link to="/">{word.text}</Link>
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default React.memo(WordCloudRows);
