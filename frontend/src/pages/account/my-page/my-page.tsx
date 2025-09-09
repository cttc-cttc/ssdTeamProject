import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInfoStore } from "../info-store";
import axios from "axios";
import { mypageSidebar, mypageSidebarName } from "../sidebar-menu-data";
import SidebarLayout from "@/components/sidebar-layout";
import CategoryBreadcrumb from "@/components/common/category-breadcrumb";

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

  // 회원탈퇴
  const [withdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawPassword, setWithdrawPassword] = useState("");
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);
  const [withdrawError, setWithdrawError] = useState<string>("");

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
      // 닉네임 변경을 서버에 요청
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

  // 회원탈퇴 모달
  const openWithdrawModal = () => {
    setWithdrawError("");
    setWithdrawPassword("");
    setShowWithdrawModal(true);
  };

  const closeWithdrawModal = () => {
    setShowWithdrawModal(false);
    setWithdrawPassword("");
    setWithdrawError("");
  };

  const handleWithdraw = async () => {
    if (!withdrawPassword) {
      setWithdrawError("비밀번호를 입력하세요.");
      return;
    }
    setWithdrawError("");
    setLoadingWithdraw(true);
    try {
      await axios.delete(`/api/users/${userId}`, {
        data: {
          password: withdrawPassword,
        },
      });
      alert("회원탈퇴가 완료되었습니다.");
      clearInfoStore();
      navigate("/");
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

  // 사이드바
  const { sidebar } = useParams<{ sidebar: string }>();

  // mypageSidebar의 url 목록
  const validUrls = mypageSidebar.map(c => c.url);

  // sidebar가 없거나 잘못된 값이면 manage-profile로 리다이렉트
  if (!sidebar || !validUrls.includes(sidebar)) {
    return <Navigate to="/my-page/manage-profile" replace />;
  }

  const sidebarParam = sidebar;
  const sidebarTitle = mypageSidebar.find(sidebar => sidebar.url === sidebarParam)?.title || "";

  const page = () => {
    return (
      <div className="container items-center py-8 m-10 mt-0">
        <div className="flex w-full max-w-7xl justify-start py-4">
          <CategoryBreadcrumb catTitle={sidebarTitle} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className=" shadow rounded-lg border-2 border-[#3d6647] ">
            <div className="px-6 py-4 border-b">
              <h1 className="text-2xl font-bold">마이페이지</h1>
              <p>개인정보를 관리하고 계정 설정을 변경할 수 있습니다.</p>
            </div>

            {/* 프로필 정보 */}
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold ">프로필 정보</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f5f5dc] p-3 rounded-lg dark:bg-[#2c3e50]">
                {/* 이름 */}
                <div>
                  <label className="block text-sm font-medium mb-2">이름</label>
                  <p>{userName}</p>
                  <p className="text-xs mt-1">이름은 변경할 수 없습니다.</p>
                </div>

                {/* 닉네임 */}
                <div>
                  <label className="block text-sm font-medium mb-2">닉네임</label>
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
                      <p className="text-xs text-gray-500 mt-1">
                        닉네임은 30일에 한 번만 변경할 수 있습니다.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <p>{userNickname}</p>
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
                  <label className="block text-sm font-medium mb-2">아이디</label>
                  <p>{userId}</p>
                  <p className="text-xs mt-1">아이디는 변경할 수 없습니다.</p>
                </div>

                {/* 이메일 */}
                <div>
                  <label className="block text-sm font-medium mb-2">이메일</label>
                  <p>{userEmail}</p>
                  <p className="text-xs mt-1">이메일은 변경할 수 없습니다.</p>
                </div>
              </div>
            </div>

            {/* 계정 관리 */}
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
                  onClick={openWithdrawModal}
                  className="block w-full text-left font-semibold px-4 py-3 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                >
                  회원탈퇴
                </button>
              </div>
            </div>

            {/* 회원 탈퇴 모달 */}
            {withdrawModal && (
              <div
                className="fixed inset-0 bg-amber-50/60 flex items-center justify-center z-50 dark:bg-amber-50/10"
                onClick={closeWithdrawModal}
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
                    <Button variant="outline" onClick={closeWithdrawModal}>
                      취소
                    </Button>
                    <Button onClick={handleWithdraw} disabled={loadingWithdraw}>
                      {loadingWithdraw ? "탈퇴 중..." : "회원탈퇴"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* 통계 정보 */}
            <div className="px-6 py-6 border-t">
              <h2 className="text-lg font-semibold mb-4">활동 통계</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                <div className="text-center bg-[#f5f5dc] p-4 rounded-lg dark:bg-[#2c3e50]">
                  <p>12</p>
                  <p>참여 스터디</p>
                </div>
                <div className="text-center bg-[#f5f5dc] p-4 rounded-lg dark:bg-[#2c3e50]">
                  <p>45</p>
                  <p>개설 스터디</p>
                </div>
                <div className="text-center bg-[#f5f5dc] p-4 rounded-lg dark:bg-[#2c3e50]">
                  <p>8</p>
                  <p>위시 스터디</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <SidebarLayout
        catParam={sidebarParam}
        categoryName={mypageSidebarName}
        categories={mypageSidebar}
        children={page()}
      />
    </div>
  );
}
