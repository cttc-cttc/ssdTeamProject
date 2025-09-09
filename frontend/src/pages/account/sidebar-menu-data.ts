import { UserRoundPen, Book, BookPlus, BookMarked } from "lucide-react";

export const mypageSidebarName = "마이 페이지 사이드바";
export const mypageSidebar = [
  {
    title: "프로필 관리",
    url: "manage-profile",
    icon: UserRoundPen,
  },
  {
    title: "참여 스터디",
    url: "party-study",
    icon: Book,
  },
  {
    title: "개설 스터디",
    url: "open-study",
    icon: BookPlus,
  },
  {
    title: "위시 스터디",
    url: "wish-study",
    icon: BookMarked,
  },
];
