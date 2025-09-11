import {
  studyCategory,
  studyCategoryName,
  studyPageName,
} from "@/components/common/sidebar-menu-data";
import CategoryBreadcrumb from "@/components/common/category-breadcrumb";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import SidebarLayout from "@/components/common/sidebar-layout";
import SearchStudy, { type listDataType } from "./search-study";
import axios from "axios";
import ListThumbnailFlex from "../components/list-thumbnail-flex";
import StudyListPagination from "../components/study-list-pagination";

export default function StudyListMain() {
  const { cat, page } = useParams<{ cat: string; page?: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [studyList, setStudyList] = useState<listDataType[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/study/${cat ?? "all"}/${page}`); // URL도 변경
  };

  // 카테고리, 페이지, 검색값이 변할 때마다 api 리스트 조회 처리
  const fetchData = useCallback(() => {
    const query: Record<string, string | number> = {
      category: cat ?? "all",
      keyword: searchQuery,
      page: currentPage - 1,
      size: 10, // 한 페이지에 보여줄 게시글 수
    };

    axios
      .get("/api/studyList", { params: query })
      .then(res => {
        setStudyList(res.data.content || []); // 결과 없으면 빈 배열
        setTotalPages(res.data.totalPages);
      })
      .catch(err => {
        console.error(err);
        setStudyList([]); // 에러 시에도 빈 배열로
      });
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

  // 검색 시 처리
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // 검색할 때 1페이지로 이동
    setStudyList([]); // 기존 데이터 제거
  };

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
            <ListThumbnailFlex posts={posts} />
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
          <SearchStudy onSearch={handleSearch} />
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
              <StudyListPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
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
