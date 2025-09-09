import { Button } from "@/components/ui/button";

export default function PartyStudy() {
  return (
    <>
      <div className="px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">참여 스터디</h1>
        <p>참여하고 있는 스터디를 확인할 수 있습니다.</p>
      </div>
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">참여 스터디</h2>
          <Button asChild size="sm">
            <a href="/study">스터디 찾아보기</a>
          </Button>
        </div>
      </div>
    </>
  );
}
