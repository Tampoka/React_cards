import {ChangeEvent, useEffect, useState} from 'react';
import SuperInputText from '../SuperInputText/SuperInputText';
import s from './Search.module.scss'
import {useDebounce} from '../../hooks/useDebounce';

type PropsType = {
    totalCount: number
    searchCallback: (value: string) => void
    label: string
    showResults: boolean
}

export const Search = ({totalCount, searchCallback, label, showResults}: PropsType) => {
    const [searchValue, setSearchValue] = useState('')
    const debouncedValue = useDebounce<string>(searchValue, 1000)

    const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    useEffect(() => {
        searchCallback(debouncedValue)
    }, [debouncedValue])

    return (
        <div className={s.searchBlock}>
            <label className={s.searchLabel}>
                {label}
                <SuperInputText value={searchValue}
                                onChange={onSearchHandler}/>
                {showResults && <span>Found: <span className={s.results}>{totalCount}</span></span>}
            </label>
        </div>
    );
};

