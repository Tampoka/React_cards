import s from '../FormCommon.module.scss';
import {useAppSelector} from '../../../redux/store';
import emailIcon from '../../../assets/icons/icons8-email-open-96.png'

export const CheckEmail = () => {
    const email=useAppSelector<string>(state=>state.restorePassword.recoveryEmail)
    return (
        <div className={s.authContainer}>
            <h2>Learning Cards</h2>
            <div>
                <img src={emailIcon} alt="email icon"/>
            </div>
            <p className={s.sectionTitle}>Check your email</p>

            <p className={s.checkEmail}>We've sent an Email with instructions to <span className={s.userEmail}>{email}</span></p>
        </div>
    );
};

