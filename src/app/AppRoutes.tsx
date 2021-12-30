import {Route, Routes} from "react-router-dom";
import TestingComponents from "../pages/Test/TestingComponents";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import Error404 from "../pages/Error404/Error404";

export const Path = {
    home: '/',
    test: 'test',
    profile: 'profile',
    login: 'login',
    register: 'register',
}

function AppRoutes() {
    return (
        <Routes>
            <Route path={Path.home} element={<TestingComponents/>}/>
            <Route path={Path.test} element={<TestingComponents/>}/>
            <Route path={Path.profile} element={<Profile/>}/>
            <Route path={Path.login} element={<Login/>}/>
            <Route path={Path.register} element={<Register/>}/>
            <Route path="*" element={<Error404/>}/>
        </Routes>
    )
}

export default AppRoutes