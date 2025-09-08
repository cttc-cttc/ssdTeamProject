import axios from "axios";
import React, { useState } from "react";
import CategoryInput from "./categoryInput";

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
      <div></div>
      <div>maxCount</div>
      <div>content</div>
    </form>
  );
}
