import AppRoutes from '../../../app/AppRoutes';
import s from './Main.module.scss';

const Main = () => {
    return (
        <div className={s.main}>
            <AppRoutes/>
        </div>
    );
};

export default Main;