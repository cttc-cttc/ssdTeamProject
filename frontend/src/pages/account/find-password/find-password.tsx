import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useApiStore } from "@/components/common/api-store";

export default function FindPassword() {
  const { API_BASE } = useApiStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userEmail: "",
  });

  // 해당 필드별 에러 메시지를 저장
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 비밀번호 찾기 로딩 상태 -> 유저의 복수 클릭을 방지
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

  // 비밀번호 찾기 폼이 제출될 때 실행되는 함수
  const handleSubmit = async (e: React.FormEvent) => {
    // 크롬 기본 폼을 막아야한다. 그래야 새로고침이 안된다. 그래야 우리 스타일이 유지된다.
    e.preventDefault();

    // 유효성 검사 실행
    if (!validateForm()) {
      return;
    }

    // 비밀번호 찾기 처리 시작
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/api/users/password-reset/request`, formData);

      if (response.status === 200) {
        alert("비밀번호 재설정 링크가 이메일로 전송되었습니다. 이메일을 확인해주세요.");
        navigate("/log-in");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        alert(error.response.data || "비밀번호 찾기 중 오류가 발생했습니다. 다시 시도해주세요.");
      } else {
        alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      // 비밀번호 찾기 처리 종료
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-md w-full space-y-8 border-2 border-[#2c5536] rounded-lg p-6 shadow-2xl">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center">비밀번호 찾기</h2>
          <p className="mt-2 text-sm text-center ">
            가입하신 이메일 주소를 입력해주세요. <br /> 비밀번호 재설정 링크를 보내드립니다.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="userEmail" className="block text-sm font-medium">
                이메일 <span className="text-red-500">*</span>
              </label>
              <Input
                id="userEmail"
                name="userEmail"
                type="email"
                value={formData.userEmail}
                onChange={handleInputChange}
                placeholder="가입하신 이메일을 입력해주세요."
                className="mt-1"
              />
              {errors.userEmail && <p className="text-red-500 text-sm mt-1">{errors.userEmail}</p>}
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "전송 중..." : "비밀번호 재설정 링크 전송"}
            </Button>
          </div>

          <div className="text-center">
            비밀번호를 기억하셨나요?{" "}
            <Link
              to="/log-in"
              className="text-blue-600 hover:text-blue-800  dark:text-blue-400 dark:hover:text-blue-600"
            >
              로그인하기
            </Link>
          </div>

          <div className="text-center">
            계정이 없으신가요?{" "}
            <Link
              to="/sign-up"
              className="text-blue-600 hover:text-blue-800  dark:text-blue-400 dark:hover:text-blue-600"
            >
              회원가입하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
