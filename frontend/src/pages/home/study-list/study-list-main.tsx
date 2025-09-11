import {
  studyCategory,
  studyCategoryName,
  studyPageName,
} from "@/components/common/sidebar-menu-data";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "./image-frame";
import CategoryBreadcrumb from "@/components/common/category-breadcrumb";
import { Link, Navigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import CommonPagination from "../../../components/common/common-pagination";
import SidebarLayout from "@/components/common/sidebar-layout";
import SearchStudy, { type listDataType } from "./search-study";
import { categoryNameMap } from "@/components/common/mappings";
import axios from "axios";
import dayjs from "dayjs";

export default function StudyListMain() {
  const { cat, page } = useParams<{ cat: string; page?: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [studyList, setStudyList] = useState<listDataType[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  // page가 변할 때 currentPage 업데이트
  useEffect(() => {
    setCurrentPage(parseInt(page ?? "1", 10));
  }, [page]);

  // 카테고리, 페이지, 검색값이 변할 때마다 api 리스트 조회 처리
  const fetchData = useCallback(() => {
    const query: Record<string, string | number> = {
      category: cat ?? "all",
      keyword: searchQuery,
      page: currentPage - 1,
      size: 10, // 한 페이지에 보여줄 게시글 수
    };

    console.log("검색값:", searchQuery);

    axios
      .get("/api/studyList", { params: query })
      .then(res => {
        // console.log(res.data.content.length);
        setStudyList(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.error(err));
  }, [cat, currentPage, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!page) {
    return <Navigate to="/study/all/1" />;
  }

  // studyCategory의 url 목록
  const validUrls = studyCategory.map(c => c.url);

  // cat이 없거나 잘못된 값이면 all의 1페이지로 리다이렉트
  // cat이 있으면 cat의 1페이지로 리다이렉트
  if (
    !cat ||
    !validUrls.includes(cat) ||
    isNaN(currentPage) ||
    currentPage < 1 ||
    (totalPages > 0 && currentPage > totalPages) // ⭐️ totalPages가 0일 때는 무시
  ) {
    if (!cat) return <Navigate to="/study/all/1" />;
    else return <Navigate to={`/study/${cat}/1`} />;
  }

  const catParam = cat;
  const catTitle = studyCategory.find(cat => cat.url === catParam)?.title ?? "전체";

  // 리스트 랜더링
  const renderList = (list: listDataType[]) => {
    return (
      <>
        {list.map(posts => (
          <Link
            key={posts.id}
            to={`/posts/${posts.id}`}
            className="w-full max-w-6xl hover:ring-3 ring-ring/50 transition-all duration-200 ease-in-out"
          >
            <div className="flex shadow-xl">
              <div className="flex-5 flex border-1 border-accent bg-white dark:bg-muted/50 p-4">
                <div className="flex-4 flex flex-col gap-2">
                  <div className="text-[#2c3e50] dark:text-accent-foreground text-xl font-bold">
                    {posts.title}
                  </div>
                  <div>
                    스터디 기간: {dayjs(posts.createdAt).format("YYYY-MM-DD")} ~{" "}
                    {dayjs(posts.deadline).format("YYYY-MM-DD")}
                  </div>
                  <div className="mb-10 text-muted-foreground">작성자: {posts.userId}</div>
                  <div>{posts.content}</div>
                </div>

                <div className="flex-1 flex flex-col items-end gap-2">
                  <div>{categoryNameMap[posts.category]}</div>
                  <div>
                    <Button variant="ssd_tag" className="border-1 border-foreground/30 text-sm">
                      #태그
                    </Button>
                  </div>
                  <div className="text-sm">모집 인원: 1/5</div>
                </div>
              </div>

              <div className="flex-2 flex">
                <ImageFrame />
              </div>
            </div>
          </Link>
        ))}
      </>
    );
  };

  // 페이지 랜더링
  const pageComponent = () => {
    return (
      <div className="container flex flex-col items-center mt-10 gap-8">
        <div className="flex w-full max-w-7xl justify-between py-4">
          <CategoryBreadcrumb pageTitle={studyPageName} catTitle={catTitle} />
          <SearchStudy onSearch={setSearchQuery} />
        </div>
        {studyList === null ? (
          <div>로딩 중..</div>
        ) : studyList.length === 0 ? (
          <div>검색 결과가 없습니다.</div>
        ) : (
          <>
            {renderList(studyList)}
            {/* 페이지네이션 */}
            <div className="mb-8">
              <CommonPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div>
      <SidebarLayout
        catParam={catParam}
        categoryName={studyCategoryName}
        categories={studyCategory}
        children={pageComponent()}
      />
    </div>
  );
}
