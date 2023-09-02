import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/main-page/MainPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import Room from "./pages/room/Room";
import { VideoChatContextProvider } from "./context/videoChatContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/room/:sessionId",
    element: <Room />,
  },
]);

const App = () => {
  return (
    <VideoChatContextProvider>
      <RouterProvider router={router} />
    </VideoChatContextProvider>
  );
};

export default App;
