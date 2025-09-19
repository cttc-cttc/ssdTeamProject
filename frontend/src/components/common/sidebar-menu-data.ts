import { Monitor, ScrollText, Languages, BriefcaseBusiness, CircleEllipsis } from "lucide-react";
import { UserRoundPen, Book, BookPlus, BookMarked, MessageCircle } from "lucide-react";

/**
 * 홈의 스터디 리스트, 마이 페이지, 관리자 페이지에서 사용할 사이드 바의 메뉴를 커스텀하는 파일입니다
 *
 * ~~CategoryName : 카테고리 이름 (string 타입)
 *
 * ~~PageName : 사이드 바가 있는 페이지의 이름 (BreadCrumb의 첫 번째에 들어감)
 *
 * ~~Category = [
 *   {
 *     title : 사이드 바에 표시할 텍스트
 *     url : 사이드 바 메뉴를 클릭했을 때 이동할 url
 *     icon : lucide icon
 *   }
 * ]
 *
 * icon 부분에는 본인이 쓰고 싶은 lucide icon을 지정하시면 됩니다
 * https://lucide.dev/icons/
 * 다른 파일에서 불러와야 하니 const 앞에 export를 붙여주세요
 */
export const studyCategoryName = "스터디 카테고리";
export const studyPageName = "최신 스터디";
export const studyCategory = [
  {
    title: "전체",
    url: "all",
    icon: ScrollText,
  },
  {
    title: "어학/자격증",
    url: "lang-cert", // language-certificates
    icon: Languages,
  },
  {
    title: "IT/개발",
    url: "it-dev", // it-development
    icon: Monitor,
  },
  {
    title: "취업",
    url: "career",
    icon: BriefcaseBusiness,
  },
  {
    title: "기타",
    url: "etc",
    icon: CircleEllipsis,
  },
];

// 마이 페이지 사이드 바
export const mypageSidebarName = "마이 페이지 사이드바";
export const mypagePageName = "마이 페이지";
export const mypageSidebar = [
  {
    title: "프로필 관리",
    url: "manage-profile",
    icon: UserRoundPen,
  },
  {
    title: "참여 스터디",
    url: "join-study",
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

// 마이 페이지 내부 - 참여 스터디
export const mypageInnerJoinStudySidebarName = "참여 스터디 사이드바";
export const mypageJoinStudyPageInnerName = "참여 스터디";
export const mypageInnerJoinStudySidebar = [
  {
    title: "스터디 상세",
    url: "study-detail",
    icon: Book,
  },
  {
    title: "그룹 채팅방",
    url: "group-chat",
    icon: MessageCircle,
  },
];

// 마이 페이지 내부 - 개설 스터디
export const mypageInnerOpenStudySidebarName = "개설 스터디 사이드바";
export const mypageOpenStudyPageInnerName = "개설 스터디";
export const mypageInnerOpenStudySidebar = [
  {
    title: "스터디 상세",
    url: "study-detail",
    icon: Book,
  },
  {
    title: "스터디 종료",
    url: "end-study",
    icon: BookPlus,
  },
  {
    title: "그룹 채팅방",
    url: "group-chat",
    icon: MessageCircle,
  },
];

// 마이 페이지 내부 - 위시 스터디
export const mypageInnerWishStudySidebarName = "위시 스터디 사이드바";
export const mypageWishStudyPageInnerName = "위시 스터디";
export const mypageInnerWishStudySidebar = [
  {
    title: "스터디 상세",
    url: "study-detail",
    icon: Book,
  },
];
