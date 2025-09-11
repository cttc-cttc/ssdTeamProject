import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import CategoryInput from "./category-input";
import { useNavigate } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import { useTheme } from "@/components/theme-provider";

function PostingForm() {
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [maxCount, setMaxCount] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editorRef.current) {
      const instance = editorRef.current.getInstance();
      instance.setMarkdown(content); // or setMarkdown(content)
    }
  }, [theme]); // 테마 바뀔 때마다 복구 content 값 넣으면 제대로 동작 안함

  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);

  const handleCategory = (main: string, subs: string[]) => {
    setMainCategory(main);
    setSubCategories(subs);
  };

  const onUploadImage = async (blob: File, callback: (Url: string, altText: string) => void) => {
    try {
      const formData = new FormData();
      formData.append("file", blob);

      const res = await axios.post("/api/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = res.data.url;
      callback(imageUrl, "image");
    } catch (error) {
      console.log("이미지 업로드 실패: ", error);
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const editorInstance = editorRef.current?.getInstance();
    const content = editorInstance?.getMarkdown() || "";

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
        <Editor
          key={theme}
          initialValue={content}
          onChange={() => {
            const instance = editorRef.current?.getInstance();
            setContent(instance.getMarkdown()); // or getHTML()
          }}
          theme={theme === "dark" ? "dark" : "light"}
          ref={editorRef}
          previewStyle="vertical"
          height="400px"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          hideModeSwitch={true}
          toolbarItems={[["bold"], ["image"], ["ul", "ol"], ["link"]]}
          hooks={{
            addImageBlobHook: onUploadImage,
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
