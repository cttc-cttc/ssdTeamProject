import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface ProfileSectionProps {
  userName: string;
  userId: string;
  userNickname: string;
  userEmail: string;
  setInfoStore: (data: {
    userName: string;
    userId: string;
    userNickname: string;
    userEmail: string;
  }) => void;
}

export default function ProfileSection({
  userName,
  userId,
  userNickname,
  userEmail,
  setInfoStore,
}: ProfileSectionProps) {
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
      // 닉네임 변경을 서버에 요청
      await axios.put(`/api/users/${userId}`, {
        userNickname: formData.userNickname,
      });

      // 성공 시 상태 업데이트
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

  return (
    <div className="px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">프로필 정보</h2>
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
  );
}
