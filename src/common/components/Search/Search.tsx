import {ChangeEvent, useEffect, useState} from 'react';
import SuperInputText from '../SuperInputText/SuperInputText';
import s from './Search.module.scss'
import {useDispatch} from 'react-redux';
import {useDebounce} from '../../hooks/useDebounce';
import {setPackName} from '../../../redux/decks-reducer';
import {useAppSelector} from '../../../redux/store';

type PropsType={
    totalCount:number
    searchCallback:(value:string)=>void
    label:string
}

export const Search = ({totalCount,searchCallback,label}:PropsType) => {
    const dispatch=useDispatch()
    const [searchValue,setSearchValue]=useState('')
    const debouncedValue = useDebounce<string>(searchValue, 1000)

    const onSearchHandler= (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    useEffect(() => {
        searchCallback(debouncedValue)
    }, [debouncedValue,dispatch])

    return (
        <div className={s.searchBlock}>
            <label className={s.searchLabel}>
                {label}
                <SuperInputText value={searchValue}
                                onChange={onSearchHandler}/>
                <span>Found: <span className={s.results}>{totalCount}</span></span>
            </label>
    </div>
    );
};

