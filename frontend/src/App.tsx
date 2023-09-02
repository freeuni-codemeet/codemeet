import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/main-page/MainPage";
import Room from "./pages/room/Room";
import { VideoChatContextProvider } from "./context/videoChatContext";
import SignInModal from "./pages/main-page/SignInModal";
import CreateRoomModal from "./pages/main-page/CreateRoomModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        path: "sign-in",
        element: <SignInModal/>
      },
      {
        path: "sign-up",
        element: <></>
      },
      {
        path: "create-room",
        element: <CreateRoomModal/>
      }
    ]
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
