import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useApiStore } from "@/components/common/api-store";

interface WithdrawProcessProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSuccess: () => void;
}

export default function WithdrawProcess({
  isOpen,
  onClose,
  userId,
  onSuccess,
}: WithdrawProcessProps) {
  const { API_BASE } = useApiStore();
  const [withdrawPassword, setWithdrawPassword] = useState("");
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);
  const [withdrawError, setWithdrawError] = useState<string>("");

  const handleWithdraw = async () => {
    if (!withdrawPassword) {
      setWithdrawError("비밀번호를 입력하세요.");
      return;
    }
    setWithdrawError("");
    setLoadingWithdraw(true);
    try {
      await axios.delete(`${API_BASE}/api/users/${userId}`, {
        data: {
          password: withdrawPassword,
        },
      });
      alert("회원탈퇴가 완료되었습니다.");
      onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = (error.response?.data as string) || "회원탈퇴에 실패했습니다.";
        setWithdrawError(msg);
      } else {
        setWithdrawError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setLoadingWithdraw(false);
    }
  };

  const handleClose = () => {
    setWithdrawError("");
    setWithdrawPassword("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-amber-50/60 flex items-center justify-center z-50 dark:bg-amber-50/10"
      onClick={handleClose}
    >
      {/* 외부 클릭시 취소 */}
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md dark:bg-[#0f1216]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">회원탈퇴</h3>
        </div>
        <p className="text-sm mb-4">
          정말 떠나시는 건가요?
          <br />
          SSD에는 수많은 스터디가 모여 있습니다!
        </p>
        <div>
          <label className="block text-sm font-medium mb-2">비밀번호 확인</label>
          <input
            type="password"
            value={withdrawPassword}
            onChange={e => setWithdrawPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {withdrawError && <p className="text-red-500 text-sm mt-2">{withdrawError}</p>}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={handleClose}>
            취소
          </Button>
          <Button onClick={handleWithdraw} disabled={loadingWithdraw}>
            {loadingWithdraw ? "탈퇴 중..." : "회원탈퇴"}
          </Button>
        </div>
      </div>
    </div>
  );
}
