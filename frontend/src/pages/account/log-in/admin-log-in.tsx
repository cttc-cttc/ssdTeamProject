import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminInfoStore } from "../admin-info-store";
import axios from "axios";

export default function AdminLogIn() {
  const navigate = useNavigate();
  const { setInfoStore } = useAdminInfoStore();

  const [formData, setFormData] = useState({
    adminId: "",
    adminPassword: "",
  });

  // 로그인 로딩 상태 -> 유저의 복수 클릭을 방지
  const [loading, setLoading] = useState(false);

  // 입력 필드에 값을 입력할 때마다 실행되는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // 로그인 폼이 제출될 때 실행되는 함수
  const handleSubmit = async (e: React.FormEvent) => {
    // 크롬 기본 폼을 막아야한다. 그래야 새로고침이 안된다. 그래야 우리 스타일이 유지된다.
    e.preventDefault();

    // 로그인 유효성 검사
    if (!formData.adminId || !formData.adminPassword) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    // 로그인 처리 시작
    setLoading(true);

    try {
      const response = await axios.post("/api/admin/login", formData);

      if (response.status === 200) {
        const data = response.data;

        // 로그인 성공 시, 전역 상태에 사용자 정보 저장
        setInfoStore({
          adminPkID: data.userId,
          adminName: data.adminName,
          adminId: data.adminId,
        });
        alert("로그인 성공!");
        //관리자 대시보드 생성 구역
        //관리자 대시보드 생성 구역
        //관리자 대시보드 생성 구역
        //관리자 대시보드 생성 구역
        //관리자 대시보드 생성 구역
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        alert(error.response.data || "로그인에 실패했습니다.");
      } else {
        alert("네트워크 오류가 발생했습니다.");
      }
    } finally {
      // 로그인 처리 종료
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-md w-full space-y-8 border-2 border-[#2c5536] rounded-lg p-6 shadow-2xl">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center">관리자 로그인</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "로그인 중..." : "로그인"}
            </Button>
          </div>

          <div className="text-center">
            <Link
              to="/admin-sign-up"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
            >
              관리자 계정생성
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
