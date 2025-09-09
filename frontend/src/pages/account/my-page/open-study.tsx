import { Button } from "@/components/ui/button";

export default function OpenStudy() {
  return (
    <>
      {/* 자체 헤더 */}
      <div className="px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">개설 스터디</h1>
        <p>개설한 스터디를 관리할 수 있습니다.</p>
      </div>

      {/* 기존 내용 */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">개설 스터디</h2>
          <Button asChild size="sm">
            <a href="/study">스터디 찾아보기</a>
          </Button>
        </div>
      </div>
    </>
  );
}
