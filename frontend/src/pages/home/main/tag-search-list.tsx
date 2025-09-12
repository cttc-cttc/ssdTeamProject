import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import type { studyProps } from "./home-study-list";
import ListThumbnailFlex from "../components/list-thumbnail-flex";

interface SliceResponse<T> {
  content: T[];
  hasNext: boolean;
}

export default function TagSearchList({ tags }: { tags: string[] }) {
  const [studyPosts, setStudyPosts] = useState<studyProps[]>([]);
  const [lastId, setLastId] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerTarget = useRef<HTMLDivElement | null>(null);

  // ----------------------------
  // fetch 함수
  // ----------------------------
  const fetchPostsByTags = useCallback(async () => {
    if (loading || !hasNext || tags.length === 0) return;

    setLoading(true);
    try {
      const query = tags.map(tag => `tags=${encodeURIComponent(tag)}`).join("&");
      const lastIdQuery = lastId ? `&lastId=${lastId}` : "";
      const res = await axios.get<SliceResponse<studyProps>>(
        `/api/posts/search?${query}${lastIdQuery}&size=10`
      );

      const { content, hasNext: newHasNext } = res.data;
      console.log(res.data);

      // 중복 제거
      setStudyPosts(prev => {
        const merged = [...prev, ...content];
        return Array.from(new Map(merged.map(p => [p.id, p])).values());
      });

      setHasNext(newHasNext);
      if (content.length > 0) {
        setLastId(content[content.length - 1].id);
      }
    } catch (err) {
      console.error("태그 검색 실패:", err);
    } finally {
      setLoading(false);
    }
  }, [tags, lastId, loading, hasNext]);

  // ----------------------------
  // IntersectionObserver 등록
  // ----------------------------
  useEffect(() => {
    if (!observerTarget.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchPostsByTags();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [fetchPostsByTags]);

  // ----------------------------
  // 태그 변경 시 초기화
  // ----------------------------
  useEffect(() => {
    setStudyPosts([]);
    setLastId(null);
    setHasNext(true);
  }, [tags]);

  // 첫 로딩만 실행 (여기서는 fetchPostsByTags 의존성 제거)
  useEffect(() => {
    if (tags.length > 0) {
      fetchPostsByTags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  // ----------------------------
  // 렌더링
  // ----------------------------
  return (
    <div className="container flex flex-col items-center my-10 gap-8">
      <div className="flex flex-col w-full max-w-7xl items-center py-4 gap-8">
        <p className="flex w-full mt-6 py-4 text-2xl font-medium dark:text-foreground">
          태그 검색 결과
        </p>

        {studyPosts.map(post => (
          <Link
            key={post.id}
            to={`/posts/${post.id}`}
            className="w-full max-w-6xl hover:ring-3 ring-ring/50 transition-all duration-200 ease-in-out"
          >
            <ListThumbnailFlex posts={post} />
          </Link>
        ))}

        {/* 관찰 대상 */}
        <div ref={observerTarget} style={{ height: 1 }} />

        {loading && <p>불러오는 중...</p>}
        {!loading && studyPosts.length === 0 && <p>검색 결과가 없습니다.</p>}
        {!hasNext && studyPosts.length > 0 && <p>더 이상 결과가 없습니다.</p>}
      </div>
    </div>
  );
}
