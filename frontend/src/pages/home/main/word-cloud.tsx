import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

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
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
  { text: "#tag", size: 20 },
];

const WordCloud: React.FC = React.memo(() => {
  const containerWidth = 1200;
  const containerHeight = 150;
  const placedWords: PlacedWord[] = [];
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    setWords(tempWords);
  }, []);

  // 충돌 체크
  const isColliding = (x: number, y: number, width: number, height: number) => {
    return placedWords.some(
      word =>
        x < word.x + word.width &&
        x + width > word.x &&
        y < word.y + word.height &&
        y + height > word.y
    );
  };

  // 랜덤 위치 찾기
  const getRandomPosition = (width: number, height: number) => {
    let x: number,
      y: number,
      tries = 0;
    do {
      x = Math.random() * (containerWidth - width);
      y = Math.random() * (containerHeight - height);
      tries++;
      if (tries > 100) break; // 최대 100번 시도
    } while (isColliding(x, y, width, height));
    return { x, y };
  };

  return (
    <div
      style={{
        position: "relative",
        width: containerWidth,
        height: containerHeight,
        // border: "1px solid #ccc",
        // overflow: "hidden",
      }}
    >
      {words.map((word, idx) => {
        const width = word.text.length * word.size * 0.6; // 대략 글자 너비
        const height = word.size;
        const pos = getRandomPosition(width, height);
        placedWords.push({ ...pos, width, height });

        return (
          <Button
            key={idx}
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              fontSize: `${word.size}px`,
              color: `hsl(${Math.random() * 360}, 70%, 50%)`,
              userSelect: "none",
            }}
            variant="ghost"
          >
            {word.text}
          </Button>
        );
      })}
    </div>
  );
});

export default WordCloud;
