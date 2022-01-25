import React from 'react';
import s from './CardsSearch.module.scss';
import {Search} from '../../../common/components/Search/Search';
import {AddItem} from '../../Decks/Sidebar/AddItem/AddItem';

type PropsType = {
    isLoading: boolean
    onCardQuestionSearchCallback: (question: string) => void
    onCardAnswerSearchCallback: (answer: string) => void
    totalCount: number
    onToggle: () => void
}

export const CardsSearch = ({
                                isLoading,
                                onCardAnswerSearchCallback,
                                onCardQuestionSearchCallback,
                                onToggle,
                                totalCount
                            }: PropsType) => {
    return (
        <div className={s.searchWithAddItem}>
            <div className={s.searchBlock}>
                <Search totalCount={totalCount} searchCallback={onCardQuestionSearchCallback}
                        label='Search by question' showResults={false}/>
                <Search totalCount={totalCount} searchCallback={onCardAnswerSearchCallback}
                        label='Search by answer'
                        showResults={false}/>
                <span>Found: <span className={s.results}>{totalCount}</span></span>
            </div>
            <AddItem title='Add Card' setModal={onToggle} isLoading={isLoading}/>
        </div>
    );
};

