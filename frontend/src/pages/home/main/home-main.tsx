import TestPage from "@/pages/test/testPage";
import WordCloud from "./word-cloud";
import Banner from "./banner";

export default function HomeMain() {
  return (
    <>
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
