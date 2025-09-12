import { useEffect, useState } from "react";
import type { studyProps } from "./home-study-list";
import ListThumbnailFlex from "../components/list-thumbnail-flex";
import { Link } from "react-router-dom";
import axios from "axios";

export default function TagSearchList({ tags }: { tags: string[] }) {
  const [studyPosts, setStudyPosts] = useState<studyProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tags.length === 0) return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const query = tags.map(tag => `tags=${encodeURIComponent(tag)}`).join("&");
        const res = await axios.get(`/api/posts/search?${query}`);
        setStudyPosts(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("태그 검색 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [tags]);

  if (loading) return <p>검색 중...</p>;
  if (studyPosts.length === 0) return <p>검색 결과가 없습니다.</p>;

  return (
    <div>
      {studyPosts.map(posts => (
        <Link
          key={posts.id}
          to={`/posts/${posts.id}`}
          className="w-full max-w-6xl hover:ring-3 ring-ring/50 transition-all duration-200 ease-in-out"
        >
          <ListThumbnailFlex posts={posts} />
        </Link>
      ))}
    </div>
  );
}
