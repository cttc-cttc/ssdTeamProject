import TestPage from "@/pages/test/testPage";
import WordCloud from "./word-cloud";
import Banner from "./banner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomeMain() {
  return (
    <>
      <div className="flex justify-end items-center gap-4 mr-20 p-4">
        <p>임시 버튼입니다</p>
        <Button asChild>
          <Link to="/">회원가입</Link>
        </Button>
        <Button asChild>
          <Link to="/">로그인</Link>
        </Button>
        <Button asChild>
          <Link to="/">글쓰기</Link>
        </Button>
      </div>
      <Banner />
      <div className="container m-auto">
        <div className="flex flex-col items-center gap-4">
          <WordCloud />
          <TestPage />
        </div>
      </div>
    </>
  );
}
