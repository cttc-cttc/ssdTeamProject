import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    userNickname: "",
    userId: "",
    userPassword: "",
    confirmPassword: "",
    userEmail: "",
  });

  // 해당 필드별 에러 메시지를 저장
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const validateForm = () => {
    const checkErrors: { [key: string]: string } = {};

    // 이름 유효성 검사
    if (!formData.userName) {
      checkErrors.userName = "이름을 입력하세요.";
    } else if (formData.userName.length < 2 || formData.userName.length > 30) {
      checkErrors.userName = "이름은 2자 이상 30자 이하로 입력하세요.";
    }

    // 닉네임 유효성 검사
    if (!formData.userNickname) {
      checkErrors.userNickname = "닉네임을 입력하세요.";
    } else if (formData.userNickname.length < 2 || formData.userNickname.length > 10) {
      checkErrors.userNickname = "닉네임은 2자 이상 10자 이하로 입력하세요.";
    }

    // 아이디 유효성 검사
    if (!formData.userId) {
      checkErrors.userId = "아이디를 입력하세요.";
    } else if (formData.userId.length < 5 || formData.userId.length > 15) {
      checkErrors.userId = "아이디는 5자 이상 15자 이하로 입력하세요.";
    }

    // 비밀번호 유효성 검사
    if (!formData.userPassword) {
      checkErrors.userPassword = "비밀번호를 입력하세요.";
    } else if (formData.userPassword.length < 8 || formData.userPassword.length > 18) {
      checkErrors.userPassword = "비밀번호는 8자 이상 18자 이하로 입력하세요.";
    } else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.userPassword)) {
      checkErrors.userPassword = "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.";
    }

    // 비밀번호 확인 유효성 검사
    if (!formData.confirmPassword) {
      checkErrors.confirmPassword = "비밀번호 확인을 입력하세요.";
    } else if (formData.userPassword !== formData.confirmPassword) {
      checkErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    // 이메일 유효성 검사
    if (!formData.userEmail) {
      checkErrors.userEmail = "이메일을 입력하세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
      checkErrors.userEmail = "올바른 이메일 형식을 입력하세요.";
    }

    // 동시 에러 저장
    setErrors(checkErrors);
    return Object.keys(checkErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // API 호출이 이 자리에 들어가야한다.
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">회원가입</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            SSD에 가입하고 즐거운 스터디 생활을 즐겨보세요!
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                이름 <span className="text-red-500">*</span>
              </label>
              <Input
                id="userName"
                name="userName"
                type="text"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="이름을 입력해주세요."
                className="mt-1"
              />
              {errors.userName && (
                <span className="text-red-500 text-sm mt-1">{errors.userName}</span>
              )}
            </div>

            <div>
              <label htmlFor="userNickname" className="block text-sm font-medium text-gray-700">
                닉네임 <span className="text-red-500">*</span>
              </label>
              <Input
                id="userNickname"
                name="userNickname"
                type="text"
                value={formData.userNickname}
                onChange={handleInputChange}
                placeholder="닉네임을 입력해주세요."
                className="mt-1"
              />
              {errors.userNickname && (
                <span className="text-red-500 text-sm mt-1">{errors.userNickname}</span>
              )}
            </div>

            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                아이디 <span className="text-red-500">*</span>
              </label>
              <Input
                id="userId"
                name="userId"
                type="text"
                value={formData.userId}
                onChange={handleInputChange}
                placeholder="5자 이상 15자 이하의 아이디를 입력해주세요."
                className="mt-1"
              />
              {errors.userId && <span className="text-red-500 text-sm mt-1">{errors.userId}</span>}
            </div>

            <div>
              <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <Input
                id="userPassword"
                name="userPassword"
                type="password"
                value={formData.userPassword}
                onChange={handleInputChange}
                placeholder="8자 이상 18자 이하의 비밀번호를 입력해주세요."
                className="mt-1"
              />
              {errors.userPassword && (
                <span className="text-red-500 text-sm mt-1">{errors.userPassword}</span>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                비밀번호 확인 <span className="text-red-500">*</span>
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="비밀번호를 다시 한 번 입력해주세요."
                className="mt-1"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm mt-1">{errors.confirmPassword}</span>
              )}
            </div>

            <div>
              <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
                이메일 <span className="text-red-500">*</span>
              </label>
              <Input
                id="userEmail"
                name="userEmail"
                type="email"
                value={formData.userEmail}
                onChange={handleInputChange}
                placeholder="example@email.com"
                className="mt-1"
              />
              {errors.userEmail && (
                <span className="text-red-500 text-sm mt-1">{errors.userEmail}</span>
              )}
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              회원가입
            </Button>
          </div>

          <div className="text-center">
            이미 계정이 있으신가요?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-800"
            >
              로그인하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
