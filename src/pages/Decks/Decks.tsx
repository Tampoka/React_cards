import React, {useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import {Navigate} from 'react-router-dom';
import {useAppSelector} from "../../redux/store";
import {fetchCardsPacks, PacksInitialState} from "../../redux/decks-reducer";
import {Pagination} from "../../common/components/Pagination/Pagination";

export const Decks = React.memo(() => {
    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const {
        cardPacks,
        cardPacksTotalCount,
        minCardsCount,
        maxCardsCount,
        page,
        pageCount,
        privatePacks,
        sortBy,
        currentCardsCount,
        countPerPage
    } = useAppSelector<PacksInitialState>(state => state.decks)

    const userId = useAppSelector<string>(state => state.profile.profile._id)

    const paginationScrollTopRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        dispatch(fetchCardsPacks({
            page: 3,
            pageCount: 10,
            user_id: userId,
        }))
    }, [dispatch, page, pageCount, currentCardsCount, privatePacks, sortBy,userId])

    useEffect(() => {
        paginationScrollTopRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [page, pageCount])

    if (!isLoggedIn) return <Navigate to='/login'/>
    return (
        <div>
            <h1>Decks</h1>
            {cardPacks.map(p => <li>{p}</li>)}
            <Pagination totalCount={cardPacksTotalCount}
                        pageCount={pageCount}
                        currentPage={page}
                        countPerPage={countPerPage}/>
        </div>
    )
})

