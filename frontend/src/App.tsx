import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/main-page/MainPage";
import Room from "./pages/room/Room";
import { VideoChatContextProvider } from "./context/videoChatContext";
import SignInModal from "./pages/main-page/SignInModal";
import CreateRoomModal from "./pages/main-page/CreateRoomModal";
import SignUpModal from "./pages/main-page/SignUpModal";
import { ExecuteContextProvider } from "./context/RoomContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        path: "sign-in",
        element: <SignInModal />,
      },
      {
        path: "sign-up",
        element: <SignUpModal />,
      },
      {
        path: "create-room",
        element: <CreateRoomModal />,
      },
    ],
  },
  {
    path: "/room/:sessionId",
    element: <Room />,
  },
]);

const App = () => {
  return (
    <ExecuteContextProvider>
        <VideoChatContextProvider>
          <RouterProvider router={router} />
        </VideoChatContextProvider>
    </ExecuteContextProvider>
  );
};

export default App;
