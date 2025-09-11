import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import HomeMain from "./pages/home/main/home-main";
import SignUp from "./pages/account/sign-up/sign-up";
import Page404 from "./pages/etc/page-404";
import LogIn from "./pages/account/log-in/log-in";
import FindPassword from "./pages/account/find-password/find-password";
import PasswordReset from "./pages/account/password-reset/password-reset";
import MyPage from "./pages/account/my-page/my-page";
import StudyListMain from "./pages/home/study-list/study-list-main";
import RootLayout from "./layouts/RootLayout";
import NoticeList from "./pages/notices/NoticeList";
import NoticeDetail from "./pages/notices/NoticeDetail";
import NoticeCreate from "./pages/notices/NoticeCreate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomeMain />} />
          {/* 홈 스터디 리스트 진입 시 비정상적인 url을 전부 /study/all 로 변경 */}
          <Route path="/study">
            <Route index element={<Navigate to="all" replace />} />
            <Route path=":cat" element={<StudyListMain />} />
          </Route>

          <Route path="sign-up" element={<SignUp />} />
          <Route path="log-in" element={<LogIn />} />
          <Route path="find-password" element={<FindPassword />} />
          <Route path="password-reset" element={<PasswordReset />} />
          <Route path="mypage" element={<MyPage />} />

          <Route element={<RootLayout />}>
            <Route path="/notices" element={<NoticeList />} />
            <Route path="/notices/:id" element={<NoticeDetail />} />
            <Route path="/notices/create" element={<NoticeCreate />} />
          </Route>

          <Route path="/*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
