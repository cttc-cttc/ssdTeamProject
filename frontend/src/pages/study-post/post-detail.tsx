import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
import CustomViewer from "./custom-viewer";
import "./post-detail.css";

interface Post {
  id: number;
  title: string;
  category: string;
  currentCount: number;
  maxCount: number;
  content: string;
}

export default function PostDetail() {
  // 기타 기능 넣어야 됨 일단 조회만
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    axios.get(`/api/create-post/${id}`).then(res => setPost(res.data));
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <span className="text-gray-600">#{post.category}</span>
          <span className="text-gray-600">마감까지 D-29</span>
        </div>
        <div className="border-b border-gray-300 pb-2 mb-6">
          <span className="text-gray-700">
            현재 참여 인원: {post.currentCount} / {post.maxCount}
          </span>
        </div>
        <div className="border border-gray-300 rounded-md p-6 mb-6">
          {/* <ReactMarkdown>{post.content}</ReactMarkdown> */}
          <CustomViewer contents={post.content} />
        </div>
      </div>
    </div>
  );
}
