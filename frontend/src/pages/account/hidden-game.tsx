import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const CHEAT_CODE = [
  "ArrowDown",
  "ArrowDown",
  "ArrowUp",
  "ArrowUp",
  // "ArrowLeft",
  // "ArrowRight",
  // "ArrowLeft",
  // "ArrowRight",
];

export default function ClashMiniGameCSS() {
  const navigate = useNavigate();

  const inputSequenceRef = useRef<string[]>([]);
  const [cheatActivated, setCheatActivated] = useState(false);

  // 수축 기믹 상태 (성공 횟수는 렌더링에 사용되지 않으므로 ref로 관리)
  const successCountRef = useRef(0);
  const failCountRef = useRef(0);
  const requiredSuccess = 10;

  // 키보드 입력 스팸 방지
  const lastKeyTsRef = useRef<number>(0);

  // 수축 기믹 설정 값
  const INNER_SIZE = 200; // px (지름)
  const OUTER_START_SIZE = 330; // px (지름)
  const OUTER_MIN_SIZE = INNER_SIZE; // px
  const COLLIDE_TOLERANCE = 20; // px (판정 완화)
  const SHRINK_SPEED = 3; // px per tick (느리게)

  const [outerSize, setOuterSize] = useState(OUTER_START_SIZE);
  const [requiredKey, setRequiredKey] = useState<string>("Q");
  const cycleScoredRef = useRef(false);
  // 실패 카운트는 UI에 사용하지 않아 제거

  // 컨테이너 참조 및 중심 원 위치 상태 (퍼센트 단위)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const [xBounds, setXBounds] = useState<{ min: number; max: number }>({ min: 5, max: 95 });

  // 헤더의 로고 오른쪽 끝과 로그인 버튼 왼쪽 끝을 기준으로 X 범위를 제한
  const computeXBounds = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    const logoImg = document.querySelector('a[href="/"] img');
    const loginBtn = document.querySelector('a[href="/log-in"]');

    let leftPx = containerRect.left + INNER_SIZE / 2;
    let rightPx = containerRect.right - INNER_SIZE / 2;

    if (logoImg instanceof HTMLElement) {
      const r = logoImg.getBoundingClientRect();
      leftPx = Math.max(leftPx, r.right + 8); // 여유 8px
    }
    if (loginBtn instanceof HTMLElement) {
      const r = loginBtn.getBoundingClientRect();
      rightPx = Math.min(rightPx, r.left - 8);
    }

    if (rightPx <= leftPx) {
      // 비정상 상황이면 기본 범위 사용
      setXBounds({ min: 5, max: 95 });
      return;
    }

    const minPercent = ((leftPx - containerRect.left) / containerRect.width) * 100;
    const maxPercent = ((rightPx - containerRect.left) / containerRect.width) * 100;
    setXBounds({ min: Math.max(0, minPercent), max: Math.min(100, maxPercent) });
  }, [INNER_SIZE]);

  // 치트코드 입력
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const prev = inputSequenceRef.current;
      const newSeq = [...prev, e.key].slice(-CHEAT_CODE.length);
      inputSequenceRef.current = newSeq;
      if (JSON.stringify(newSeq) === JSON.stringify(CHEAT_CODE)) {
        setCheatActivated(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 라운드 시작할 때 랜덤 위치 설정
  const rerollTargetPos = useCallback(() => {
    // X는 계산된 경계 내에서, Y는 10~90% 범위에서 랜덤
    const randomX = xBounds.min + Math.random() * Math.max(0, xBounds.max - xBounds.min);
    const randomY = Math.random() * 100;
    setTargetPos({ x: randomX, y: randomY });
  }, [xBounds]);

  // 초기 및 리사이즈 시 경계 재계산
  useEffect(() => {
    computeXBounds();
    const onResize = () => computeXBounds();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [computeXBounds]);

  // 수축 애니메이션 루프
  useEffect(() => {
    if (!cheatActivated) return;

    const keys = ["Q", "W", "E", "R"] as const;
    const rerollRequiredKey = () => {
      const next = keys[Math.floor(Math.random() * keys.length)];
      setRequiredKey(next);
    };
    rerollRequiredKey();
    rerollTargetPos(); // 위치도 랜덤으로 변경
    cycleScoredRef.current = false;
    setOuterSize(OUTER_START_SIZE);

    const interval = setInterval(() => {
      setOuterSize(prev => {
        const next = prev - SHRINK_SPEED;
        if (next <= OUTER_MIN_SIZE - COLLIDE_TOLERANCE * 2) {
          // 실패 간주 → 3회 누적 시 메인으로 이동
          failCountRef.current += 1;
          if (failCountRef.current >= 3) {
            navigate("/");
            return prev;
          }
          cycleScoredRef.current = false;
          rerollRequiredKey();
          rerollTargetPos();
          return OUTER_START_SIZE;
        }
        return next;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [
    cheatActivated,
    OUTER_START_SIZE,
    OUTER_MIN_SIZE,
    COLLIDE_TOLERANCE,
    SHRINK_SPEED,
    navigate,
    rerollTargetPos,
  ]);

  // 디버그 클릭 처리 제거됨

  // 키보드 타이밍 입력
  useEffect(() => {
    if (!cheatActivated) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (["Q", "W", "E", "R", "A", "S", "D", "F"].includes(key)) {
        e.preventDefault();
        if (e.repeat) return;
        const now = Date.now();
        if (now - lastKeyTsRef.current < 80) return;
        lastKeyTsRef.current = now;

        if (
          Math.abs(outerSize - INNER_SIZE) <= COLLIDE_TOLERANCE &&
          key === requiredKey &&
          !cycleScoredRef.current
        ) {
          cycleScoredRef.current = true;
          successCountRef.current += 1;
          if (successCountRef.current >= requiredSuccess) {
            alert("환영합니다. 관리자님!");
            navigate("/admin-log-in");
          }
          setOuterSize(OUTER_START_SIZE);
          const keys = ["Q", "W", "E", "R", "A", "S", "D", "F"] as const;
          setRequiredKey(keys[Math.floor(Math.random() * keys.length)]);
          rerollTargetPos();
          cycleScoredRef.current = false;
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cheatActivated, outerSize, requiredKey, requiredSuccess, navigate, rerollTargetPos]);

  return (
    <div
      className="text-center pt-12 transition-all duration-500 relative overflow-hidden 
                font-black tracking-widest italic drop-shadow-[2px_2px_6px_rgba(0,0,0,0.9)]"
    >
      {!cheatActivated && (
        <>
          <p>9와 3/4 승강장</p>
        </>
      )}

      {cheatActivated && (
        <>
          <h1 className="font-black tracking-widest italic drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
            9와 3/4 승강장
          </h1>

          {/* 수축 원 UI */}
          <div ref={containerRef} className="relative w-full h-[600px] my-6 mx-auto">
            {/* 중심(목표) 원 */}
            <div
              className="absolute rounded-full border-4 border-blue-500"
              style={{
                width: `${INNER_SIZE}px`,
                height: `${INNER_SIZE}px`,
                left: `${targetPos.x}%`,
                top: `${targetPos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* 수축하는 외곽 원 */}
            <div
              className={`absolute rounded-full transition-colors ${
                Math.abs(outerSize - INNER_SIZE) <= COLLIDE_TOLERANCE ? "border-8" : "border-4"
              } border-[var(--color-primary)]`}
              style={{
                width: `${outerSize}px`,
                height: `${outerSize}px`,
                left: `${targetPos.x}%`,
                top: `${targetPos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* 요구 키 표시 (기준 원 중앙) */}
            <div
              className="absolute text-2xl font-extrabold select-none"
              style={{
                left: `${targetPos.x}%`,
                top: `${targetPos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {requiredKey}
            </div>
          </div>
          {/* 헤더 글자 글로우 애니메이션 */}
          <style>{`
            @keyframes red-glow {
              0%, 100% { text-shadow: 0 0 6px rgba(255,0,0,0.5), 0 0 12px rgba(255,0,0,0.3); }
              50% { text-shadow: 0 0 14px rgba(255,0,0,0.8), 0 0 28px rgba(255,0,0,0.6); }
            }
          `}</style>
        </>
      )}
    </div>
  );
}
