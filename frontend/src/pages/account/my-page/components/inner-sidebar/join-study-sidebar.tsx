import SidebarLayout from "@/components/common/sidebar-layout";
import {
  mypageInnerJoinStudySidebar,
  mypageInnerJoinStudySidebarName,
  mypageJoinStudyPageInnerName,
} from "@/components/common/sidebar-menu-data";
import { useNavigate, useParams } from "react-router-dom";
import PostsDetail from "../../../../study-post/post-detail";
import CategoryBreadcrumb from "@/components/common/category-breadcrumb";
import GroupChat from "../inner-page/group-chat";

export default function JoinStudySidebar() {
  const { cat, id } = useParams<{ cat: string; id: string }>();
  const navigate = useNavigate();
  const validUrls = mypageInnerJoinStudySidebar.map(c => c.url);
  const innerSidebarParam = cat && validUrls.includes(cat) ? cat : "study-detail";
  const catTitle =
    mypageInnerJoinStudySidebar.find(c => c.url === innerSidebarParam)?.title ?? "스터디 상세";

  const sideBarChange = (bar: string) => {
    if (id) {
      navigate(`/my-page/join-study/${id}/${bar}`);
    }
  };

  const category = () => {
    switch (innerSidebarParam) {
      case "study-detail":
        return <PostsDetail />;
      case "group-chat":
        return <GroupChat />;
    }
  };

  const pageComponent = () => {
    return (
      <div className="relative flex flex-col w-full mt-10">
        <div className="absolute top-2 left-10">
          <CategoryBreadcrumb catTitle={catTitle} pageTitle={mypageJoinStudyPageInnerName} />
        </div>
        {category()}
      </div>
    );
  };

  return (
    <div>
      <SidebarLayout
        catParam={innerSidebarParam}
        categoryName={mypageInnerJoinStudySidebarName}
        categories={mypageInnerJoinStudySidebar}
        onTabChange={sideBarChange}
        children={pageComponent()}
      />
    </div>
  );
}
