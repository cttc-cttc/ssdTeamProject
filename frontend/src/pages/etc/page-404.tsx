import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <div className="w-6xl flex justify-center bg-[#466b52] mb-8 rounded-lg">
        <img src="/images/home/404page.png" alt="404 illustration" className="max-w-96" />
      </div>
      <p className="mb-2 text-2xl font-semibold">요청하신 페이지를 찾을 수 없습니다.</p>
      <p className="mb-8 text-muted-foreground">
        주소가 잘못되었거나, 더 이상 존재하지 않는 페이지예요.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link to="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
}
