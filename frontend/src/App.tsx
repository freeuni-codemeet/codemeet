import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/main-page/MainPage";
import Room from "./pages/room/Room";

const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<MainPage />} />
      <Route path={"/room/:sessionId"} element={<Room />} />
    </Routes>
  );
};

export default App;
