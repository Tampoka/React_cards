import React from 'react';
import {useDispatch} from "react-redux";
import {setDecksCurrentPage, setDecksPerPage} from '../../../redux/decks-reducer';
import s from './Pagination.module.scss'
import SuperSelect from "../SuperSelect/SuperSelect";
type PropsType = {
    totalCount: number
    pageCount: number
    currentPage: number
    countPerPage: number[]
}
export const Pagination = React.memo(({totalCount,pageCount,currentPage,countPerPage}:PropsType) => {
    const dispatch=useDispatch()
        const onPageChangeHandler = (page: number) => dispatch(setDecksCurrentPage(page))
        const onSelectChangeHandler = (option: string) => dispatch(setDecksPerPage(Number(option)))
    return (
        <div className={s.paginationContainer}>

            <div>
                <span style={{paddingRight: 16}}> Show on page:</span>
                <SuperSelect options={countPerPage} onChangeOption={onSelectChangeHandler}/>
            </div>
        </div>
    );
}
)
