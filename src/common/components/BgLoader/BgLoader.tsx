import React from 'react';
import s from './BgLoader.module.scss'

const BgLoader = () => {
    return (
        <div className={s.container}>
            <div className={s.loader}></div>
        </div>
    );
};

export default BgLoader;