import SidebarLayout from "@/components/common/sidebar-layout";
import { mypageInnerSidebar, mypageInnerSidebarName } from "@/components/common/sidebar-menu-data";
import { useParams } from "react-router-dom";
import PostsDetail from "../../../study-post/post-detail";

export default function StudyListDetail() {
  const { cat } = useParams<{ cat: string }>();
  const validUrls = mypageInnerSidebar.map(c => c.url);
  const innerSidebarParam = cat && validUrls.includes(cat) ? cat : "study-detail";

  const pageComponent = () => {
    return <PostsDetail />;
  };

  return (
    <div>
      <SidebarLayout
        catParam={innerSidebarParam}
        categoryName={mypageInnerSidebarName}
        categories={mypageInnerSidebar}
        children={pageComponent()}
      />
    </div>
  );
}
