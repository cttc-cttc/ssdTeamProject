import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function PasswordReset() {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // 해당 필드별 에러 메시지를 저장
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 비밀번호 변경 로딩 상태 -> 유저의 복수 클릭을 방지
  const [loading, setLoading] = useState(false);

  // URL에서 토큰 추출
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");

    if (!tokenFromUrl) {
      setErrors({ general: "유효하지 않은 링크입니다." });
      return;
    }

    setToken(tokenFromUrl);
  }, []);

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

  // 비밀번호 유효성 검사
  const validateForm = () => {
    const checkErrors: { [key: string]: string } = {};

    // 새 비밀번호 유효성 검사
    if (!formData.newPassword) {
      checkErrors.newPassword = "새 비밀번호를 입력하세요.";
    } else if (formData.newPassword.length < 8 || formData.newPassword.length > 18) {
      checkErrors.newPassword = "비밀번호는 8자 이상 18자 이하로 입력하세요.";
    } else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.newPassword)) {
      checkErrors.newPassword = "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.";
    }

    // 비밀번호 확인 유효성 검사
    if (!formData.confirmPassword) {
      checkErrors.confirmPassword = "비밀번호 확인을 입력하세요.";
    } else if (formData.newPassword !== formData.confirmPassword) {
      checkErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    // 동시 에러 저장
    setErrors(checkErrors);
    return Object.keys(checkErrors).length === 0;
  };

  // 비밀번호 변경 폼이 제출될 때 실행되는 함수
  const handleSubmit = async (e: React.FormEvent) => {
    // 크롬 기본 폼을 막아야한다. 그래야 새로고침이 안된다. 그래야 우리 스타일이 유지된다.
    e.preventDefault();

    // 유효성 검사 실행
    if (!validateForm()) {
      return;
    }

    // 비밀번호 변경 처리 시작
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/password-reset/confirm",
        {
          token: token,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다!");
        setTimeout(() => {
          navigate("/log-in");
        }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // 서버에서 응답을 받았지만 오류 상태
        alert(`비밀번호 재설정에 실패했습니다: ${error.response.data}`);
      } else if (axios.isAxiosError(error) && error.request) {
        // 요청이 전송되었지만 응답을 받지 못함
        alert("서버에 연결할 수 없습니다. 네트워크를 확인해주세요.");
      } else {
        // 요청 설정 중 오류 발생
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      // 비밀번호 변경 처리 종료
      setLoading(false);
    }
  };

  // 토큰이 없으면 에러 메시지 표시
  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 border-2 border-[#2c5536] rounded-lg p-6 shadow-2xl ">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-red-600 mb-4">오류</h2>
            <p className="text-gray-700 mb-6">유효하지 않은 링크입니다.</p>
            <Button onClick={() => navigate("/log-in")} className="w-full">
              로그인 페이지로 이동
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-md w-full space-y-8 border-2 border-[#2c5536] rounded-lg p-6 shadow-2xl ">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center">새 비밀번호 설정</h2>
          <p className="mt-2 text-sm text-center">새로운 비밀번호를 입력해주세요.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium">
                새 비밀번호 <span className="text-red-500">*</span>
              </label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="새 비밀번호를 입력해주세요."
                className="mt-1"
                disabled={loading}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
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
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "변경 중..." : "비밀번호 변경"}
            </Button>
          </div>

          <div className="text-center">
            비밀번호를 기억하셨나요?{" "}
            <Button
              variant="link"
              onClick={() => navigate("/log-in")}
              className="text-blue-600 hover:text-blue-800 p-0 h-auto  dark:text-blue-400 dark:hover:text-blue-600"
            >
              로그인하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
