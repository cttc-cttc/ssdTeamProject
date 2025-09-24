import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomViewer from "./custom-viewer";
import "./post-detail.css";
import { categoryNameMap } from "@/components/common/mappings";
import { Button } from "@/components/ui/button";
import { useInfoStore } from "../account/info-store";
import { ArrowLeft, Bookmark } from "lucide-react";
import { useApiStore } from "@/components/common/api-store";
import Comments from "./comments";

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
  isEnded: boolean;
}

export default function PostDetail() {
  const { API_BASE } = useApiStore();
  const { id } = useParams();
  const postId = id ? Number(id) : null; // 파라미터 타입 변경
  const { userPkID, userNickname } = useInfoStore();
  const userPkIdNum = userPkID ? Number(userPkID) : null;

  const navigate = useNavigate(); // 삭제 후 메인 화면으로 이동

  const [post, setPost] = useState<Post | null>(null);
  const [isWished, setIsWished] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/api/posts/${id}`).then(res => setPost(res.data));
  }, [id, API_BASE]);

  useEffect(() => {
    if (userPkIdNum && id) {
      axios
        .get(`${API_BASE}/api/wish/check?userId=${userPkIdNum}&postId=${id}`)
        .then(res => setIsWished(res.data.isWished))
        .catch(console.error);
    }
  }, [userPkIdNum, id, API_BASE]);

  useEffect(() => {
    if (userPkIdNum && id) {
      axios
        .get(`${API_BASE}/api/join/check?userId=${userPkIdNum}&postId=${id}`)
        .then(res => setIsJoined(res.data.isJoined))
        .catch(console.error);
    }
  }, [userPkIdNum, id, API_BASE]);

  // post 가 null 일 때 렌더링 중단, 값이 있을 때 하단 실행
  if (!post) {
    return <div>게시글을 불러오고 있습니다...</div>;
  }

  const getDDay = (deadline: string, isEnded: boolean) => {
    if (isEnded) return { text: "종료", isRed: true };

    const end = new Date(deadline).getTime();
    const now = new Date().getTime();
    const diff = Math.floor((end - now) / (1000 * 60 * 60 * 24));

    if (diff > 0) return { text: `마감까지 D-${diff}`, isRed: false };
    if (diff === 0) return { text: "오늘 마감", isRed: true };
    return { text: "마감", isRed: true };
  };

  const { text: dDayText, isRed } = getDDay(post.deadline, post.isEnded);

  const handleEdit = () => {
    navigate(`/edit/${post!.id}`, { state: post });
  };

  const handleDelete = async (postId: number) => {
    try {
      const ok = window.confirm("정말 삭제하시겠습니까?");
      if (!ok) return;

      await axios.delete(`${API_BASE}/api/posts/${postId}`);
      alert("게시글이 삭제되었습니다.");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("게시글 삭제 실패");
    }
  };

  const handleWish = async () => {
    if (!post) return;

    if (!userPkIdNum) {
      alert("로그인 후 이용해 주세요.");
      return;
    }

    try {
      if (isWished) {
        await axios.delete(`${API_BASE}/api/wish?userId=${userPkIdNum}&postId=${post.id}`);
        setIsWished(false);
        setPost({ ...post, wishCount: post.wishCount - 1 });
      } else {
        await axios.post(`${API_BASE}/api/wish?userId=${userPkIdNum}&postId=${post.id}`);
        setIsWished(true);
        setPost({ ...post, wishCount: post.wishCount + 1 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleJoin = async () => {
    if (!post) return;

    if (!userPkIdNum) {
      alert("로그인 후 이용해 주세요.");
      return;
    }

    try {
      if (isJoined) {
        const res = await axios.delete(`${API_BASE}/api/join`, {
          params: { userId: userPkIdNum, postId: post.id },
        });
        alert(res.data.message || "스터디 탈퇴 완료");
        setIsJoined(false);
        setPost({ ...post, currentCount: post.currentCount - 1 });
      } else {
        const res = await axios.post(`${API_BASE}/api/join`, null, {
          params: { userId: userPkIdNum, postId: post.id },
        });
        alert(res.data.message || "스터디 참여 완료");
        setIsJoined(true);
        setPost({ ...post, currentCount: post.currentCount + 1 });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          alert("모집 인원이 마감된 스터디입니다."); // 400 잘못된 요청
        } else {
          alert("참여 중 오류가 발생했습니다."); // 400 외 서버 에러
        }
      } else {
        alert("서버와 통신할 수 없습니다."); // 서버 연결 문제
      }
    }
  };

  // 뒤로가기
  const backStep = () => {
    navigate(-1);
  };

  if (!post) return <div>게시글을 불러오고 있습니다.</div>;

  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-15 mt-7">
          <Button
            onClick={backStep}
            variant="outline"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 " />
            뒤로가기
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <span className="text-gray-600">작성자: {post.userNickname}</span>
          <div className="flex flex-wrap gap-2 items-center">
            {userNickname === post.userNickname && (
              <span className="mt-1 flex gap-1">
                <Button size="sm" onClick={handleEdit}>
                  수정
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(post.id)}>
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

          <span className={`font-medium ${isRed ? "text-red-600" : "text-gray-600"}`}>
            {dDayText}
          </span>
        </div>

        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-6">
          <span className="text-gray-700">
            현재 참여 인원: {post.currentCount} / {post.maxCount}
          </span>
          {!post.isEnded &&
            new Date(post.deadline) > new Date() &&
            userPkIdNum !== post.userPkId && (
              <div className="flex text-sm">
                <Bookmark
                  onClick={handleWish}
                  className={`${isWished ? "text-yellow-500 fill-yellow-200" : "text-yellow-500"} hover:cursor-pointer`}
                />
                찜하기 {post.wishCount}
              </div>
            )}
        </div>

        <div className="border border-gray-300 rounded-md p-6 mb-6">
          <CustomViewer contents={post.content} />
        </div>
        {!post.isEnded && new Date(post.deadline) > new Date() && userPkIdNum !== post.userPkId && (
          <Button onClick={handleJoin}>{isJoined ? "스터디 탈퇴" : "참여하기"}</Button>
        )}
      </div>

      {postId && <Comments postId={postId} isEnded={post.isEnded} deadline={post.deadline} />}
    </div>
  );
}
