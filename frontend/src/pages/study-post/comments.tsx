import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useInfoStore } from "../account/info-store";

// 댓글 객체가 가지는 속성
type Comment = {
  id: number;
  postId: number;
  userPkId: number;
  userNickname: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

// 이 컴포넌트 쓸 때 넘겨야 하는 데이터
interface CommentsProps {
  postId: number;
  isEnded: boolean;
}

export default function Comments({ postId, isEnded }: CommentsProps) {
  const { userPkID, userNickname } = useInfoStore();
  const userPkIdNum = userPkID ? Number(userPkID) : null;

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await axios.get<Comment[]>(`/api/posts/${postId}/comments`);
      setComments(res.data);
    } catch (e) {
      console.error(e);
      alert("댓글을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

  const handleCreate = async () => {
    const content = newContent.trim();
    if (!content) return;

    try {
      const res = await axios.post<Comment>(`/api/posts/${postId}/comments`, {
        userPkId: userPkIdNum,
        userNickname,
        content,
      });
      setComments(prev => [...prev, res.data]);
      setNewContent("");
    } catch (e) {
      console.error(e);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const startEdit = (c: Comment) => {
    setEditingId(c.id);
    setEditingContent(c.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingContent("");
  };

  const saveEdit = async (commentId: number) => {
    const content = editingContent.trim();
    if (!content) return;

    try {
      const res = await axios.put<Comment>(`/api/posts/${postId}/comments/${commentId}`, {
        content,
      });
      setComments(prev => prev.map(c => (c.id === commentId ? res.data : c)));
      cancelEdit();
    } catch (e) {
      console.error(e);
      alert("댓글 수정에 실패했습니다.");
    }
  };

  const deleteComment = async (commentId: number) => {
    const ok = window.confirm("댓글을 삭제하시겠습니까?");
    if (!ok) return;

    try {
      await axios.delete(`/api/posts/${postId}/comments/${commentId}`);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (e) {
      console.error(e);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-6 pb-12">
      <h2 className="text-xl font-semibold mt-10 mb-4 border-b border-gray-300 pb-2">댓글</h2>

      {/* 목록 */}
      {loading ? (
        <div className="text-gray-500">댓글을 불러오고 있습니다.</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {comments.map(c => {
            const isMine = c.userPkId === userPkIdNum;
            const isEditing = editingId === c.id;

            return (
              <li key={c.id} className="py-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">{c.userNickname}</span>
                    {isMine && !isEditing && (
                      <div className="mt-1 flex gap-2">
                        <Button size="sm" onClick={() => startEdit(c)}>
                          수정
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteComment(c.id)}>
                          삭제
                        </Button>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>

                {isEditing ? (
                  <div className="flex gap-2 mt-1">
                    <textarea
                      value={editingContent}
                      onChange={e => setEditingContent(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded"
                    />
                    <Button size="sm" onClick={() => saveEdit(c.id)}>
                      저장
                    </Button>
                    <Button size="sm" variant="outline" onClick={cancelEdit}>
                      취소
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-800 whitespace-pre-wrap">{c.content}</p>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* 입력창 */}
      {!isEnded && userNickname && (
        <div className="flex gap-2 items-start mt-8 mb-6">
          <textarea
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            placeholder="댓글을 입력하세요."
            className="flex-1 px-3 py-2 border rounded"
            rows={3}
          />
          <div className="flex justify-end">
            <Button onClick={handleCreate} className="shrink-0">
              등록
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
