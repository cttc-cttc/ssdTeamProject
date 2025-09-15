import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
import CustomViewer from "./custom-viewer";
import "./post-detail.css";
import SidebarLayout from "@/components/common/sidebar-layout";
import {
  studyCategory,
  studyCategoryName,
  studyPageName,
  mypageInnerSidebar,
  mypageInnerSidebarName,
  mypagePageInnerName,
} from "@/components/common/sidebar-menu-data";
import CategoryBreadcrumb from "@/components/common/category-breadcrumb";
import { useInfoStore } from "@/pages/account/info-store";

interface Post {
  id: number;
  userNickname: string;
  title: string;
  mainCategory: string;
  subCategories: string[];
  currentCount: number;
  maxCount: number;
  content: string;
  deadline: string;
  wishCount: number;
}

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate(); // 삭제 후 메인 화면으로 이동
  const { userNickname } = useInfoStore(); // 현재 사용자 정보
  const [activeSidebar, setActiveSidebar] = useState("study-detail"); // 현재 활성 사이드바

  useEffect(() => {
    axios.get(`/api/create-post/${id}`).then(res => setPost(res.data));
  }, [id]);

  const getDDay = (deadline: string) => {
    const end = new Date(deadline).getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `D-${diff}` : "마감";
  };

  if (!post) return <div>게시글을 불러오고 있습니다.</div>; // 필요할까요??

  // 개설자 확인
  const creator = userNickname === post.userNickname;

  // 사이드바 설정 (개설자면 스터디 상세 페이지, 아니면 마이 페이지 사이드바) - 메인 스터디 화면에서
  const sidebarConfig = creator
    ? {
        categoryName: mypageInnerSidebarName,
        pageName: mypagePageInnerName,
        categories: mypageInnerSidebar,
        catParam: activeSidebar,
      }
    : {
        categoryName: studyCategoryName,
        pageName: studyPageName,
        categories: studyCategory,
        catParam: "all", // 기본 카테고리
      };

  const handleDelete = async (postId: number) => {
    try {
      const ok = window.confirm("정말 삭제하시겠습니까?");
      if (!ok) return;

      await axios.delete(`/api/delete-post/${postId}`);
      alert("게시글이 삭제되었습니다.");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("게시글 삭제 실패");
    }
  };

  // 사이드바 콘텐츠
  const bringSidebar = () => {
    if (!creator) {
      // 개설자가 아닌 일반 유저
      // 일반 사용자는 기존 스터디 정보만 표시
      return bringStudyInfo();
    }

    // 개설자는 사이드바에 따라 다른 콘텐츠 표시
    switch (activeSidebar) {
      case "study-detail":
        return bringStudyInfo();
      case "end-study":
        return bringEndStudy();
      default:
        return bringStudyInfo();
    }
  };

  // 스터디 정보 렌더링 (기존 내용)
  const bringStudyInfo = () => (
    <div className="w-full max-w-4xl px-6 py-10 mx-auto">
      <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>

      <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-300">
        <span className="text-gray-600">작성자: {post.userNickname}</span>
        <div className="flex flex-wrap items-center gap-2">
          <span>
            {/*<button
                onClick={() => handleEdit(post.id)}
                className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                수정
              </button>*/}
            <button
              onClick={() => handleDelete(post.id)}
              className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              삭제
            </button>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-300">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-gray-600">{post.mainCategory}</span>
          {post.subCategories?.map((sub, idx) => (
            <span key={idx} className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full">
              {sub}
            </span>
          ))}
        </div>

        <span className="text-gray-600">마감까지 {getDDay(post.deadline)}</span>
      </div>

      <div className="flex items-center justify-between pb-2 mb-6 border-b border-gray-300">
        <span className="text-gray-700">
          현재 참여 인원: {post.currentCount} / {post.maxCount}
        </span>
        <span>
          <button
            onClick={async () => {
              const res = await axios.post(`/api/create-post/${post.id}/wish`);
              setPost(res.data);
            }}
          >
            찜하기 {post.wishCount}
          </button>
        </span>
      </div>

      <div className="p-6 mb-6 border border-gray-300 rounded-md">
        {/* <ReactMarkdown>{post.content}</ReactMarkdown> */}
        <CustomViewer contents={post.content} />
      </div>

      <button
        onClick={async () => {
          const res = await axios.post(`/api/create-post/${post.id}/join`);
          setPost(res.data);
        }}
      >
        참여하기
      </button>
    </div>
  );

  // 스터디 종료 렌더링
  const bringEndStudy = () => (
    <div className="w-full max-w-4xl px-6 py-10 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">스터디 종료</h2>
      <div className="p-6 border border-gray-300 rounded-md">
        <p>스터디 종료 기능은 추후 구현 예정입니다.</p>
        <button className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600">
          스터디 종료하기
        </button>
      </div>
    </div>
  );

  const pageComponent = () => {
    return (
      <div className="container flex flex-col items-center gap-8 mt-10">
        <div className="flex justify-between w-full py-4 max-w-7xl">
          <CategoryBreadcrumb
            pageTitle={sidebarConfig.pageName}
            catTitle={post?.title || "스터디"}
          />
        </div>
        {bringSidebar()}
      </div>
    );
  };

  return (
    <SidebarLayout
      catParam={sidebarConfig.catParam}
      categoryName={sidebarConfig.categoryName}
      categories={sidebarConfig.categories}
      children={pageComponent()}
      onTabChange={setActiveSidebar}
    />
  );
}
