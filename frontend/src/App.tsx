import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import HomeMain from "./pages/home/main/home-main";
import SignUp from "./pages/account/sign-up/sign-up";
import AdminSignUp from "./pages/account/sign-up/admin-sign-up";
import Page404 from "./pages/etc/page-404";
import LogIn from "./pages/account/log-in/log-in";
import AdminLogIn from "./pages/account/log-in/admin-log-in";
import FindPassword from "./pages/account/find-password/find-password";
import PasswordReset from "./pages/account/password-reset/password-reset";
import MyPage from "./pages/account/my-page/my-page";
import StudyListMain from "./pages/home/study-list/study-list-main";
import RootLayout from "./pages/notices/RootLayout";
import NoticeList from "./pages/notices/NoticeList";
import NoticeDetail from "./pages/notices/NoticeDetail";
import NoticeCreate from "./pages/notices/NoticeCreate";
import PostingPage from "./pages/study-post/posting-page";
import PostDetail from "./pages/study-post/post-detail";

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import PostingForm from "./pages/study-post/posting-form";
import HiddenGame from "./pages/account/hidden-game";
import StudyListDetail from "./pages/home/study-list/study-list-detail";
import MyPageStudyListDetail from "./pages/account/my-page/components/my-page-study-list-detail";
import Inquiry from "./pages/home/inquiry/inquiry";
import Guide from "./pages/guide/guide";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomeMain />} />
          {/* 홈 스터디 리스트 진입 시 비정상적인 url을 전부 /study/all/1 로 변경 */}
          <Route path="/study">
            <Route index element={<Navigate to="/study/all/1" replace />} />
            <Route path=":cat/:page?" element={<StudyListMain />} />
            <Route path=":cat/posts/:id" element={<StudyListDetail />} />
          </Route>

          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/admin-sign-up" element={<AdminSignUp />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/admin-log-in" element={<AdminLogIn />} />
          <Route path="/find-password" element={<FindPassword />} />
          <Route path="/password-reset" element={<PasswordReset />} />

          <Route path="/my-page">
            <Route index element={<Navigate to="manage-profile" replace />} />
            <Route path=":sidebar" element={<MyPage />} />
            <Route path="open-study/:id/:cat" element={<MyPageStudyListDetail />} />
          </Route>

          <Route element={<RootLayout />}>
            <Route path="/notices" element={<NoticeList />} />
            <Route path="/notices/:id" element={<NoticeDetail />} />
            <Route path="/notices/create" element={<NoticeCreate />} />
          </Route>

          <Route path="/create" element={<PostingPage />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/edit/:id" element={<PostingForm />} />

          <Route path="/guide" element={<Guide />} />

          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/hidden-game" element={<HiddenGame />} />
          <Route path="/*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
