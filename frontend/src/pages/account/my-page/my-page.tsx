import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useInfoStore } from "../info-store";
import {
  mypagePageName,
  mypageSidebar,
  mypageSidebarName,
} from "../../../components/common/sidebar-menu-data";
import CategoryBreadcrumb from "@/components/common/category-breadcrumb";
import SidebarLayout from "@/components/common/sidebar-layout";
import ProfileSection from "./components/profile-section";
import AccountSection from "./components/account-section";
import WithdrawProcess from "./components/withdraw-process";
import ActivitySection from "./components/activity-section";
import JoinStudy from "./join-study";
import OpenStudy from "./open-study";
import WishStudy from "./wish-study";
import { Button } from "@/components/ui/button";

export default function MyPage() {
  const navigate = useNavigate();
  const { userPkID, userName, userId, userNickname, userEmail, setInfoStore, clearInfoStore } =
    useInfoStore();

  // 회원탈퇴 모달 상태
  const [withdrawModal, setShowWithdrawModal] = useState(false);

  // 회원탈퇴 모달 핸들러
  const openWithdrawModal = () => {
    setShowWithdrawModal(true);
  };

  const closeWithdrawModal = () => {
    setShowWithdrawModal(false);
  };

  // 사이드바
  const { sidebar } = useParams<{ sidebar: string }>();

  // mypageSidebar의 url 목록
  const validUrls = mypageSidebar.map(c => c.url);

  // sidebar가 없거나 잘못된 값이면 manage-profile로 리다이렉트
  if (!sidebar || !validUrls.includes(sidebar)) {
    return <Navigate to="/my-page/manage-profile" replace />;
  }

  const sidebarTitle =
    mypageSidebar.find(sidebarItem => sidebarItem.url === sidebar)?.title || "프로필 관리";

  // 사이드바 경로에 따라 다른 컴포넌트 렌더링
  const renderContent = () => {
    if (sidebar === "join-study") {
      return <JoinStudy />;
    } else if (sidebar === "open-study") {
      return <OpenStudy />;
    } else if (sidebar === "wish-study") {
      return <WishStudy />;
    } else {
      // 기본값: 프로필 관리
      return (
        <>
          <div className="px-6 py-4 border-b">
            <h1 className="text-2xl font-bold">프로필 관리</h1>
            <p>개인정보를 관리하고 계정 설정을 변경할 수 있습니다.</p>
          </div>
          <ProfileSection
            userPkID={userPkID || ""}
            userName={userName || ""}
            userId={userId || ""}
            userNickname={userNickname || ""}
            userEmail={userEmail || ""}
            setInfoStore={setInfoStore}
          />
          <AccountSection onWithdrawClick={openWithdrawModal} />
          <ActivitySection />
        </>
      );
    }
  };

  const page = () => {
    return (
      <div className="container items-center py-8 m-10 mt-0">
        <div className="flex justify-start w-full py-4 max-w-7xl">
          <CategoryBreadcrumb catTitle={sidebarTitle} pageTitle={mypagePageName} />
        </div>
        <div
          className={`${sidebar === "join-study" || sidebar === "open-study" || sidebar === "wish-study" ? "max-w-full" : "max-w-4xl"} mx-auto px-4 sm:px-6 lg:px-8`}
        >
          <div className=" shadow rounded-lg border-2 border-[#3d6647]">
            {/* 사이드바 클릭에 따라서 변화*/}
            {renderContent()}

            {/* 회원 탈퇴 모달 */}
            <WithdrawProcess
              isOpen={withdrawModal}
              onClose={closeWithdrawModal}
              userId={userId || ""}
              onSuccess={() => {
                clearInfoStore();
                navigate("/");
              }}
            />
          </div>
        </div>
        {/* 채팅방 테스트 나중에 수정하세요 */}
        <Button asChild>
          <Link to="/testPage">임시 채팅방 입장</Link>
        </Button>
      </div>
    );
  };
  return (
    <div>
      <SidebarLayout
        catParam={sidebar}
        categoryName={mypageSidebarName}
        categories={mypageSidebar}
        children={page()}
      ></SidebarLayout>
    </div>
  );
}
