import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function MyPage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    userName: "",
    userNickname: "",
    userId: "",
    userEmail: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 사용자 정보 로드
  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      // 실제로는 로그인된 사용자 정보를 가져와야 함
      // 임시로 로컬 스토리지에서 가져오거나 API 호출
      const response = await axios.get("/api/users/profile");
      setUserInfo(response.data);
    } catch (error) {
      console.error("사용자 정보 로드 실패:", error);
      // 임시 데이터 (실제로는 로그인 상태 확인 필요)
      setUserInfo({
        userName: "홍길동",
        userNickname: "길동이",
        userId: "hong123",
        userEmail: "hong@example.com",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
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

    if (!userInfo.userName) {
      checkErrors.userName = "이름을 입력하세요.";
    } else if (userInfo.userName.length < 2 || userInfo.userName.length > 30) {
      checkErrors.userName = "이름은 2자 이상 30자 이하로 입력하세요.";
    }

    if (!userInfo.userNickname) {
      checkErrors.userNickname = "닉네임을 입력하세요.";
    } else if (userInfo.userNickname.length < 2 || userInfo.userNickname.length > 10) {
      checkErrors.userNickname = "닉네임은 2자 이상 10자 이하로 입력하세요.";
    }

    if (!userInfo.userEmail) {
      checkErrors.userEmail = "이메일을 입력하세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.userEmail)) {
      checkErrors.userEmail = "올바른 이메일 형식을 입력하세요.";
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
      const response = await axios.put("/api/users/profile", userInfo);
      if (response.status === 200) {
        alert("프로필이 성공적으로 수정되었습니다!");
        setIsEditing(false);
      }
    } catch (error) {
      alert("프로필 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      // 실제로는 토큰 제거, 로컬 스토리지 클리어 등
      localStorage.removeItem("token");
      navigate("/log-in");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          {/* 헤더 */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">마이페이지</h1>
            <p className="text-gray-600">개인정보를 관리하고 계정 설정을 변경할 수 있습니다.</p>
          </div>

          {/* 프로필 정보 */}
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">프로필 정보</h2>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  수정하기
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 이름 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                {isEditing ? (
                  <div>
                    <Input
                      name="userName"
                      value={userInfo.userName}
                      onChange={handleInputChange}
                      placeholder="이름을 입력하세요"
                    />
                    {errors.userName && (
                      <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900">{userInfo.userName}</p>
                )}
              </div>

              {/* 닉네임 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">닉네임</label>
                {isEditing ? (
                  <div>
                    <Input
                      name="userNickname"
                      value={userInfo.userNickname}
                      onChange={handleInputChange}
                      placeholder="닉네임을 입력하세요"
                    />
                    {errors.userNickname && (
                      <p className="text-red-500 text-sm mt-1">{errors.userNickname}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900">{userInfo.userNickname}</p>
                )}
              </div>

              {/* 아이디 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">아이디</label>
                <p className="text-gray-900">{userInfo.userId}</p>
                <p className="text-xs text-gray-500 mt-1">아이디는 변경할 수 없습니다.</p>
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                {isEditing ? (
                  <div>
                    <Input
                      name="userEmail"
                      type="email"
                      value={userInfo.userEmail}
                      onChange={handleInputChange}
                      placeholder="이메일을 입력하세요"
                    />
                    {errors.userEmail && (
                      <p className="text-red-500 text-sm mt-1">{errors.userEmail}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900">{userInfo.userEmail}</p>
                )}
              </div>
            </div>

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
                    loadUserInfo(); // 원래 데이터로 되돌리기
                  }}
                >
                  취소
                </Button>
              </div>
            )}
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
                <p className="text-sm text-gray-600">참여</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
