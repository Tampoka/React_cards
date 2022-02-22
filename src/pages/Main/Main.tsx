import s from './Main.module.scss';
import {AppRoutes} from '../../app/AppRoutes';

const Main = () => {
    return (
        <div className={s.main}>
            <AppRoutes/>
        </div>
    );
};

export default Main;