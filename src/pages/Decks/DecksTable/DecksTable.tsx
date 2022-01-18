import React, {useState} from 'react';
import {CardsPackType} from "../../../api/packs-api";
import {AppRootStateType} from "../../../redux/store";
import {useSelector} from "react-redux";
import SuperEditableSpan from "../../../common/components/SuperEditableSpan/SuperEditableSpan";
import s from './DecksTable.module.scss'
import SuperButton from "../../../common/components/SuperButton/SuperButton";

type PropsType = {
    decks: CardsPackType[]
    deleteDeckHandler: (id: string) => void
    updateDeckHandler: (id: string, title: string) => void
    userId:string
}

export const DecksTable = React.memo(({ decks, deleteDeckHandler, updateDeckHandler,userId }: PropsType) => {
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
    return (
        <div className={s.tableContainer}>
            <table>
                <thead>
                <tr>
                    <td>Name</td>
                    <td>Cards</td>
                    <td>Last update</td>
                    <td>Created by</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                {decks.map(m => {
                    const edit = (title: string) => updateDeckHandler(m._id, title);
                    const disabled=(userId!==m.user_id)

                    return <tr key={m._id}>
                        <td>
                            <SuperEditableSpan  defaultValue={m.name} onBlurHandler={edit} ></SuperEditableSpan>
                        </td>
                        <td>{m._id}</td>
                        <td>{m.cardsCount}</td>
                        <td>{m.updated}</td>
                        <td>{m.created}</td>
                        <td>
                            <SuperButton disabled={disabled} onClick={() => deleteDeckHandler(m._id)}>Delete</SuperButton>
                            <SuperButton disabled={disabled}>Edit</SuperButton>
                            <SuperButton >Learn</SuperButton>
                        </td>
                    </tr>;
                })}
                </tbody>
            </table>
        </div>
    )
})

