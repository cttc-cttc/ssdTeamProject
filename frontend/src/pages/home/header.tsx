import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Shield, Users, Settings } from "lucide-react";
import { Plus } from "lucide-react";
import { useInfoStore } from "../account/info-store";
import { useAdminInfoStore } from "../account/admin-info-store";
import { ModeToggle } from "@/components/common/mode-toggle";
import { useTheme } from "@/components/theme-provider";

export default function Header() {
  const { theme } = useTheme();
  const { adminPkID, adminName, clearInfoStore: clearAdminInfoStore } = useAdminInfoStore();
  const { userId, userNickname, clearInfoStore } = useInfoStore();
  const navigate = useNavigate();

  const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      clearInfoStore();
      navigate("/");
    }
  };

  const handleAdminLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      clearAdminInfoStore();
      navigate("/");
    }
  };

  // 로그인 상태 확인
  const isAdminLoggedIn = !!adminPkID;
  const isUserLoggedIn = !!userId;

  return (
    // transition-colors duration-500 ease-in-out
    <div className="w-full sticky top-0 z-50 bg-background">
      <div className="flex items-center h-40 border-b border-primary dark:border-foreground/30 px-16">
        {/* 좌측: 로고 */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center justify-center w-80 h-35">
            <img
              src={
                theme === "dark" || (theme === "system" && isSystemDark)
                  ? "/images/home/ssd_logo_transparent_dark.png"
                  : "/images/home/ssd_logo_transparent_light.png"
              }
              alt="home_logo_light"
              className="h-full object-contain"
            />
          </Link>
        </div>

        {/* 중앙: 네비게이션 */}
        <nav className="flex-1 flex justify-center gap-8">
          <Button asChild variant="ssd_nav">
            <Link to="/guide">이용가이드</Link>
          </Button>
          <Button asChild variant="ssd_nav">
            <Link to="/study/all">스터디</Link>
          </Button>
          <Button asChild variant="ssd_nav">
            <Link to="/notices">공지사항</Link>
          </Button>
          <Button asChild variant="ssd_nav">
            <Link to="/inquiry">문의하기</Link>
          </Button>
        </nav>

        {/* 우측: 사용자 영역 */}
        <div className="flex items-center gap-2">
          {isAdminLoggedIn ? (
            // 관리자 헤더
            <div className="flex flex-col gap-4 items-end">
              <div className="flex gap-2">
                <span className="hidden sm:flex items-center whitespace-nowrap text-red-600 font-semibold">
                  <Shield className="w-4 h-4 mr-1" />
                  관리자 {adminName}님
                </span>
                <ModeToggle />
              </div>
              <div className="flex gap-2 justify-end">
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin/dashboard">
                    <Settings className="w-4 h-4 mr-1" />
                    관리자 대시보드
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin/users">
                    <Users className="w-4 h-4 mr-1" />
                    사용자 관리
                  </Link>
                </Button>
                <Button onClick={handleAdminLogout} variant="outline" size="sm">
                  관리자 로그아웃
                </Button>
              </div>
            </div>
          ) : isUserLoggedIn ? (
            // 일반 사용자 헤더
            <div className="flex flex-col gap-4 items-end">
              <div className="flex gap-2">
                <span className="hidden sm:flex items-center whitespace-nowrap">
                  {userNickname || userId}님 스터디할 시간입니다!
                </span>
                <ModeToggle />
              </div>
              <div className="flex gap-2 justify-end">
                <Button asChild variant="outline" size="sm">
                  <Link to="/my-page">마이페이지</Link>
                </Button>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  로그아웃
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link to="/create">
                    <span className="flex items-center gap-1">
                      <Plus />
                      <Pencil />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            // 비로그인 헤더
            <div className="flex flex-col gap-4 items-end">
              <div className="flex gap-2">
                <span className="hidden sm:flex items-center whitespace-nowrap">
                  로그인 후 다양한 스터디를 경험해보세요!
                </span>
                <ModeToggle />
              </div>
              <div className="flex gap-2 justify-end">
                <Button asChild variant="outline" size="sm">
                  <Link to="/sign-up">회원가입</Link>
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link to="/log-in">로그인</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
