import { Monitor, BriefcaseBusiness, UserRoundPen } from "lucide-react";

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
    icon: UserRoundPen,
  },
  {
    title: "개설 스터디",
    url: "open-study",
    icon: Monitor,
  },
  {
    title: "위시 스터디",
    url: "wish-study",
    icon: BriefcaseBusiness,
  },
];
