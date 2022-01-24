import React, {useState} from 'react';
import s from './Sort.module.scss'

type PropsType = {
    sortBy: string
    sortCallback: (sortMethod: string) => void
    sortMethod?: string
}

export const Sort = ({sortBy, sortCallback, sortMethod}: PropsType) => {
    const [sort, setSort] = useState(false)

    // const onSortHandler = () => {
    //     setSortToggle(!sortToggle)
    //     // setIsActive(true)
    //     sortCallback(`${Number(sortToggle)}${sortBy}`)
    // }
    const onSortHandler = (value:boolean) => {
        setSort(value)
        // setIsActive(true)
        sortCallback(`${Number(sort)}${sortBy}`)
    }


    return (
        <div className={s.sort}>
            <button className={`${s.up} ${sort && s.active}`} onClick={()=>onSortHandler(true)}><i>▲</i></button>
            <button className={`${s.down} ${!sort && s.active}`} onClick={()=>onSortHandler(false)}><i>▼</i></button>
        </div>
    );
};

