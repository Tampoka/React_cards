import React from 'react';
import s from './Loader.module.css'

const Loader = () => {
    return (
        <div className={s.loader}>
            <span>Loading...</span>
        </div>
    );
};

export default Loader;