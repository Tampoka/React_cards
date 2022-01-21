import {Route, Routes} from 'react-router-dom';
import Profile from '../pages/Profile/Profile';
import Error404 from '../pages/Error404/Error404';
import s from './AppRoutes.module.scss'
import RestorePassword from '../pages/Auth/RestorePassword/RestorePassword';
import {SignUp2} from '../pages/Auth/SignUp/SignUp2';
import {Login} from '../pages/Auth/Login/Login';
import TestingComponents from '../pages/Test/TestingComponents';
import {Decks} from '../pages/Decks/Decks';
import Cards from '../pages/Cards/Cards';
import {Alert} from '../common/components/InfoAlert/Alert';
import {CheckEmail} from '../pages/Auth/CheckEmail/CheckEmail';
import {NewPassword} from '../pages/Auth/NewPassword/NewPassword';

export const routes = [
    {path: '/', component: <TestingComponents/>, title: 'Home'},
    {path: '/profile', component: <Profile/>, title: 'Profile'},
    {path: '/login', component: <Login/>, title: 'Login'},
    {path: '/register', component: <SignUp2/>, title: 'Sign Up'},
    {path: '/404', component: <Error404/>, title: 'Error404'},
    {path: '/restore-password', component: <RestorePassword/>, title: 'Forgot'},
    {path: '/check-email', component: <CheckEmail/>, title: 'Check Email'},
    {path: '/new-password', component: <NewPassword/>, title: 'New Password'},
    {path: '/new-password/:token?', component: <NewPassword/>, title: 'New PasswordWithToken'},
    {path: '/decks', component: <Decks/>, title: 'Decks'},
    {path: '/cards', component: <Cards/>, title: 'Cards'},
]

function AppRoutes() {
    const routeComponents = routes.map(({path, component}) => <Route path={path} element={component} key={path}/>)
    return (
        <div className={s.content}>
            <Alert/>
            <Routes>
                {routeComponents}
            </Routes>
        </div>
    )
}

export default AppRoutes