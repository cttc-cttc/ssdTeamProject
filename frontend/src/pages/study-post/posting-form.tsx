import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import CategoryInput from "./category-input";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import { useTheme } from "@/components/theme-provider";
import { useInfoStore } from "../account/info-store";

function PostingForm() {
  const { theme } = useTheme();
  const { userNickname } = useInfoStore();
  const { id } = useParams();
  const { state } = useLocation();

  const [title, setTitle] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [maxCount, setMaxCount] = useState<number>(2);
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    if (state) {
      setTitle(state.title);
      setContent(state.content);
      setMainCategory(state.mainCategory);
      setSubCategories(state.subCategories);
      setMaxCount(state.maxCount);
    } else if (id) {
      axios.get(`/api/create-post/${id}`).then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setMainCategory(res.data.mainCategory);
        setSubCategories(res.data.subCategories);
        setMaxCount(res.data.maxCount);
      });
    }
  }, [id, state]);

  useEffect(() => {
    if (editorRef.current) {
      const instance = editorRef.current.getInstance();
      if (instance.getMarkdown() !== content) {
        instance.setMarkdown(content);
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]); // 테마 바뀔 때마다 복구 content 값 넣으면 제대로 동작 안함
  // 수정 모드일 때 content가 바뀌면 Editor에 반영

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

  const handleCategory = (main: string, subs: string[]) => {
    setMainCategory(main);
    setSubCategories(subs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const editorInstance = editorRef.current?.getInstance();
    const markdownContent = editorInstance?.getMarkdown() || "";

    if (!title.trim()) {
      alert("제목을 입력하세요.");
      return;
    }

    if (!markdownContent.trim()) {
      alert("내용을 입력하세요.");
      return;
    }

    if (!mainCategory.trim()) {
      alert("카테고리를 선택하세요.");
      return;
    }

    if (maxCount < 2 || maxCount > 50) {
      alert("참여인원을 입력하세요.");
      return;
    }

    try {
      if (id) {
        await axios.put(`/api/update-post/${id}`, {
          title,
          content: markdownContent,
          mainCategory,
          subCategories,
          maxCount,
        });
        alert("게시글이 수정되었습니다.");
        navigate(`/posts/${id}`);
      } else {
        const res = await axios.post("/api/create-post", {
          userNickname,
          title,
          content: markdownContent,
          mainCategory,
          subCategories,
          maxCount,
        });

        const newPost = res.data;
        navigate(`/posts/${newPost.id}`);
      }
    } catch (error) {
      console.error(error);
      alert("게시글 작성에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 p-6 rounded-lg bg-white shadow">
      <div className="mb-5">
        <label className="inline-block w-20 font-medium">제목</label>
        <input
          type="text"
          placeholder="제목을 입력하세요."
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-[calc(100%-5rem)] px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <CategoryInput
          initialMain={mainCategory}
          initialSubs={subCategories}
          onChange={handleCategory}
        />
      </div>
      <div className="mb-5">
        <label className="inline-block w-20 font-medium">참여인원</label>
        <input
          type="text"
          value={maxCount}
          onChange={e => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              // 숫자만 허용
              setMaxCount(Number(value));
            }
          }}
          className="w-[calc(100%-5rem)] px-3 py-2 border rounded-md"
        />
        {(maxCount < 2 || maxCount > 50) && (
          <span className="text-red-500 text-sm ml-2">참여인원은 2 ~ 50명 사이로 입력하세요.</span>
        )}
      </div>
      <div className="mb-5">
        <Editor
          key={theme}
          initialValue={""}
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
        className="block w-32 mx-auto py-2 bg-green-800 text-white rounded-md font-bold hover:bg-green-700 transition"
      >
        {id ? "수정하기" : "작성하기"}
      </button>
    </form>
  );
}

export default PostingForm;
