import SidebarLayout from "@/components/common/sidebar-layout";
import { studyCategory, studyCategoryName } from "@/components/common/sidebar-menu-data";
import PostDetail from "@/pages/study-post/post-detail";
import { useParams } from "react-router-dom";

export default function StudyListDetail() {
  const { cat } = useParams<{ cat: string }>();
  const validUrls = studyCategory.map(c => c.url);
  const catParam = cat && validUrls.includes(cat) ? cat : "all";

  const pageComponent = () => {
    return <PostDetail />;
  };

  return (
    <div>
      <SidebarLayout
        catParam={catParam}
        categoryName={studyCategoryName}
        categories={studyCategory}
        children={pageComponent()}
      />
    </div>
  );
}
