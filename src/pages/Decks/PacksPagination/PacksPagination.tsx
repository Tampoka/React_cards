import React from 'react';
import {useDispatch} from 'react-redux';
import {setDecksCurrentPage, setDecksPerPage} from '../../../redux/decks-reducer';
import s from './PacksPagination.module.scss'
import {Pagination} from '../../../common/components/Pagination/Pagination';
import SuperSelect from '../../../common/components/SuperSelect/SuperSelect';
import {useAppSelector} from '../../../redux/store';

type PropsType = {
    totalCount: number
    pageCount: number
    currentPage: number
    countPerPage: number[]
}
export const PacksPagination = React.memo(({totalCount, pageCount, currentPage, countPerPage}: PropsType) => {
        const dispatch = useDispatch()
        const isLoading = useAppSelector<boolean>(state => state.app.isLoading)

        const onPageChangeHandler = (page: number) => {
            dispatch(setDecksCurrentPage(page));
        }
        const onSelectChangeHandler = (option: string) => dispatch(setDecksPerPage(Number(option)));
        return (
            <div className={s.paginationContainer}>
                <Pagination totalCount={totalCount}
                            countPerPage={pageCount}
                            currentPage={currentPage}
                            onChange={onPageChangeHandler}/>
                {totalCount >= countPerPage[0] &&
                <SuperSelect options={countPerPage} onChangeOption={onSelectChangeHandler} label={'Decks per page:'}
                             disabled={isLoading}/>}
            </div>
        );
    }
)
