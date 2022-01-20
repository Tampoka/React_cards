import React from 'react';
import {useDispatch} from 'react-redux';
import {setDecksCurrentPage} from '../../../redux/decks-reducer';
import s from './PacksPagination.module.scss'
import {Pagination} from '../Pagination/Pagination';

type PropsType = {
    totalCount: number
    pageCount: number
    currentPage: number
    countPerPage: number[]
}
export const PacksPagination = React.memo(({totalCount, pageCount, currentPage, countPerPage}: PropsType) => {
        const dispatch = useDispatch()
        const onPageChangeHandler = (page: number) => {
            // debugger
            dispatch(setDecksCurrentPage(page));
        }
        // const onSelectChangeHandler = (option: string) => dispatch(setDecksPerPage(Number(option)));
        return (
            <div className={s.paginationContainer}>
                <div style={{marginTop: 30}}>
                    <Pagination totalCount={totalCount}
                                countPerPage={pageCount}
                                currentPage={currentPage}
                                onChange={onPageChangeHandler}/>
                    <div>
                        {(totalCount>=countPerPage[0])&&<span>Decks per page:</span>}
                        {/*<select options={countPerPage} onChangeOption={onSelectChangeHandler}/>*/}
                    </div>
                </div>
            </div>
        );
    }
)
