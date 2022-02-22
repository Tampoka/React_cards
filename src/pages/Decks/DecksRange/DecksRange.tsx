import React, {useEffect, useState} from 'react';
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import s from './DecksRange.module.scss'
import {useDispatch} from 'react-redux';
import {useDebounce} from '../../../common/hooks/useDebounce';
import {setCurrentCardsCount} from '../../../redux/decks-reducer';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import {useAppSelector} from '../../../redux/store';

type PropsType = {
    minCardsCount: number
    maxCardsCount: number
    isLoading: boolean
}

export const DecksRange = React.memo(({minCardsCount, maxCardsCount, isLoading}: PropsType) => {
        const dispatch = useDispatch()
        const currentCardsCount =useAppSelector(state=>state.decks.currentCardsCount)

        const [rangeValues, setRangeValues] = useState(currentCardsCount)
        const [firstRendering, setFirstRendering] = useState(true)

        const createSliderWithTooltip = Slider.createSliderWithTooltip;
        //ts-ignore
        const Range = createSliderWithTooltip(Slider.Range);

        const rangeMarks = {
            [minCardsCount]: {style: {color: '#fff', fontSize: 16}, label: minCardsCount},
            [maxCardsCount]: {style: {color: '#fff', fontSize: 16}, label: maxCardsCount}
        }
        const debouncedRange = useDebounce(rangeValues, 1000)

        const onRangeChangeHandler = (values: number[]) => {
            setRangeValues(values)
            setFirstRendering(false)
        }

        const resetRange = () => {
            setRangeValues([minCardsCount, maxCardsCount])
        }
        useEffect(() => {
            if (!firstRendering) {
                dispatch(setCurrentCardsCount(debouncedRange))
            } else {
                setFirstRendering(false)
            }
        }, [debouncedRange, dispatch])

        return (<div className={s.range}>
                <Range
                    marks={rangeMarks}
                    min={minCardsCount}
                    max={maxCardsCount}
                    // step={5}
                    value={rangeValues}
                    onChange={onRangeChangeHandler}
                    style={{width: '170px'}}
                    railStyle={{backgroundColor: '#FFC4ED', height: 10}}
                    trackStyle={[{backgroundColor: '#FFEAF5', height: 10}]}
                    handleStyle={[{
                        backgroundColor: '#e8ebe4',
                        height: 20,
                        width: 20,
                        borderRadius: 0,
                        borderColor: '#d2d5dd'
                    }, {backgroundColor: '#999ac6', height: 20, width: 20, borderRadius: 0, borderColor: '#d2d5dd'}]}
                    dotStyle={{display: 'none'}}
                    tipFormatter={value => `${value}`}
                    tipProps={{
                        placement: "top",
                        visible: true,
                    }}
                />
                <SuperButton disabled={isLoading} onClick={resetRange}
                             className={s.submitBtn}>Reset</SuperButton>
            </div>
        )
            ;
    })
;

