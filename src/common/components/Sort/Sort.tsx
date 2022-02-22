import React, {useState} from 'react';
import s from './Sort.module.scss'

type PropsType = {
    sortBy: string
    sortCallback: (sortMethod: string) => void
    sortMethod?: string
}

export const Sort = ({sortBy, sortCallback}: PropsType) => {
    const [sort, setSort] = useState(false)

    const onSortHandler = (value:boolean) => {
        setSort(value)
        // setIsActive(true)
        sortCallback(`${Number(sort)}${sortBy}`)
    }


    return (
        <div className={s.sort}>
            <span className={`${s.up} ${sort?s.active:""}`} onClick={()=>onSortHandler(true)}><i>▲</i></span>
            <span className={`${s.down} ${!sort?s.active:""}`} onClick={()=>onSortHandler(false)}><i>▼</i></span>
        </div>
    );
};

