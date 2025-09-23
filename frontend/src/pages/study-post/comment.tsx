/* import { useEffect, useState } from "react";
import { useInfoStore } from "../account/info-store";
import axios from "axios";

// 댓글 객체의 타입
type Comment = {
  id: number;
  postId: number;
  userNickname: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

// 현재 컴포넌트를 쓸 때 넘겨야 하는 것
interface CommentsProps {
  postId: number;
}

export default function Comment ({postId}: CommentsProps) {
    const {userNickname} = useInfoStore();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newContent, setNewContent] = useState("");

    const [loading, setLoading] = useState("");

    const fetchComments = async () => {
        try {
            const res = await axios.get<Comment[]>(`/api/posts/${postId}/comments`);
            setComments(res.data);
        } catch (error) {
            console.error("댓글 조회 실패", error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if(postId) fetchComments();
    }, [postId]);

    const handleCreate = async () => {
        const content = newContent.trim();
        if(!content) return ;

        try {
            const res = await axios.get.post<Comment>(`/api/posts/${postId}/comments`, {
                userNickname, content
            });

            setComments
        }
    }
}
    */
