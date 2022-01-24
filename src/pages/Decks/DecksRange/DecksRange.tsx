import React, {useEffect, useState} from 'react';
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import s from './DecksRange.module.scss'
import {useDispatch} from 'react-redux';
import {useDebounce} from '../../../common/hooks/useDebounce';
import {setCurrentCardsCount} from '../../../redux/decks-reducer';

type PropsType = {
    minCardsCount: number
    maxCardsCount: number
}

export const DecksRange = ({minCardsCount, maxCardsCount}: PropsType) => {
        const dispatch = useDispatch()
        const [rangeValues, setRangeValues] = useState([minCardsCount, maxCardsCount])
        const createSliderWithTooltip = Slider.createSliderWithTooltip;
        const Range = createSliderWithTooltip(Slider.Range);
        const rangeMarks = {
            [minCardsCount]: {style: {color: '#fff', fontSize: 16}, label: minCardsCount},
            [maxCardsCount]: {style: {color: '#fff', fontSize: 16}, label: maxCardsCount}
        }
        const debouncedRange = useDebounce(rangeValues, 1000)

        const onRangeChangeHandler = (values: number[]) => {
            setRangeValues(values)
        }

        useEffect(() => {
            dispatch(setCurrentCardsCount(debouncedRange))
        }, [debouncedRange, dispatch])

        return (<div className={s.range}>
                <Range
                    marks={rangeMarks}
                    min={minCardsCount}
                    max={maxCardsCount}
                    // step={5}
                    value={rangeValues}
                    onChange={onRangeChangeHandler}
                    style={{width: '200px'}}
                    railStyle={{backgroundColor: '#FFC4ED', height: 10}}
                    trackStyle={[{backgroundColor: '#FFEAF5', height: 10}]}
                    handleStyle={[{
                        backgroundColor: '#d57689',
                        height: 20,
                        width: 20,
                        borderRadius: 0
                    }, {backgroundColor: '#7c8efd', height: 20, width: 20, borderRadius: 0}]}
                    // dotStyle={{backgroundColor:'red',width:20,height:20,top:-5}}
                    dotStyle={{display: 'none'}}
                    tipFormatter={value => `${value}`}
                    tipProps={{
                        placement: "top",
                        visible: true,
                    }}
                /></div>
        )
            ;
    }
;

