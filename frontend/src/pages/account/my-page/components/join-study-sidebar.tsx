import SidebarLayout from "@/components/common/sidebar-layout";
import {
  mypageInnerJoinStudySidebar,
  mypageInnerSidebarName,
} from "@/components/common/sidebar-menu-data";
import { useNavigate, useParams } from "react-router-dom";
import PostsDetail from "../../../study-post/post-detail";
import GroupChat from "./group-chat";

export default function JoinStudySidebar() {
  const { cat, id } = useParams<{ cat: string; id: string }>();
  const navigate = useNavigate();
  const validUrls = mypageInnerJoinStudySidebar.map(c => c.url);
  const innerSidebarParam = cat && validUrls.includes(cat) ? cat : "study-detail";

  const sideBarChange = (bar: string) => {
    if (id) {
      navigate(`/my-page/join-study/${id}/${bar}`);
    }
  };

  const pageComponent = () => {
    switch (innerSidebarParam) {
      case "study-detail":
        return <PostsDetail />;
      case "group-chat":
        return <GroupChat />;
    }
  };

  return (
    <div>
      <SidebarLayout
        catParam={innerSidebarParam}
        categoryName={mypageInnerSidebarName}
        categories={mypageInnerJoinStudySidebar}
        onTabChange={sideBarChange}
        children={pageComponent()}
      />
    </div>
  );
}
