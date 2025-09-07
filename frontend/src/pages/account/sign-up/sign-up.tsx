import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

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

  // 회원 가입 로딩 상태 추가 -> 유저의 복수 클릭을 방지
  const [loading, setLoading] = useState(false);

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
      const response = await axios.post("/api/users/signUp", formData);

      if (response.status === 200) {
        alert("회원가입 성공!");
        navigate("/log-in");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        alert(error.response.data || "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      } else {
        alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      // 회원가입 처리 종료
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border-2 border-[#2c5536] rounded-lg p-6 shadow-2xl bg-[#ecf0f1]">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">회원가입</h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            SSD에 가입하고 다양한 스터디를 경험해보세요!
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
              {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
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
                <p className="text-red-500 text-sm mt-1">{errors.userNickname}</p>
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
                placeholder="아이디를 입력해주세요."
                className="mt-1"
              />
              {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId}</p>}
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
                placeholder="비밀번호를 입력해주세요."
                className="mt-1"
              />
              {errors.userPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.userPassword}</p>
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
                placeholder="비밀번호를 다시 입력해주세요."
                className="mt-1"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
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
                placeholder="이메일을 입력해주세요."
                className="mt-1"
              />
              {errors.userEmail && <p className="text-red-500 text-sm mt-1">{errors.userEmail}</p>}
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "가입 중..." : "회원가입"}
            </Button>
          </div>

          <div className="text-center">
            이미 계정이 있으신가요?{" "}
            <Link to="/log-in" className="text-blue-600 hover:text-blue-800">
              로그인하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
