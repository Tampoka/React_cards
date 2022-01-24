import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../redux/store';
import s from '../../Decks/DecksTable/DecksTable.module.scss';
import moment from 'moment';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import {CardType} from '../../../api/cards-api';
import {Sort} from '../../../common/components/Sort/Sort';

type PropsType = {
    cards: CardType[]
    deleteCardHandler: (id: string) => void
    updateCardHandler: (id: string, title: string) => void
    isOwner: boolean
    sortCallback: (sortMethod: string) => void
    sortMethod?: string
}
export const CardsTable = React.memo(({cards, deleteCardHandler, updateCardHandler, isOwner,sortMethod,sortCallback}: PropsType) => {
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);

    return (
        <div className={s.tableContainer}>
            <table>
                <thead>
                <tr>
                    <td>
                        <div className={s.tableHeading}><p>Question</p>
                        <Sort sortBy={'question'} sortCallback={sortCallback} sortMethod={sortMethod}/></div>
                    </td>
                    <td>
                        <div className={s.tableHeading}><p>Answer</p>
                        <Sort sortBy={'question'} sortCallback={sortCallback} sortMethod={sortMethod}/></div>
                    </td>
                    <td>
                        <div className={s.tableHeading}><p>Last updated</p>
                            <Sort sortBy={'question'} sortCallback={sortCallback} sortMethod={sortMethod}/></div>
                    </td>
                    <td>
                        <div className={s.tableHeading}><p>Grade</p>
                            <Sort sortBy={'question'} sortCallback={sortCallback} sortMethod={sortMethod}/></div>
                    </td>
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
                            {isOwner && <><SuperButton disabled={isLoading}
                                                       onClick={() => deleteCardHandler(c._id)}
                                                       red>Delete</SuperButton>
                                {/*<UpdateDeckModal deckName={c.name} isLoading={isLoading} onSubmitHandler={edit}/>*/}
                            </>
                            }
                        </td>
                    </tr>;
                })}
                </tbody>
            </table>
        </div>
    );
})

