import SidebarLayout from "@/components/common/sidebar-layout";
import {
  mypageInnerWishStudySidebar,
  mypageInnerWishStudySidebarName,
  mypageWishStudyPageInnerName,
} from "@/components/common/sidebar-menu-data";
import { useNavigate, useParams } from "react-router-dom";
import PostsDetail from "../../../study-post/post-detail";
import CategoryBreadcrumb from "@/components/common/category-breadcrumb";

export default function WishStudySidebar() {
  const { cat, id } = useParams<{ cat: string; id: string }>();
  const navigate = useNavigate();
  const validUrls = mypageInnerWishStudySidebar.map(c => c.url);
  const innerSidebarParam = cat && validUrls.includes(cat) ? cat : "study-detail";
  const catTitle =
    mypageInnerWishStudySidebar.find(c => c.url === innerSidebarParam)?.title ?? "스터디 상세";

  const sideBarChange = (bar: string) => {
    if (id) {
      navigate(`/my-page/wish-study/${id}/${bar}`);
    }
  };

  const category = () => {
    switch (innerSidebarParam) {
      case "study-detail":
        return <PostsDetail />;
    }
  };

  const pageComponent = () => {
    return (
      <div className="relative flex flex-col w-full mt-10">
        <div className="absolute top-2 left-10">
          <CategoryBreadcrumb catTitle={catTitle} pageTitle={mypageWishStudyPageInnerName} />
        </div>
        {category()}
      </div>
    );
  };

  return (
    <div>
      <SidebarLayout
        catParam={innerSidebarParam}
        categoryName={mypageInnerWishStudySidebarName}
        categories={mypageInnerWishStudySidebar}
        onTabChange={sideBarChange}
        children={pageComponent()}
      />
    </div>
  );
}
