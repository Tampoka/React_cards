import {Route, Routes} from "react-router-dom";
import TestingComponents from "../pages/Test/TestingComponents";
import Profile from "../pages/Profile/Profile";
import Error404 from "../pages/Error404/Error404";
import s from "./AppRoutes.module.scss"
import RestorePassword from "../pages/RestorePassword/RestorePassword";
import NewPassword from "../pages/NewPassword/NewPassword";
import {SignUp} from "../pages/SignUp/SignUp";
import {Login} from "../pages/Login/Login";

export const routes = [
    {path: '/home', component: <TestingComponents/>, title: 'Home'},
    {path: '/test', component: <TestingComponents/>, title: 'Test'},
    {path: '/profile', component: <Profile/>, title: 'Profile'},
    {path: '/login', component: <Login/>, title: 'Login'},
    {path: '/register', component: <SignUp/>, title: 'Sign Up'},
    {path: '/404', component: <Error404/>, title: 'Error404'},
    {path: 'restore-password', component: <RestorePassword/>, title: 'Forgot'},
    {path: 'new-password', component: <NewPassword/>, title: 'New Password'},
]

function AppRoutes() {
    const routeComponents = routes.map(({path, component}) => <Route path={path} element={component} key={path}/>)
    return (
        <div className={s.content}>
            <Routes>
                {routeComponents}
            </Routes>
        </div>
    )
}

export default AppRoutes