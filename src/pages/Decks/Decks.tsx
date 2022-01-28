import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../redux/store';
import {
    deleteDeck,
    fetchCardsPacks,
    PacksInitialState,
    postDeck,
    setDecksSortingMethod,
    setPackName,
    setPrivateDecks,
    updateDeck
} from '../../redux/decks-reducer';
import {DecksPagination} from './DecksPagination/DecksPagination';
import s from './Decks.module.scss'
import {DecksTable} from './DecksTable/DecksTable';
import {Search} from '../../common/components/Search/Search';
import {Modal} from '../../common/components/Modal/Modal';
import {AddDeckForm} from './AddDeckForm/AddDeckForm';
import {useModal} from '../../common/hooks/useModal';
import {Sidebar} from './Sidebar/Sidebar';
import {AddItem} from './Sidebar/AddItem/AddItem';
import {updateProfile} from '../../redux/profile-reducer';
import {Loader} from '../../common/components/Loader/Loader';
import {useMatchMedia} from '../../common/hooks/useMatchMedia';
import {BtnBlock} from './BtnBlock/BtnBlock';
import {DecksRange} from './DecksRange/DecksRange';

export const Decks = React.memo(() => {
    const {isOpen, onToggle} = useModal()
    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const isLoading = useAppSelector<boolean>(state => state.app.isLoading)
    const userId = useAppSelector<string>(state => state.profile._id)
    const isDesktopResolution = useMatchMedia('(min-width:1040px)', true)
    const userDecksCount=useAppSelector(state=>state.profile.publicCardPacksCount)

    const sortDecksMethod = useAppSelector<string | undefined>(state => state.cards.sortCardsMethod)
    const changeDecksSortMethod = (sortMethod: string) => {
        dispatch(setDecksSortingMethod(sortMethod))
    }

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
        countPerPage,
        packName
    } = useAppSelector<PacksInitialState>(state => state.decks)

    const paginationScrollTopRef = useRef<HTMLHeadingElement>(null)

    const deleteDeckHandler = useCallback((id: string) => {
        dispatch(deleteDeck({id}));
    }, [dispatch]);

    const updateDeckHandler = useCallback((id: string, title: string) => {
        dispatch(updateDeck({cardsPack: {_id: id, name: title}}));
    }, [dispatch]);

    const showPrivate = useCallback((value: boolean) => {
        console.log(value)
        dispatch(setPrivateDecks(value))
    }, [dispatch])

    const addNewDeckHandler = useCallback((title: string) => {
        dispatch(postDeck({cardsPack: {name: title}}))
    }, [dispatch])

    const onDeckSearchCallback = useCallback((value: string) => {
        dispatch(setPackName(value))
        console.log('search decks')
    }, [dispatch])

    const updateUserProfile = useCallback((name: string, avatar: string) => {
        dispatch(updateProfile(({name, avatar})))
    }, [dispatch])


    useEffect(() => {
       dispatch(fetchCardsPacks())
    }, [dispatch, page, pageCount, currentCardsCount, privatePacks, sortBy, packName, userId, sortDecksMethod, cardPacksTotalCount])


    useEffect(() => {
        paginationScrollTopRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [page, pageCount])

    if (!isLoggedIn) return <Navigate to={'/login'}/>

    return (
        <div className={s.decksWithSidebar}>
            {isDesktopResolution&&<Sidebar showPrivate={showPrivate} active={privatePacks} minCardsCount={minCardsCount}
                      maxCardsCount={maxCardsCount} isLoading={isLoading} onSubmitHandler={updateUserProfile}/>}
            <div className={s.decksContainer}>
                <h1 ref={paginationScrollTopRef}>Decks List</h1>
                {isLoading && <Loader/>}
                <Modal visible={isOpen} setVisible={onToggle}>
                    <AddDeckForm onSubmitHandler={addNewDeckHandler} isLoading={isLoading} onClose={onToggle}/>
                </Modal>
                <div className={s.searchWithAddItem}>
                    <Search totalCount={cardPacksTotalCount} searchCallback={onDeckSearchCallback}
                            label='Search for decks' showResults={true}/>
                    <AddItem title='Add deck' setModal={onToggle} isLoading={isLoading}/>
                </div>
                <div className={s.innerSidebar}>
                    {!isDesktopResolution&& <div className={s.info}>
                        <p>Decks created: <span>{userDecksCount}</span></p>
                        <BtnBlock showPrivate={showPrivate} active={privatePacks}/>
                        <DecksRange minCardsCount={minCardsCount} maxCardsCount={maxCardsCount} isLoading={isLoading}/>
                    </div>}
                </div>
                <DecksTable decks={cardPacks}
                            deleteDeckHandler={deleteDeckHandler}
                            updateDeckHandler={updateDeckHandler}
                            userId={userId}
                            sortCallback={changeDecksSortMethod}
                            sortMethod={sortDecksMethod}
                />
                <DecksPagination totalCount={cardPacksTotalCount}
                                 pageCount={pageCount}
                                 currentPage={page}
                                 countPerPage={countPerPage}/>
            </div>
        </div>
    )
})

