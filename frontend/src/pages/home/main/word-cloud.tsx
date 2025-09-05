import { Button } from "@/components/ui/button";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

interface Word {
  text: string;
  size: number; // font-size
}

interface PlacedWord {
  x: number;
  y: number;
  width: number;
  height: number;
}

const tempWords: Word[] = [
  { text: "# 부동산재무", size: 14 },
  { text: "# C#", size: 14 },
  { text: "# 독일어", size: 14 },
  { text: "# 영어", size: 14 },
  { text: "# 정보처리", size: 14 },
  { text: "# Java", size: 14 },
  { text: "# React", size: 14 },
  { text: "# PHP", size: 14 },
  { text: "# 헬스케어", size: 14 },
  { text: "# 전기", size: 14 },
  { text: "# 일본어", size: 14 },
  { text: "# 바리스타", size: 14 },
  { text: "# 중국어", size: 14 },
  { text: "# Python", size: 14 },
  { text: "# SQL", size: 14 },
  { text: "# 아랍어", size: 14 },
  { text: "# ERP운영", size: 14 },
  { text: "# Aws", size: 14 },
  { text: "# 사무경리", size: 14 },
  { text: "# 주택관리", size: 14 },
  { text: "# C++", size: 14 },
  { text: "# 러시아어", size: 14 },
  { text: "# 프랑스어", size: 14 },
];

function WordCloud() {
  const containerWidth = 1200;
  const containerHeight = 250;
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    setWords(tempWords);
  }, []);

  // 좌표를 최초 한 번만 계산
  const placedWords = useMemo(() => {
    const placed: PlacedWord[] = [];

    const isColliding = (x: number, y: number, width: number, height: number) =>
      placed.some(
        word =>
          x < word.x + word.width &&
          x + width > word.x &&
          y < word.y + word.height &&
          y + height > word.y
      );

    const getRandomPosition = (width: number, height: number) => {
      let x: number,
        y: number,
        tries = 0;
      do {
        x = Math.random() * (containerWidth - width);
        y = Math.random() * (containerHeight - height);
        tries++;
        if (tries > 1000) break; // 최대 1000번 시도
      } while (isColliding(x, y, width, height));
      return { x, y };
    };

    return words.map(word => {
      const padding = 16; // 좌우 패딩 여유
      const width = word.text.length * word.size * 0.7 + padding;
      const height = word.size * 2; // 버튼 높이는 글자보다 크니까 2배 정도
      const pos = getRandomPosition(width, height);
      placed.push({ ...pos, width, height });
      return { ...word, ...pos };
    });
  }, [words]);

  return (
    <div
      style={{
        position: "relative",
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {placedWords.map((word, idx) => (
        <Button
          key={idx}
          className="
            absolute
          text-[#363636]
            border border-[#5c5c5c]
            transition-transform
            duration-200
            ease-in-out
            hover:scale-105
            hover:z-10
          "
          style={{
            left: word.x,
            top: word.y,
            fontSize: `${word.size}px`,
            userSelect: "none",
            backgroundColor: `hsl(${Math.random() * 360}, 50%, 70%)`,
          }}
          variant="ssd_tag"
          asChild
        >
          <Link to="/">{word.text}</Link>
        </Button>
      ))}
    </div>
  );
}

export default React.memo(WordCloud);
