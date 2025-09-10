import axios from "axios";
import React, { useState } from "react";
import CategoryInput from "./category-input";
import { useNavigate } from "react-router-dom";

function PostingForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [maxCount, setMaxCount] = useState("");

  const navigate = useNavigate();

  const handleCategory = (main: string, subs: string[]) => {
    setMainCategory(main);
    setSubCategories(subs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력하세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력하세요.");
      return;
    }

    if (!mainCategory.trim()) {
      alert("카테고리를 선택하세요.");
      return;
    }

    if (!maxCount.trim()) {
      alert("참여인원을 입력하세요.");
      return;
    }

    try {
      const res = await axios.post("/api/create-post", {
        title,
        content,
        mainCategory,
        subCategories,
        maxCount,
      });

      const newPost = res.data;

      navigate(`/posts/${newPost.id}`);
    } catch (error) {
      console.error(error);
      alert("게시글 작성에 실패했습니다.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "24px",
        borderRadius: "8px",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "inline-block", width: "80px" }}>제목</label>
        <input
          type="text"
          placeholder="제목을 입력하세요."
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{
            width: "calc(100% - 90px)",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
      </div>
      <div>
        <CategoryInput onChange={handleCategory} />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "inline-block", width: "80px" }}>참여인원</label>
        <input
          type="number"
          value={maxCount}
          onChange={e => setMaxCount(e.target.value)}
          style={{
            width: "calc(100% - 90px)",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
        <span style={{ color: "red", marginLeft: "8px", fontSize: "13px" }}>
          * 최대 인원은 50명입니다.
        </span>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <textarea
          placeholder="내용을 입력하세요."
          value={content}
          onChange={e => setContent(e.target.value)}
          style={{
            width: "100%",
            minHeight: "200px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            resize: "vertical",
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          display: "block",
          width: "120px",
          padding: "10px",
          margin: "20px auto 0",
          backgroundColor: "#2f4f36",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        작성하기
      </button>
    </form>
  );
}

export default PostingForm;
