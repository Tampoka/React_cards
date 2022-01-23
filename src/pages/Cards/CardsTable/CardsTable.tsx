import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../redux/store';
import s from '../../Decks/DecksTable/DecksTable.module.scss';
import moment from 'moment';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import {CardType} from '../../../api/cards-api';

type PropsType = {
    cards: CardType[]
    deleteCardHandler: (id: string) => void
    updateCardHandler: (id: string, title: string) => void
    userId: string
}
export const CardsTable = React.memo(({cards, deleteCardHandler, updateCardHandler, userId}: PropsType) => {
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);

    return (
        <div className={s.tableContainer}>
            <table>
                <thead>
                <tr>
                    <td>Question</td>
                    <td>Answer</td>
                    <td>Last updated</td>
                    <td>Grade</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                {cards.map(c => {
                    const edit = (title: string) => updateCardHandler(c._id, title);
                    return <tr key={c._id}>
                        <td className={s.deckName}>{c.question}</td>
                        <td>{c.answer}</td>
                        <td>{moment(c.updated).format(('L'))}</td>
                        <td>{c.grade}</td>
                        <td className={s.btnColumn}>
                            {userId === c.user_id && <><SuperButton disabled={isLoading}
                                                                    onClick={() => deleteCardHandler(c._id)}
                                                                    red>Delete</SuperButton>
                                {/*<UpdateDeckModal deckName={c.name} isLoading={isLoading} onSubmitHandler={edit}/>*/}
                            </>
                            }
                            <SuperButton disabled={isLoading}>Learn</SuperButton>
                        </td>
                    </tr>;
                })}
                </tbody>
            </table>
        </div>
    );
})

