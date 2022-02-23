import React from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../redux/store';
import s from '../../Decks/DecksPagination/DecksPagination.module.scss';
import {Pagination} from '../../../common/components/Pagination/Pagination';
import SuperSelect from '../../../common/components/SuperSelect/SuperSelect';
import {setCardsCurrentPage, setCardsPerPage} from '../../../redux/cards-reducer';

type PropsType = {
    totalCount: number
    pageCount: number
    currentPage: number
    countPerPage: number[]

}

export const CardsPagination =React.memo( ({totalCount, pageCount, currentPage, countPerPage}:PropsType) => {
    const dispatch = useDispatch()
    const isLoading = useAppSelector<boolean>(state => state.app.isLoading)
    const onPageChangeHandler = (page: number) => {
        dispatch(setCardsCurrentPage(page));
    }
    const onSelectChangeHandler = (option: string|number) => dispatch(setCardsPerPage(Number(option)));
    return (
        <div className={s.paginationContainer}>
            <Pagination totalCount={totalCount}
                        countPerPage={pageCount}
                        currentPage={currentPage}
                        onChange={onPageChangeHandler}/>
            {totalCount >= countPerPage[0] &&
            <SuperSelect options={countPerPage} onChangeOption={onSelectChangeHandler} label={'Cards per page:'}
                         disabled={isLoading}/>}
        </div>
    );
})

