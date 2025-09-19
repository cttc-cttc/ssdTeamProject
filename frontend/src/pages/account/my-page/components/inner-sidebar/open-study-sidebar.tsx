import SidebarLayout from "@/components/common/sidebar-layout";
import {
  mypageInnerOpenStudySidebar,
  mypageInnerOpenStudySidebarName,
  mypageOpenStudyPageInnerName,
} from "@/components/common/sidebar-menu-data";
import { useParams, useNavigate } from "react-router-dom";
import PostsDetail from "../../../../study-post/post-detail";
import StudyEndPage from "../inner-page/study-end-page";
import CategoryBreadcrumb from "@/components/common/category-breadcrumb";
import GroupChat from "../inner-page/group-chat";

export default function OpenStudySidebar() {
  const { cat, id } = useParams<{ cat: string; id: string }>();
  const navigate = useNavigate();
  const validUrls = mypageInnerOpenStudySidebar.map(c => c.url);
  const innerSidebarParam = cat && validUrls.includes(cat) ? cat : "study-detail";
  const catTitle =
    mypageInnerOpenStudySidebar.find(c => c.url === innerSidebarParam)?.title ?? "스터디 상세";

  const sideBarChange = (bar: string) => {
    if (id) {
      navigate(`/my-page/open-study/${id}/${bar}`);
    }
  };

  const category = () => {
    switch (innerSidebarParam) {
      case "study-detail":
        return <PostsDetail />;
      case "end-study":
        return <StudyEndPage />;
      case "group-chat":
        return <GroupChat />;
    }
  };

  const pageComponent = () => {
    return (
      <div className="relative flex flex-col w-full mt-10">
        <div className="absolute top-2 left-10">
          <CategoryBreadcrumb catTitle={catTitle} pageTitle={mypageOpenStudyPageInnerName} />
        </div>
        {category()}
      </div>
    );
  };

  return (
    <div>
      <SidebarLayout
        catParam={innerSidebarParam}
        categoryName={mypageInnerOpenStudySidebarName}
        categories={mypageInnerOpenStudySidebar}
        onTabChange={sideBarChange}
        children={pageComponent()}
      />
    </div>
  );
}
