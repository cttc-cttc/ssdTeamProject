import { categoryNameMap } from "@/components/common/mappings";
import { Button } from "@/components/ui/button";
import { useInfoStore } from "@/pages/account/info-store";
import CustomViewer from "@/pages/study-post/custom-viewer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

export default function PostsDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const { userNickname } = useInfoStore(); // 현재 사용자 정보 > 작성자
  const navigate = useNavigate();

  // 게시글 가져오기
  useEffect(() => {
    axios.get(`/api/create-post/${id}`).then(res => setPost(res.data));
  }, [id]);

  // 마감일 헬퍼 함수
  const getDDay = (deadline: string) => {
    const end = new Date(deadline).getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `D-${diff}` : "마감";
  };

  // 글 수정 페이지
  const handleEdit = () => {
    navigate(`/edit/${post!.id}`, { state: post });
  };

  // 글 삭제
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

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="w-full max-w-4xl px-6 py-10 mx-auto">
      <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>

      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
        <span className="text-gray-600">작성자: {post.userNickname}</span>
        <div className="flex flex-wrap gap-2 items-center">
          {userNickname === post.userNickname && (
            <span>
              <Button
                onClick={handleEdit}
                className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                수정
              </Button>
              <Button
                onClick={() => handleDelete(post.id)}
                className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                삭제
              </Button>
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-gray-600 font-medium">{categoryNameMap[post.mainCategory]}</span>
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
          {/* <Button
            onClick={handleWish}
            className={`px-3 py-1 rounded ${isWished ? "bg-red-400 text-white" : "bg-gray-200"}`}
          >
            {isWished ? "위시 취소" : "위시 추가"} {post.wishCount}
          </Button> */}
        </span>
      </div>

      <div className="p-6 mb-6 border border-gray-300 rounded-md">
        <CustomViewer contents={post.content} />
      </div>

      <Button
        onClick={async () => {
          const res = await axios.post(`/api/create-post/${post.id}/join`);
          setPost(res.data);
        }}
      >
        참여하기
      </Button>
    </div>
  );
}
