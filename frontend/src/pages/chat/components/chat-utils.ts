import dayjs from "dayjs";

/**
 * 그룹 채팅방 메세지 타입
 */
export interface GroupChatMessage {
  roomId: string;
  sender: string;
  content: string;
  createdAt: Date;
  messageType: "TEXT" | "JOIN";
}

/**
 * 문의하기 메세지 타입
 */
export interface InquiryChatMessage {
  roomId: string;
  sender: string;
  content: string;
  createdAt: Date;
}

/**
 * 실제로 스크롤 가능한 자식 엘리먼트를 찾는 유틸
 */
export function findScrollableElement(root: HTMLElement | null): HTMLElement | null {
  if (!root) return null;
  // 우선 직접 자식들 중 overflowY가 auto/scroll 인 요소 찾기
  const candidates = root.querySelectorAll<HTMLElement>("*");
  for (const el of Array.from(candidates)) {
    const style = getComputedStyle(el);
    if (style.overflowY === "auto" || style.overflowY === "scroll") return el;
  }
  // 못 찾으면 root 자체를 사용
  return root;
}

/**
 * 스크롤 내리기
 */
export function scrollDown(rootRef: React.RefObject<HTMLDivElement | null>) {
  const root = rootRef.current;
  if (!root) return;

  const scrollEl = findScrollableElement(root);
  if (!scrollEl) return;

  // 디버그 로그 (문제 계속되면 이 로그값을 확인하세요)
  // console.log("scrollEl:", scrollEl, "scrollHeight:", scrollEl.scrollHeight, "clientHeight:", scrollEl.clientHeight, "overflowY:", getComputedStyle(scrollEl).overflowY);

  // 2RAF로 레이아웃/이미지 로드 안정화
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      try {
        scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: "smooth" });
      } catch {
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
    });
  });
}

/**
 * 메시지 시간 표시
 * messages.map 돌 때 이전 메시지의 createdAt 과 비교
 * 같은 분에 속한 메시지들은 전부 시간 숨김
 * 그 분의 마지막 메시지에만 시간 표시
 */
export const printTimeStamp = (
  messages: { createdAt: string | Date }[],
  index: number
): string | null => {
  const currentTime = dayjs(messages[index].createdAt).format("HH:mm");
  const nextTime =
    index < messages.length - 1 ? dayjs(messages[index + 1].createdAt).format("HH:mm") : null;

  // 다음 메시지와 같은 분이면 null, 마지막이거나 분이 바뀌면 시간 출력
  return currentTime === nextTime ? null : currentTime;
};

/**
 * 메시지의 createdAt으로 날짜 표시가 필요한지 판단
 */
export const printDateSeparator = (
  messages: { createdAt: string | Date }[],
  index: number
): string | null => {
  const currentDate = dayjs(messages[index].createdAt).format("YYYY.MM.DD");
  const prevDate = index > 0 ? dayjs(messages[index - 1].createdAt).format("YYYY.MM.DD") : null;

  // 첫 메시지거나 날짜가 이전 메시지와 다르면 separator 표시
  if (prevDate !== currentDate) {
    return currentDate;
  }

  return null;
};
