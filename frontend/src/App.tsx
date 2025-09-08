import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import HomeMain from "./pages/home/main/home-main";
import SignUp from "./pages/account/sign-up/sign-up";
import Page404 from "./pages/etc/page-404";
import LogIn from "./pages/account/log-in/log-in";
import FindPassword from "./pages/account/find-password/find-password";
import PasswordReset from "./pages/account/password-reset/password-reset";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomeMain />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="log-in" element={<LogIn />} />
          <Route path="find-password" element={<FindPassword />} />
          <Route path="password-reset" element={<PasswordReset />} />

          <Route path="/*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
