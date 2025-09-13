import { differenceInHours, differenceInDays, isAfter } from "date-fns";

interface CountdownProps {
  deadline: Date;
}

export default function Countdown({ deadline }: CountdownProps) {
  const now = new Date(); // 현재 시간
  const endDate = new Date(deadline);

  // 특정 날짜가 현재 이후인지 체크
  // 마감일이 현재 날짜 이전이면 "마감" 표시
  if (!isAfter(endDate, now)) {
    return <span className="font-bold">마감</span>;
  }

  const daysLeft = differenceInDays(endDate, now); // 두 날짜 사이 일 차이
  const hoursLeft = differenceInHours(endDate, now); // 두 날짜 사이 시간 차이
  // console.log("daysLeft:", daysLeft, "hoursLeft:", hoursLeft);

  return (
    <span className="text-destructive font-bold">
      {daysLeft > 0
        ? // 일 차이가 0보다 크면 일 수 표시
          `${daysLeft}일 남음`
        : // 일 차이가 0 이하면 시간 차이 확인 (1일 이내)
          hoursLeft > 0
          ? // 시간 차이가 0보다 크면 시간 수 표시
            `${hoursLeft}시간 남음`
          : // 시간 차이가 0 이하면 "마감 임박" 표시 (1시간 이내)
            "마감 임박"}
    </span>
  );
}
