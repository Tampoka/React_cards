import AppRoutes from '../../../app/AppRoutes';
import s from './Main.module.scss';

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