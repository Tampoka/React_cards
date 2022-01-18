import React, {ChangeEvent, useState} from 'react';
import SuperInputText from "../SuperInputText/SuperInputText";
import s from './Search.module.scss'
import {useDispatch} from "react-redux";

export const Search = () => {
    const dispatch=useDispatch()
    const [searchValue,setSearchValue]=useState('')

    const onSearchHandler= (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
        // debouncedSearch(e.currentTarget.value)
    }
    // const debouncedSearchTerm = useDebounce(searchTerm, 500);
    return (
        <label className={s.searchLabel}>
            Search for decks:
            <SuperInputText value={searchValue}/>
        </label>
    );
};

