import React, {useState} from 'react';
import {CardsPackType} from "../../../api/packs-api";
import {AppRootStateType} from "../../../redux/store";
import {useSelector} from "react-redux";
import s from './DecksTable.module.scss'
import SuperButton from "../../../common/components/SuperButton/SuperButton";
import moment from 'moment';
import {Modal} from "../../../common/components/Modal/Modal";
import { AddDeckForm } from '../AddDeckForm/AddDeckForm';
import {UpdateDeckForm} from "../UpdateDeckForm/UpdateDeckForm";

type PropsType = {
    decks: CardsPackType[]
    deleteDeckHandler: (id: string) => void
    updateDeckHandler: (id: string, title: string) => void
    userId: string
    visible: boolean
    setVisible: (value: boolean) => void
}

export const DecksTable = React.memo(({decks, deleteDeckHandler, updateDeckHandler, userId,visible,setVisible}: PropsType) => {
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
    return (
        <div className={s.tableContainer}>
            <table>
                <thead>
                <tr>
                    <td>Deck</td>
                    <td>Cards</td>
                    <td>Author</td>
                    <td>Created</td>
                    <td>Updated</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                {decks.map(m => {
                    const username = m.user_name.includes('@') ? m.user_name.substring(0, m.user_name.indexOf('@')) : m.user_name
                    // const dateCreated=m.created.toLocaleString().replace(/.\d+Z$/g, '')
                    const edit = (title: string) => updateDeckHandler(m._id, title);

                    return <tr key={m._id}>
                        <td className={s.deckName}>{m.name}</td>
                        <td>{m.cardsCount}</td>
                        <td>{username}</td>
                        <td>{moment(m.created).format(('L'))}</td>
                        <td>{moment(m.updated).format(('L'))}</td>
                        <td className={s.btnColumn}>
                            <Modal visible={visible} setVisible={setVisible}>
                                <UpdateDeckForm onSubmitHandler={edit} isLoading={isLoading} title={m.name}/>
                            </Modal>
                            {userId === m.user_id && <><SuperButton disabled={isLoading}
                                                                    onClick={() => deleteDeckHandler(m._id)}>Delete</SuperButton>
                                <SuperButton disabled={isLoading}
                                             onClick={() => setVisible(true)}>Edit</SuperButton></>}
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