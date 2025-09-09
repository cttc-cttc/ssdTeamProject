interface ActivitySectionProps {
  participatedStudies?: number;
  createdStudies?: number;
  wishStudies?: number;
}

export default function ActivitySection({
  participatedStudies = 1,
  createdStudies = 2,
  wishStudies = 3,
}: ActivitySectionProps) {
  return (
    <div className="px-6 py-6 border-t">
      <h2 className="text-lg font-semibold mb-4">활동 통계</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center bg-[#f5f5dc] p-4 rounded-lg dark:bg-[#2c3e50]">
          <p>{participatedStudies}</p>
          <p>참여 스터디</p>
        </div>
        <div className="text-center bg-[#f5f5dc] p-4 rounded-lg dark:bg-[#2c3e50]">
          <p>{createdStudies}</p>
          <p>개설 스터디</p>
        </div>
        <div className="text-center bg-[#f5f5dc] p-4 rounded-lg dark:bg-[#2c3e50]">
          <p>{wishStudies}</p>
          <p>위시 스터디</p>
        </div>
      </div>
    </div>
  );
}
