// 실제로 스크롤 가능한 자식 엘리먼트를 찾는 유틸
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

// 스크롤 내리기
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
