import s from './Main.module.scss';
import AppRoutes from '../../app/AppRoutes';

const Main = () => {
    return (
        <div className={s.main}>
            <div className={s.loader}>
                <AppRoutes/>
            </div>
        </div>
    );
};

export default Main;