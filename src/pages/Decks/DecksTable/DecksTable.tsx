import React from 'react';
import {CardsPackType} from '../../../api/decks-api';
import {AppRootStateType} from '../../../redux/store';
import {useSelector} from 'react-redux';
import s from './DecksTable.module.scss'
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import moment from 'moment';
import {UpdateDeckModal} from '../UpdateDeckModal/UpdateDeckModal';
import {NavLink} from 'react-router-dom';
import {ROUTES} from '../../../routes/routes';
import {Sort} from '../../../common/components/Sort/Sort';

type PropsType = {
    decks: CardsPackType[]
    deleteDeckHandler: (id: string) => void
    updateDeckHandler: (id: string, title: string) => void
    userId: string
    sortCallback: (sortMethod: string) => void
    sortMethod?: string
}

export const DecksTable = React.memo(({
                                          decks,
                                          deleteDeckHandler,
                                          updateDeckHandler,
                                          userId,
                                          sortMethod,
                                          sortCallback
                                      }: PropsType) => {
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
    return (
        <div className={s.tableContainer}>
            <table>
                <thead>
                <tr>
                    <td>
                        <div className={s.tableHeading}><p>Deck</p>
                            <Sort sortBy={'name'} sortCallback={sortCallback} sortMethod={sortMethod}/></div>
                    </td>
                    <td>
                        <div className={s.tableHeading}><p>Cards</p>
                            <Sort sortBy={'cardsCount'} sortCallback={sortCallback} sortMethod={sortMethod}/></div>
                    </td>
                    <td>
                        <div className={s.tableHeading}><p>Author</p>
                            <Sort sortBy={'user_id'} sortCallback={sortCallback} sortMethod={sortMethod}/></div>
                    </td>
                    <td>
                        <div className={s.tableHeading}><p>Created</p>
                            <Sort sortBy={'created'} sortCallback={sortCallback} sortMethod={sortMethod}/></div>
                    </td>
                    <td>
                        <div className={s.tableHeading}><p>Updated</p>
                            <Sort sortBy={'updated'} sortCallback={sortCallback} sortMethod={sortMethod}/></div>
                    </td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                {decks.map(m => {
                    const username = m.user_name.includes('@') ? m.user_name.substring(0, m.user_name.indexOf('@')) : m.user_name
                    // const dateCreated=m.created.toLocaleString().replace(/.\d+Z$/g, '')
                    const editCallback = (title: string) => updateDeckHandler(m._id, title);

                    return <tr key={m._id}>
                        <td className={s.deckName}>
                            <NavLink to={`${ROUTES.CARDS}/${m._id}`}>{m.name}</NavLink>
                        </td>
                        <td>{m.cardsCount}</td>
                        <td>{username}</td>
                        <td>{moment(m.created).format(('L'))}</td>
                        <td>{moment(m.updated).format(('L'))}</td>
                        <td className={s.btnColumn}>
                            {userId === m.user_id && <><SuperButton disabled={isLoading}
                                                                    onClick={() => deleteDeckHandler(m._id)}
                                                                    red>Delete</SuperButton>
                                <UpdateDeckModal deckName={m.name} isLoading={isLoading} onSubmitHandler={editCallback}/>
                            </>
                            }
                            <SuperButton disabled={isLoading}>Learn</SuperButton>
                        </td>
                    </tr>;
                })}
                </tbody>
            </table>
        </div>
    )
})

//                            <SuperEditableSpan defaultValue={m.name} onBlurHandler={edit}></SuperEditableSpan>