import SidebarLayout from "@/components/common/sidebar-layout";
import { mypageInnerSidebar, mypageInnerSidebarName } from "@/components/common/sidebar-menu-data";
import { useParams, useNavigate } from "react-router-dom";
import PostsDetail from "../../../study-post/post-detail";
import StudyEndPage from "./study-end-page";

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
    if (innerSidebarParam === "end-study") {
      return <StudyEndPage />;
    }
    return <PostsDetail />;
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
