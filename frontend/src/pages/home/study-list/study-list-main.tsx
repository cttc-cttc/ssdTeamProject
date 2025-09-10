import {
  studyCategory,
  studyCategoryName,
  studyPageName,
} from "@/components/common/sidebar-menu-data";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "./image-frame";
import CategoryBreadcrumb from "@/components/common/category-breadcrumb";
import { Navigate, useParams } from "react-router-dom";
import { tempDataStudyList } from "./study-list-mock-data";
import { useEffect, useState } from "react";
import CommonPagination from "../../../components/common/common-pagination";
import SidebarLayout from "@/components/common/sidebar-layout";
import SearchStudy, { type listDataType } from "./search-study";
import { categoryNameMap } from "@/components/common/mappings";

export default function StudyListMain() {
  const { cat, page } = useParams<{ cat: string; page?: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredList, setFilteredList] = useState(tempDataStudyList); // ⭐ 필터링된 리스트 상태
  const [searchedResultList, setSearchedResultList] = useState<listDataType[] | null>(null);

  // page, cat 파라미터가 변할 때 currentPage 업데이트
  useEffect(() => {
    setCurrentPage(parseInt(page ?? "1", 10));

    if (cat && cat !== "all") {
      setFilteredList(tempDataStudyList.filter(data => data.category === cat));
    } else {
      setFilteredList(tempDataStudyList);
    }
  }, [page, cat]);

  if (!page) {
    return <Navigate to="/study/all/1" />;
  }

  // 한 페이지에 보여줄 게시글 수
  const itemsPerPage = 10;

  // 전체 페이지 수
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  // studyCategory의 url 목록
  const validUrls = studyCategory.map(c => c.url);

  // cat이 없거나 잘못된 값이면 all의 1페이지로 리다이렉트
  // cat이 있으면 cat의 1페이지로 리다이렉트
  if (
    !cat ||
    !validUrls.includes(cat) ||
    isNaN(currentPage) ||
    currentPage < 1 ||
    currentPage > totalPages
  ) {
    if (!cat) return <Navigate to="/study/all/1" />;
    else return <Navigate to={`/study/${cat}/1`} />;
  }

  // 현재 페이지에 해당하는 데이터 추출
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredList.slice(startIndex, endIndex);

  const catParam = cat;
  const catTitle = studyCategory.find(cat => cat.url === catParam)?.title ?? "전체";

  // 리스트 랜더링
  const renderList = (list: listDataType[]) => {
    return (
      <>
        {list.map((posts, index) => (
          <div key={index} className="flex w-full max-w-6xl shadow-xl">
            <div className="flex-5 flex border-1 border-accent bg-white dark:bg-muted/50 p-4">
              <div className="flex-4 flex flex-col gap-2">
                <div className="text-[#2c3e50] dark:text-accent-foreground text-xl font-bold">
                  {posts.title}
                </div>
                <div>
                  스터디 기간: {posts.createdAt} ~ {posts.deadline}
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
          <SearchStudy list={filteredList} onSearch={setSearchedResultList} />
        </div>
        {searchedResultList === null ? (
          // 검색 전 → 전체 목록
          renderList(currentItems)
        ) : searchedResultList.length === 0 ? (
          // 검색했지만 결과 없음
          <div>검색 결과가 없습니다.</div>
        ) : (
          // 검색 결과 있음
          renderList(searchedResultList)
        )}

        {/* 페이지네이션 */}
        <div className="mb-8">
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
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
