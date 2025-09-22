import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useApiStore } from "@/components/common/api-store";

export default function SignUp() {
  const { API_BASE } = useApiStore();
  const [formData, setFormData] = useState({
    adminName: "",
    adminId: "",
    adminPassword: "",
    confirmPassword: "",
  });

  // 해당 필드별 에러 메시지를 저장
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 입력 필드에 값을 입력할 때마다 실행되는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // 해당 필드 입력 시 에러 메시지 제거
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // 유효성 검사 폼
  const validateForm = () => {
    const checkErrors: { [key: string]: string } = {};

    // 이름 유효성 검사
    if (!formData.adminName) {
      checkErrors.adminName = "이름을 입력하세요.";
    } else if (formData.adminName.length < 2 || formData.adminName.length > 15) {
      checkErrors.adminName = "이름은 2자 이상 15자 이하로 입력하세요.";
    }

    // 아이디 유효성 검사
    if (!formData.adminId) {
      checkErrors.adminId = "아이디를 입력하세요.";
    } else if (formData.adminId.length < 5 || formData.adminId.length > 15) {
      checkErrors.adminId = "아이디는 5자 이상 15자 이하로 입력하세요.";
    }

    // 비밀번호 유효성 검사
    if (!formData.adminPassword) {
      checkErrors.adminPassword = "비밀번호를 입력하세요.";
    } else if (formData.adminPassword.length < 4 || formData.adminPassword.length > 18) {
      checkErrors.adminPassword = "비밀번호는 4자 이상 18자 이하로 입력하세요.";
    }

    // 비밀번호 확인 유효성 검사
    if (!formData.confirmPassword) {
      checkErrors.confirmPassword = "비밀번호 확인을 입력하세요.";
    } else if (formData.adminPassword !== formData.confirmPassword) {
      checkErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    // 동시 에러 저장
    setErrors(checkErrors);
    return Object.keys(checkErrors).length === 0;
  };

  // 회원 가입 로딩 상태 추가 -> 유저의 복수 클릭을 방지
  const [loading, setLoading] = useState(false);

  // 페이지 이동
  const navigate = useNavigate();

  // 회원가입 폼이 제출될 때 실행되는 함수
  const handleSubmit = async (e: React.FormEvent) => {
    // 크롬 기본 폼을 막아야한다. 그래야 새로고침이 안된다. 그래야 우리 스타일이 유지된다.
    e.preventDefault();

    // 유효성 검사 실행
    if (!validateForm()) {
      return;
    }

    // 회원가입 처리 시작
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/api/admin/signUp`, formData);

      if (response.status === 200) {
        alert("관리자 계정생성 성공!");
        navigate("/admin-log-in");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        alert(error.response.data || "관리자 계정생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      } else {
        alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      // 회원가입 처리 종료
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-md w-full space-y-8 border-2 border-[#2c5536] rounded-lg p-6 shadow-2xl">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center">관리자 계정생성</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="adminName" className="block text-sm font-medium">
                이름 <span className="text-red-500">*</span>
              </label>
              <Input
                id="adminName"
                name="adminName"
                type="text"
                value={formData.adminName}
                onChange={handleInputChange}
                placeholder="이름을 입력해주세요."
                className="mt-1"
              />
              {errors.adminName && <p className="text-red-500 text-sm mt-1">{errors.adminName}</p>}
            </div>

            <div>
              <label htmlFor="adminId" className="block text-sm font-medium">
                아이디 <span className="text-red-500">*</span>
              </label>
              <Input
                id="adminId"
                name="adminId"
                type="text"
                value={formData.adminId}
                onChange={handleInputChange}
                placeholder="아이디를 입력해주세요."
                className="mt-1"
              />
              {errors.adminId && <p className="text-red-500 text-sm mt-1">{errors.adminId}</p>}
            </div>

            <div>
              <label htmlFor="adminPassword" className="block text-sm font-medium">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <Input
                id="adminPassword"
                name="adminPassword"
                type="password"
                value={formData.adminPassword}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력해주세요."
                className="mt-1"
              />
              {errors.adminPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.adminPassword}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                비밀번호 확인 <span className="text-red-500">*</span>
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="비밀번호를 다시 입력해주세요."
                className="mt-1"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "가입 중..." : "관리자 계정생성"}
            </Button>
          </div>

          <div className="text-center">
            이미 계정이 있으신가요?{" "}
            <Link
              to="/admin-log-in"
              className="text-blue-600 hover:text-blue-800  dark:text-blue-400 dark:hover:text-blue-600"
            >
              로그인하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
