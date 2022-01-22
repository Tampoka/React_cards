import {ChangeEvent, useEffect, useState} from 'react';
import SuperInputText from '../SuperInputText/SuperInputText';
import s from './Search.module.scss'
import {useDispatch} from 'react-redux';
import {useDebounce} from '../../hooks/useDebounce';
import {setPackName} from '../../../redux/decks-reducer';
import {useAppSelector} from '../../../redux/store';

export const Search = () => {
    const dispatch=useDispatch()
    const totalCount=useAppSelector<number>(state=>state.decks.cardPacksTotalCount)
    const [searchValue,setSearchValue]=useState('')
    const debouncedValue = useDebounce<string>(searchValue, 1000)

    const onSearchHandler= (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    useEffect(() => {
        console.log('effect search')
        dispatch(setPackName( debouncedValue))
    }, [debouncedValue,dispatch])
    return (
        <div className={s.searchBlock}>
            <label className={s.searchLabel}>
                Search for decks:
                <SuperInputText value={searchValue}
                                onChange={onSearchHandler}/>
                <span>Results: {totalCount}</span>
            </label>
    </div>
    );
};

