import { useState } from "react";
import GuideBoard from "./guide-board";
import GuideStudyCafe from "./guide-study-cafe";

export default function GuidePage() {
  const btnClick = () => {
    setComponent("studyCafe");
  };
  const stnClick = () => {
    setComponent("board");
  };

  const [component, setComponent] = useState("");

  return (
    <div className="container m-auto flex flex-col items-center p-6 mb-10">
      <h1 className="text-2xl font-bold mb-6">이용 가이드</h1>
      <div className="flex gap-4 mb-6">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:cursor-pointer"
          onClick={btnClick}
        >
          스터디 이용방법
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer"
          onClick={stnClick}
        >
          게시판 작성방법
        </button>
      </div>

      <div>
        {component === "" && <GuideStudyCafe />}
        {component === "studyCafe" && <GuideStudyCafe />}
        {component === "board" && <GuideBoard />}
      </div>
    </div>
  );
}
