import { Button } from "@/components/ui/button";

export default function WishStudy() {
  return (
    <>
      <div className="px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">위시 스터디</h1>
        <p>위시리스트에 추가한 스터디를 확인할 수 있습니다.</p>
      </div>

      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">위시 스터디</h2>
          <Button asChild size="sm">
            <a href="/study">스터디 찾아보기</a>
          </Button>
        </div>
      </div>
    </>
  );
}
