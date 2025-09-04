import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import HomeMain from "./pages/home/main/home-main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomeMain />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
