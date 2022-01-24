import React, {useEffect, useState} from 'react';
import {Range} from 'rc-slider';
import {useDispatch} from 'react-redux';
import {useDebounce} from '../../../common/hooks/useDebounce';
import {setCurrentCardsCount} from '../../../redux/decks-reducer';

type PropsType = {
    minCardsCount: number
    maxCardsCount: number
}

export const DecksRange = ({minCardsCount,maxCardsCount}:PropsType) => {
    const dispatch = useDispatch()
    const [rangeValues, setRangeValues] = useState([minCardsCount, maxCardsCount])

    const rangeMarks = {
        [minCardsCount]: {style: {fontSize: 16,color:'red'}, label: minCardsCount},
        [maxCardsCount]: {style: {fontSize: 16,color:'red'}, label: maxCardsCount}
    }
    const debouncedRange=useDebounce(rangeValues,800)

    const onRangeChangeHandler = (values: number[]) => {
        setRangeValues(values)
    }

    useEffect(() => {
        dispatch(setCurrentCardsCount( debouncedRange))
    }, [debouncedRange,dispatch])

    return (
        <Range value={rangeValues}
               marks={rangeMarks}
               min={minCardsCount}
               max={maxCardsCount}
               onChange={onRangeChangeHandler}
               style={{margin: '32px 8px 48px 8px', width: 'inherit'}}/>
    );
};

