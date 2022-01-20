import React from 'react';
import s from './Modal.module.scss'

type PropsType = {
    children?: React.ReactNode;
    visible: boolean
    setVisible: (value: boolean) => void
}
export const Modal = ({children, visible, setVisible}:PropsType) => {
    const rootClasses = [s.myModal]
    if (visible) {
        rootClasses.push(s.active)
    }
    return (
        <div className={rootClasses.join(' ')}
             onClick={() => setVisible(false)}>
            <div className={s.myModalContent}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

