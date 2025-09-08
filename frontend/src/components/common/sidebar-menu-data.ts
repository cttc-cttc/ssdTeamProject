import { Monitor, ScrollText, Languages, BriefcaseBusiness, CircleEllipsis } from "lucide-react";

/**
 * 홈의 스터디 리스트, 마이 페이지, 관리자 페이지에서 사용할 사이드 바의 메뉴를 커스텀하는 파일입니다
 *
 * ~~CategoryName : 카테고리 이름 (string 타입)
 *
 * title : 사이드 바에 표시할 텍스트
 * url : 사이드 바 메뉴를 클릭했을 때 이동할 url
 * icon : lucide icon
 *
 * icon 부분에는 본인이 쓰고 싶은 lucide icon을 지정하시면 됩니다
 * 다른 파일에서 불러와야 하니 const 앞에 export를 붙여주세요
 */
export const studyCategoryName = "스터디 카테고리";
export const studyCategory = [
  {
    title: "전체",
    url: "#",
    icon: ScrollText,
  },
  {
    title: "어학/자격증",
    url: "#",
    icon: Languages,
  },
  {
    title: "IT개발",
    url: "#",
    icon: Monitor,
  },
  {
    title: "취업",
    url: "#",
    icon: BriefcaseBusiness,
  },
  {
    title: "기타",
    url: "#",
    icon: CircleEllipsis,
  },
];
