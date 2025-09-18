import SidebarLayout from "@/components/common/sidebar-layout";
import { mypageInnerSidebar, mypageInnerSidebarName } from "@/components/common/sidebar-menu-data";
import { useParams, useNavigate } from "react-router-dom";
import PostsDetail from "../../../study-post/post-detail";
import StudyEndPage from "./study-end-page";
import GroupChat from "./group-chat";

export default function StudyListDetail() {
  const { cat, id } = useParams<{ cat: string; id: string }>();
  const navigate = useNavigate();
  const validUrls = mypageInnerSidebar.map(c => c.url);
  const innerSidebarParam = cat && validUrls.includes(cat) ? cat : "study-detail";

  const sideBarChange = (bar: string) => {
    if (id) {
      navigate(`/my-page/open-study/${id}/${bar}`);
    }
  };

  const pageComponent = () => {
    switch (innerSidebarParam) {
      case "study-detail":
        return <PostsDetail />;
      case "end-study":
        return <StudyEndPage />;
      case "group-chat":
        return <GroupChat />;
    }
  };

  return (
    <div>
      <SidebarLayout
        catParam={innerSidebarParam}
        categoryName={mypageInnerSidebarName}
        categories={mypageInnerSidebar}
        onTabChange={sideBarChange}
        children={pageComponent()}
      />
    </div>
  );
}
