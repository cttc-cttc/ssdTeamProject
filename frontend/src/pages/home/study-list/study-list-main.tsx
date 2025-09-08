import { studyCategory, studyCategoryName } from "@/components/common/sidebar-menu-data";
import SidebarLayout from "@/components/sidebar-layout";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "./image-frame";
import CategoryBreadcrumb from "@/components/common/category-breadcrumb";

const tempData = [
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content:
      "0월 0일 부산 00역 앞 000카페에서 일본어 n2 문법 스터디를 진행합니다. " +
      "음료는 개인별 주문하셔야 하며 스터디 시간은 최대 4시간으로 진행할 계획입니다.",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content:
      "0월 0일 서울 00역 앞 000카페에서 spring security 스터디를 진행합니다. " +
      "음료는 개인별 주문하셔야 하며 스터디 시간은 최대 4시간으로 진행할 계획입니다.",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content:
      "0월 0일 서울 00역 앞 000카페에서 spring security 스터디를 진행합니다. " +
      "음료는 개인별 주문하셔야 하며 스터디 시간은 최대 4시간으로 진행할 계획입니다.",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
  {
    userId: "사용자1",
    id: 1,
    title: "글 제목",
    content: "글 내용",
    createdAt: "2025-05-05",
    deadline: "2025-05-05",
  },
];

export default function StudyListMain() {
  const page = () => {
    return (
      <div className="container flex flex-col items-center mt-10 gap-6">
        <div className="flex w-full max-w-7xl justify-start py-4">
          <CategoryBreadcrumb />
        </div>
        {tempData.map(posts => (
          <div key={posts.id} className="flex w-full max-w-6xl shadow-xl">
            <div className="flex-5 flex border-1 border-accent bg-white dark:bg-border p-4">
              <div className="flex-4 flex flex-col gap-2">
                <div className="text-[#2c3e50] dark:text-accent-foreground text-xl font-bold">
                  {posts.title}
                </div>
                <div>
                  스터디 기간: {posts.createdAt} ~ {posts.deadline}
                </div>
                <div className="mb-10 text-muted-foreground">작성자: {posts.userId}</div>
                <div>{posts.content}</div>
              </div>

              <div className="flex-1 flex flex-col items-end gap-2">
                <div>카테고리: 어학/자격증</div>
                <div>
                  <Button variant="ssd_tag" className="border-1 border-foreground/30 text-sm">
                    #태그
                  </Button>
                </div>
                <div className="text-sm">모집 인원: 1/5</div>
              </div>
            </div>

            <div className="flex-2 flex">
              <ImageFrame />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <SidebarLayout
        categoryName={studyCategoryName}
        categories={studyCategory}
        children={page()}
      />
    </div>
  );
}
