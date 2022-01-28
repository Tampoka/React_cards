import {FC, useEffect, useState} from 'react';
import SuperButton from '../SuperButton/SuperButton';
import s from './ScrollToTop.module.scss';

export const ScrollToTop: FC = () => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop
        scrolled > 300 ? setVisible(true) : setVisible(false)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible)
        return () => window.removeEventListener('scroll', toggleVisible)
    }, [])

    return <>{visible && <SuperButton className={s.scrollButton} onClick={scrollToTop} red>Up</SuperButton>}</>
}
