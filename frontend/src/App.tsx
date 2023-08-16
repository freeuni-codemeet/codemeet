import {Routes, Route} from "react-router-dom";
import MainPage from "./pages/main-page/MainPage";
import RegisterPage from "./pages/register/RegisterPage"
import Room from "./pages/room/Room";


const App = () => {
    return (
        <Routes>
            <Route path={"/"} element={<MainPage/>}/>
            <Route path={"/register"} element={<RegisterPage/>}/>
            <Route path={"/room/:sessionId"} element={<Room/>}/>
        </Routes>
    )
}

export default App;