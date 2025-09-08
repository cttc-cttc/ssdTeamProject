import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInfoStore } from "../info-store";
import axios from "axios";

export default function MyPage() {
  const navigate = useNavigate();
  const { userName, userId, userNickname, userEmail, setInfoStore, clearInfoStore } =
    useInfoStore();

  const [formData, setFormData] = useState({
    userNickname: userNickname || "",
    userEmail: userEmail || "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // 에러 메시지 제거
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const checkErrors: { [key: string]: string } = {};

    if (!formData.userNickname) {
      checkErrors.userNickname = "닉네임을 입력하세요.";
    } else if (formData.userNickname.length < 2 || formData.userNickname.length > 10) {
      checkErrors.userNickname = "닉네임은 2자 이상 10자 이하로 입력하세요.";
    }

    setErrors(checkErrors);
    return Object.keys(checkErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // 닉네임 변경을 서버에 요청 (비밀번호 없이)
      await axios.put(`/api/users/${userId}`, {
        userNickname: formData.userNickname,
      });

      // 성공 시 전역 상태 갱신
      setInfoStore({
        userName: userName || "",
        userId: userId || "",
        userNickname: formData.userNickname,
        userEmail: userEmail || "",
      });

      alert("프로필이 성공적으로 수정되었습니다!");
      setIsEditing(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = (error.response?.data as string) || "닉네임 변경에 실패했습니다.";
        alert(msg);
      } else {
        alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      }
      // 실패 시 폼 값을 기존 닉네임으로 복원
      setFormData(prev => ({ ...prev, userNickname: userNickname || "" }));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      clearInfoStore();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="bg-white shadow rounded-lg border-2 border-[#3d6647] ">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">마이페이지</h1>
            <p className="text-gray-600">개인정보를 관리하고 계정 설정을 변경할 수 있습니다.</p>
          </div>

          {/* 프로필 정보 */}
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">프로필 정보</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 이름 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                <p className="text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500 mt-1">이름은 변경할 수 없습니다.</p>
              </div>

              {/* 닉네임 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">닉네임</label>
                {isEditing ? (
                  <div>
                    <Input
                      name="userNickname"
                      value={formData.userNickname}
                      onChange={handleInputChange}
                      placeholder="닉네임을 입력하세요"
                    />
                    {errors.userNickname && (
                      <p className="text-red-500 text-sm mt-1">{errors.userNickname}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-gray-900">{userNickname}</p>
                    <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                      수정하기
                    </Button>
                  </div>
                )}
                {/* 수정 버튼들 */}
                {isEditing && (
                  <div className="flex gap-3 mt-6">
                    <Button onClick={handleSave} disabled={loading}>
                      {loading ? "저장 중..." : "저장"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);

                        setFormData({
                          userNickname: userNickname || "",
                          userEmail: userEmail || "",
                        });
                      }}
                    >
                      취소
                    </Button>
                  </div>
                )}
              </div>

              {/* 아이디 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">아이디</label>
                <p className="text-gray-900">{userId}</p>
                <p className="text-xs text-gray-500 mt-1">아이디는 변경할 수 없습니다.</p>
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                <p className="text-gray-900">{userEmail}</p>
                <p className="text-xs text-gray-500 mt-1">이메일은 변경할 수 없습니다.</p>
              </div>
            </div>
          </div>

          {/* 계정 관리 */}
          <div className="px-6 py-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">계정 관리</h2>
            <div className="space-y-3">
              <Link
                to="/find-password"
                className="block w-full text-left px-4 py-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
              >
                비밀번호 변경
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>

          {/* 통계 정보 (선택사항) */}
          <div className="px-6 py-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">활동 통계</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-[#2c5536]">12</p>
                <p className="text-sm text-gray-600">참여중인 스터디</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-[#2c5536]">45</p>
                <p className="text-sm text-gray-600">참여했던 스터디</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-[#2c5536]">8</p>
                <p className="text-sm text-gray-600">참여예정 스터디</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
