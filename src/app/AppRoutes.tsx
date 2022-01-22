import {Navigate, Route, Routes} from 'react-router-dom';
import Profile from '../pages/Profile/Profile';
import Error404 from '../pages/Error404/Error404';
import s from './AppRoutes.module.scss'
import RestorePassword from '../pages/Auth/RestorePassword/RestorePassword';
import {SignUp2} from '../pages/Auth/SignUp/SignUp2';
import {Login} from '../pages/Auth/Login/Login';
import {Decks} from '../pages/Decks/Decks';
import Cards from '../pages/Cards/Cards';
import {Alert} from '../common/components/InfoAlert/Alert';
import {CheckEmail} from '../pages/Auth/CheckEmail/CheckEmail';
import {NewPassword} from '../pages/Auth/NewPassword/NewPassword';
import {ROUTES} from '../routes/routes';

function AppRoutes() {
    return (
        <div className={s.content}>
            <Alert/>
            <Routes>
                {/*<Route path='/' element={<Profile/>}/>*/}
                <Route path={ROUTES.PROFILE} element={<Profile/>}/>
                <Route path={`${ROUTES.CARDS}/:cardsPackId`} element={<Cards/>}/>
                <Route path={ROUTES.DECKS} element={<Decks/>}/>
                <Route path={ROUTES.LOGIN} element={<Login/>}/>
                <Route path={ROUTES.REG} element={<SignUp2/>}/>
                <Route path={ROUTES.FORGOT} element={<RestorePassword/>}/>
                <Route path={ROUTES.NEW_PASS} element={<NewPassword/>}/>
                <Route path={`${ROUTES.NEW_PASS}/:token`} element={<NewPassword/>}/>
                <Route path={ROUTES.CHECK_EMAIL} element={<CheckEmail/>}/>
                <Route path={ROUTES.ERROR} element={<Error404/>}/>
                <Route path='*' element={<Navigate to='/404' replace/>}/>
            </Routes>
        </div>
    )
}

export default AppRoutes