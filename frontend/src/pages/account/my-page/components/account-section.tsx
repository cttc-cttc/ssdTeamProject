import { Link } from "react-router-dom";

interface AccountManagementSectionProps {
  onWithdrawClick: () => void;
}

export default function AccountManagementSection({
  onWithdrawClick,
}: AccountManagementSectionProps) {
  return (
    <div className="px-6 py-6 border-t">
      <h2 className="text-lg font-semibold mb-4">계정 관리</h2>
      <div className="space-y-3 bg-[#f5f5dc] p-4 rounded-lg dark:bg-[#2c3e50]">
        <Link
          to="/find-password"
          className="block w-full text-left font-semibold px-4 py-3 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
        >
          비밀번호 변경
        </Link>
        <button
          onClick={onWithdrawClick}
          className="block w-full text-left font-semibold px-4 py-3 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
}
