import  {ChangeEvent, useEffect, useState} from 'react';
import SuperInputText from '../SuperInputText/SuperInputText';
import s from './Search.module.scss'
import {useDispatch} from 'react-redux';
import {useDebounce} from '../../hooks/useDebounce';
import {fetchCardsPacks} from '../../../redux/decks-reducer';
import {useAppSelector} from '../../../redux/store';

export const Search = () => {
    const dispatch=useDispatch()
    const totalCount=useAppSelector<number>(state=>state.decks.cardPacksTotalCount)
    const [searchValue,setSearchValue]=useState('')
    const debouncedValue = useDebounce<string>(searchValue, 800)
    // const [resultsNum,setResultsNum]=useState(totalCount)

    const onSearchHandler= (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    useEffect(() => {
        dispatch(fetchCardsPacks({packName: debouncedValue}))
        // setResultsNum(totalCount)
    }, [debouncedValue,dispatch,totalCount])
    return (
        <label className={s.searchLabel}>
            Search for decks:
            <SuperInputText value={searchValue}
            onChange={onSearchHandler}/>
            <span>Results: {totalCount}</span>
        </label>
    );
};

