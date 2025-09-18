import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomViewer from "./custom-viewer";
import "./post-detail.css";
import { categoryNameMap } from "@/components/common/mappings";
import { Button } from "@/components/ui/button";
import { useInfoStore } from "../account/info-store";
import { ArrowLeft } from "lucide-react";

// 백엔드 response dto
interface Post {
  id: number;
  userNickname: string;
  userPkId: number;
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
  const { userPkID } = useInfoStore();
  const userPkIdNum = userPkID ? Number(userPkID) : null;
  const navigate = useNavigate(); // 삭제 후 메인 화면으로 이동
  const [post, setPost] = useState<Post | null>(null);
  const [isWished, setIsWished] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    axios.get(`/api/create-post/${id}`).then(res => setPost(res.data));
  }, [id]);

  useEffect(() => {
    if (userPkIdNum && id) {
      axios
        .get(`/api/wish/check?userId=${userPkIdNum}&postId=${id}`)
        .then(res => setIsWished(res.data.isWished))
        .catch(console.error);
    }
  }, [userPkIdNum, id]);

  useEffect(() => {
    if (userPkIdNum && id) {
      axios
        .get(`/api/join/check?userId=${userPkIdNum}&postId=${id}`)
        .then(res => setIsJoined(res.data.isJoined))
        .catch(console.error);
    }
  }, [userPkIdNum, id]);

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
    if (!post || !userPkIdNum) return;

    try {
      if (isWished) {
        await axios.delete(`/api/wish?userId=${userPkIdNum}&postId=${post.id}`);
        setIsWished(false);
        setPost({ ...post, wishCount: post.wishCount - 1 });
      } else {
        await axios.post(`/api/wish?userId=${userPkIdNum}&postId=${post.id}`);
        setIsWished(true);
        setPost({ ...post, wishCount: post.wishCount + 1 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleJoin = async () => {
    if (!post || !userPkIdNum) return;

    try {
      if (isJoined) {
        const res = await axios.delete("/api/join", {
          params: { userId: userPkIdNum, postId: post.id },
        });
        alert(res.data.message);
        setIsJoined(false);
        setPost({ ...post, currentCount: post.currentCount - 1 });
      } else {
        const res = await axios.post("/api/join", null, {
          params: { userId: userPkIdNum, postId: post.id },
        });
        alert(res.data.message);
        setIsJoined(true);
        setPost({ ...post, currentCount: post.currentCount + 1 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const backStep = () => {
    navigate(-1);
  };

  if (!post) return <div>게시글을 불러오고 있습니다.</div>;

  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-6">
          <Button
            onClick={backStep}
            variant="outline"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            뒤로가기
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <span className="text-gray-600">작성자: {post.userNickname}</span>
          <div className="flex flex-wrap gap-2 items-center">
            {userPkIdNum !== post.userPkId && (
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
          {userPkIdNum !== post.userPkId && (
            <Button
              onClick={handleWish}
              className={`px-3 py-1 rounded ${isWished ? "bg-red-400 text-white" : "bg-gray-200"}`}
            >
              {isWished ? "위시 취소" : "위시 추가"} {post.wishCount}
            </Button>
          )}
        </div>

        <div className="border border-gray-300 rounded-md p-6 mb-6">
          <CustomViewer contents={post.content} />
        </div>
        {userPkIdNum !== post.userPkId && (
          <Button onClick={handleJoin}>{isJoined ? "스터디 탈퇴" : "참여하기"}</Button>
        )}
      </div>
    </div>
  );
}
