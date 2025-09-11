// import WordCloud from "./word-cloud";
import Banner from "./banner";
import HomeStudyList from "./home-study-list";
import WordCloudRows from "./word-cloud-rows";

export default function HomeMain() {
  return (
    <>
      <Banner />
      <div className="container m-auto">
        <div className="flex flex-col items-center gap-4">
          {/* <WordCloud /> */}
          <WordCloudRows />
          <HomeStudyList />
        </div>
      </div>
    </>
  );
}
