import {
  studyCategory,
  studyCategoryName,
  studyPageName,
} from "@/components/common/sidebar-menu-data";
import CategoryBreadcrumb from "@/components/common/category-breadcrumb";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import SidebarLayout from "@/components/common/sidebar-layout";
import SearchStudy from "./search-study";
import axios from "axios";
import ListThumbnailFlex from "../components/list-thumbnail-flex";
import StudyListPagination from "../components/study-list-pagination";
import type { studyProps } from "../main/home-study-list";
import { SkeletonHomeStudy } from "../components/skeleton/skeleton-home-study";

export default function StudyListMain() {
  const { cat, page } = useParams<{ cat: string; page?: string }>();
  const navigate = useNavigate();

  const initialPage = page ? parseInt(page, 10) : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [studyList, setStudyList] = useState<studyProps[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState<number | null>(null); // 전체 페이지 수
  const [loading, setLoading] = useState(false);

  const validUrls = studyCategory.map(c => c.url);
  const catParam = cat && validUrls.includes(cat) ? cat : "all";
  const catTitle = studyCategory.find(c => c.url === catParam)?.title ?? "전체";

  // --- 페이지 버튼 클릭 시 URL도 동기화
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/study/${catParam}/${page}`);
  };

  // 카테고리, 페이지, 검색값이 변할 때마다 api 리스트 조회 처리
  const fetchData = useCallback(() => {
    setLoading(true);
    const query: Record<string, string | number> = {
      category: catParam,
      keyword: searchQuery,
      page: currentPage - 1,
      size: 10, // 한 페이지에 보여줄 게시글 수
    };

    axios
      .get("/api/studyList", { params: query })
      .then(res => {
        setStudyList(res.data.content || []); // 결과 없으면 빈 배열
        setTotalPages(res.data.totalPages || 1);
      })
      .catch(err => {
        console.error(err);
        setStudyList([]); // 에러 시에도 빈 배열로
        setTotalPages(1);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [catParam, currentPage, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- URL의 페이지가 유효한지 검사
  useEffect(() => {
    if (totalPages !== null) {
      // totalPages가 API에서 받아온 후만 실행
      // URL의 페이지 파라미터가 숫자가 아닌 경우 → NaN → 조건문에서 1페이지로 리다이렉트
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate(`/study/${catParam}/1`, { replace: true });
        setCurrentPage(1);
      }
    }
  }, [currentPage, totalPages, catParam, navigate]);

  // 검색 시 처리
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // 검색할 때 1페이지로 이동
    navigate(`/study/${catParam}/1`); // URL도 1페이지로 변경
    setStudyList([]); // 기존 데이터 제거
  };

  // 리스트 랜더링
  const renderList = (list: studyProps[]) => {
    return (
      <>
        {list.map(posts => (
          <Link
            key={posts.id}
            to={`/study/${catParam}/posts/${posts.id}`}
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
        {loading ? (
          <SkeletonHomeStudy />
        ) : (
          <>
            {studyList !== null && studyList.length > 0 && totalPages !== null && (
              <>
                {/* 리스트 랜더링 */}
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

            {studyList !== null && studyList.length === 0 && <div>검색 결과가 없습니다.</div>}
          </>
        )}
      </div>
    );
  };

  // --- URL 파라미터가 없으면 기본 페이지로 이동
  if (!page) return <Navigate to={`/study/${catParam}/1`} replace />;

  return (
    <SidebarLayout
      catParam={catParam}
      categoryName={studyCategoryName}
      categories={studyCategory}
      children={pageComponent()}
    />
  );
}
