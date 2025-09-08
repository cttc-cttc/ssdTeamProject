import SidebarLayout from "@/components/sidebar-layout";

const tempData = [
  { userId: "사용자1", id: 1, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 2, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 3, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 4, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 5, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 1, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 1, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 1, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 1, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 1, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 1, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 1, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 1, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 1, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 1, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 1, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 1, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 1, title: "글 제목", content: "글 내용", createdAt: "작성일" },
  { userId: "사용자1", id: 1, title: "글 제목", content: "글 내용", createdAt: "작성일" },
];

export default function StudyListMain() {
  const page = () => {
    return (
      <div className="container flex flex-col items-center mt-10">
        <h1>리스트</h1>
        {tempData.map(posts => (
          <div key={posts.id} className="w-full border-1 border-primary shadow-2xl p-4">
            <div>{posts.title}</div>
            <div>{posts.userId}</div>
            <div>{posts.content}</div>
            <div>{posts.createdAt}</div>
            <div>{posts.id}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="transition-colors duration-500 ease-in-out">
      <SidebarLayout children={page()} />
    </div>
  );
}
