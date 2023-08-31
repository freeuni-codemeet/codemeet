import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/main-page/MainPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import Room from "./pages/room/Room";
import { VideoChatContextProvider } from "./context/videoChatContext";

const App = () => {
  return (
    <VideoChatContextProvider>
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/room/:sessionId"} element={<Room />} />
      </Routes>
    </VideoChatContextProvider>
  );
};

export default App;
