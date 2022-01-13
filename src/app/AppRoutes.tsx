import {Route, Routes} from "react-router-dom";
import TestingComponents from "../pages/Test/TestingComponents";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Error404 from "../pages/Error404/Error404";
import s from "./AppRoutes.module.scss"
import RestorePassword from "../pages/RestorePassword/RestorePassword";
import NewPassword from "../pages/NewPassword/NewPassword";
import RegisterContainer from "../pages/Register/RegisterContainer";

export const routes = [
    {path: '/home', component: <TestingComponents/>, title: 'Home'},
    {path: '/test', component: <TestingComponents/>, title: 'TestingComponents'},
    {path: '/profile', component: <Profile/>, title: 'Profile'},
    {path: '/login', component: <Login/>, title: 'Login'},
    {path: '/register', component: <RegisterContainer/>, title: 'RegisterContainer'},
    {path: '/404', component: <Error404/>, title: 'Error404'},
    {path: 'restore-password', component: <RestorePassword/>, title: 'RestorePassword'},
    {path: 'new-password', component: <NewPassword/>, title: 'NewPassword'},
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