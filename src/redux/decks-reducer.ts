import {AppRootStateType, ThunkType} from "./store"
import {CardsPackResponse, GetCardPacksQueryParams, packsAPI} from "../api/packs-api";
import {setAppError, setAppIsLoading} from "./app-reducer";

export const initialState: PacksInitialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    page: 1,
    pageCount: 10,
    privatePacks: false,
    sortBy: undefined,
    currentCardsCount: [0, 0],
    countPerPage: [10, 25, 50]
}

export const decksReducer = (state: PacksInitialState = initialState, action: DecksActionsType): PacksInitialState => {
    switch (action.type) {
        case 'DECKS/SET-DECKS':
            return {...state, ...action.payload}
        case 'Decks/SET-CURRENT-PAGE':
            return {...state, page: action.payload.pageNum}
        case 'Decks/SET-DECKS-PER-PAGE':
            return {...state, pageCount: action.payload.count}
        case 'Decks/SET-DECKS-TOTAL-COUNT':
            return {...state, cardPacksTotalCount: action.payload.count}
        default:
            return state
    }
}

//Action Creators
export const setDecks = (decks: CardsPackResponse) => ({type: 'DECKS/SET-DECKS', payload: {decks}} as const)
export const setDecksCurrentPage = (pageNum: number) => ({type: 'Decks/SET-CURRENT-PAGE', payload: {pageNum}} as const)
export const setDecksPerPage = (count: number) => ({type: 'Decks/SET-DECKS-PER-PAGE', payload: {count}} as const)
export const setDecksTotalCount = (count: number) => ({type: 'Decks/SET-DECKS-TOTAL-COUNT', payload: {count}} as const)

//Thunk Creators
export const fetchCardsPacks = (payload?: GetCardPacksQueryParams): ThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {
        const decks = getState().decks
        const userID = decks.privatePacks && getState().profile.profile?._id
        try {
            dispatch(setAppIsLoading(true))
            const res = await packsAPI.getCardPacks({
                page: decks.page,
                pageCount: decks.pageCount,
                min: decks.currentCardsCount[0],
                max: decks.currentCardsCount[1],
                packName: payload?.packName || undefined,
                user_id: userID || undefined,
                sortPacks: decks.sortBy
            });
            dispatch(setDecks(res.data));
        } catch (e: any) {
            dispatch(setAppError(e.response ? e.response.data.error.toUpperCase() : e));
        } finally {
            dispatch(setAppIsLoading(false))
        }
    };


//Types
export type PacksInitialState = CardsPackResponse & {
    privatePacks: boolean
    sortBy: string | undefined
    currentCardsCount: number[]
    countPerPage: number[]
}

export type SetDecksActionType = ReturnType<typeof setDecks>
export type SetDecksCurrentPageActionType = ReturnType<typeof setDecksCurrentPage>
export type SetDecksPerPageActionType = ReturnType<typeof setDecksPerPage>
export type SetDecksTotalCountActionType = ReturnType<typeof setDecksTotalCount>

export type DecksActionsType =
    | SetDecksActionType
    | SetDecksCurrentPageActionType
    | SetDecksPerPageActionType
    | SetDecksTotalCountActionType

