import axios from "axios";
import React, { useState } from "react";
import CategoryInput from "./category-input";

function PostingForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [maxCount, setMaxCount] = useState("");

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
      const res = await axios.post("/api/posting", {
        title,
        content,
        mainCategory,
        subCategories,
        maxCount,
      });

      const newPost = res.data;

      window.location.href = `/posts/${newPost.id}`;
    } catch (error) {
      alert("게시글 작성에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="제목을 입력하세요."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        <CategoryInput onChange={handleCategory} />
      </div>
      <div>
        <label>참여인원</label>
        <input type="number" value={maxCount} onChange={e => setMaxCount(e.target.value)} />
        <span style={{ color: "red", marginLeft: "8px", fontSize: "13px" }}>
          * 최대 인원은 50명입니다.
        </span>
      </div>
      <div>
        <textarea
          placeholder="내용을 입력하세요."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <button type="submit">작성하기</button>
    </form>
  );
}

export default PostingForm;
