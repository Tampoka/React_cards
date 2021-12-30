import {Navigate, Route, Routes} from "react-router-dom";
import TestingComponents from "../pages/Test/TestingComponents";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import Error404 from "../pages/Error404/Error404";
import s from "./AppRoutes.module.scss"
import RestorePassword from "../pages/RestorePassword/RestorePassword";
import NewPassword from "../pages/NewPassword/NewPassword";

export const Path = {
    home: '/',
    test: 'test',
    profile: 'profile',
    login: 'login',
    register: 'register',
    error: '404',
    restorePassword: 'restore-password',
    newPassword: 'new-password',
}

function AppRoutes() {
    return (
        <div className={s.content}>
            <Routes>
                <Route path={Path.home} element={<TestingComponents/>}/>
                <Route path={Path.test} element={<TestingComponents/>}/>
                <Route path={Path.profile} element={<Profile/>}/>
                <Route path={Path.login} element={<Login/>}/>
                <Route path={Path.register} element={<Register/>}/>
                <Route path={Path.error} element={<Error404/>}/>
                <Route path={Path.restorePassword} element={<RestorePassword/>}/>
                <Route path={Path.newPassword} element={<NewPassword/>}/>
                <Route path="*" element={<Navigate to="/404"/>}/>
            </Routes>
        </div>
    )
}

export default AppRoutes