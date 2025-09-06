import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { Plus } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/components/theme-provider";

export default function Header() {
  const { theme } = useTheme();
  const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <div className="w-full sticky top-0 z-50 bg-background transition-colors duration-500 ease-in-out">
      <div className="relative flex items-center h-40 border-b-1 border-primary dark:border-foreground/30">
        <div className="flex flex-1 shrink-0">
          <Link to="/" className="w-80 h-35 flex items-center justify-center overflow-hidden ml-16">
            <img
              src={
                theme === "dark" || (theme === "system" && isSystemDark)
                  ? "/images/home/ssd_logo_transparent_dark.png"
                  : "/images/home/ssd_logo_transparent_light.png"
              }
              alt="home_logo_light"
            />
          </Link>
        </div>
        <div className="absolute flex gap-8 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <Button asChild variant="ssd_nav">
            <Link to="/about">소개</Link>
          </Button>
          <Button asChild variant="ssd_nav">
            <Link to="/guide">이용가이드</Link>
          </Button>
          <Button asChild variant="ssd_nav">
            <Link to="/study">스터디</Link>
          </Button>
          <Button asChild variant="ssd_nav">
            <Link to="/notice">공지사항</Link>
          </Button>
        </div>
        <div className="flex justify-end flex-1 gap-2 pr-16">
          <Button asChild variant="outline">
            <Link to="/sign-up">
              <span className="w-16 text-xs text-center">회원가입</span>
            </Link>
          </Button>
          <Button asChild variant="default">
            <Link to="/log-in">
              <span className="w-16 text-xs text-center">로그인</span>
            </Link>
          </Button>
          {/* 일단 글쓰기 버튼 임시 표시 */}
          {/* 나중에 로그인 후 표시하도록 변경 필요 */}
          <Button asChild variant="default">
            <Link to="/write">
              <span className="flex">
                <Plus />
                <Pencil />
              </span>
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
