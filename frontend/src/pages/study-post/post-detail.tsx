import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
import CustomViewer from "./custom-viewer";
import "./post-detail.css";
import { categoryNameMap } from "@/components/common/mappings";
import { Button } from "@/components/ui/button";
import { useInfoStore } from "../account/info-store";

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
  const { userPkId, userNickname } = useInfoStore();
  const navigate = useNavigate(); // 삭제 후 메인 화면으로 이동
  const [post, setPost] = useState<Post | null>(null);
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    axios.get(`/api/create-post/${id}`).then(res => setPost(res.data));
  }, [id]);

  useEffect(() => {
    if (userPkId && id) {
      axios
        .get(`/api/wish/check?userId=${userPkId}&postId=${id}`)
        .then(res => setIsWished(res.data.isWished))
        .catch(console.error);
    }
  }, [userPkId, id]);

  const getDDay = (deadline: string) => {
    const end = new Date(deadline).getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `D-${diff}` : "마감";
  };

  const handleEdit = () => {
    navigate(`/edit/${post!.id}`, { state: post });
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

  const handleWish = async () => {
    console.log("post:", post, "userPkId:", userPkId); // ✅ 눌렀을 때 찍히는지 확인
    if (!post || !userPkId) {
      console.warn("조건 때문에 함수 종료됨");
      return;
    }
    console.log("handleWish 실행됨");

    try {
      if (isWished) {
        await axios.delete(`/api/wish?userId=${userPkId}&postId=${post.id}`);
        setIsWished(false);
        setPost({ ...post, wishCount: post.wishCount - 1 });
      } else {
        await axios.post(`/api/wish?userId=${userPkId}&postId=${post.id}`);
        setIsWished(true);
        setPost({ ...post, wishCount: post.wishCount + 1 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 참여하기 임시
  const handleJoin = async () => {
    if (!post) return;
    const res = await axios.post(`/api/create-post/${post.id}/join`);
    setPost(res.data);
  };

  if (!post) return <div>게시글을 불러오고 있습니다.</div>;

  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

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
          <Button
            onClick={handleWish}
            className={`px-3 py-1 rounded ${isWished ? "bg-red-400 text-white" : "bg-gray-200"}`}
          >
            {isWished ? "위시 취소" : "위시 추가"} {post.wishCount}
          </Button>
        </div>

        <div className="border border-gray-300 rounded-md p-6 mb-6">
          {/* <ReactMarkdown>{post.content}</ReactMarkdown> */}
          <CustomViewer contents={post.content} />
        </div>

        <div className="p-6 mb-6 border rounded-md">
          <CustomViewer contents={post.content} />
        </div>
        <Button onClick={handleJoin}>참여하기</Button>
      </div>
    </div>
  );
}
