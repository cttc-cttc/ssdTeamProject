import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
import CustomViewer from "./custom-viewer";
import "./post-detail.css";

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

  useEffect(() => {
    axios.get(`/api/create-post/${id}`).then(res => setPost(res.data));
  }, [id]);

  const getDDay = (deadline: string) => {
    const end = new Date(deadline).getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `D-${diff}` : "마감";
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <span className="text-gray-600">작성자: {post.userNickname}</span>
          {/* 수정 / 삭제 버튼 */}
        </div>

        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-gray-600 font-medium">{post.mainCategory}</span>
            {post.subCategories?.map((sub, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {sub}
              </span>
            ))}
          </div>

          <span className="text-gray-600">마감까지 {getDDay(post.deadline)}</span>
        </div>

        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-6">
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

        <div className="border border-gray-300 rounded-md p-6 mb-6">
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
    </div>
  );
}
