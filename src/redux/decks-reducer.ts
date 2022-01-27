import {AppRootStateType, ThunkType} from './store';
import {
    CardsPackResponse,
    DeleteCardsPackData,
    GetCardPacksQueryParams,
    NewCardsPackData,
    decksApi,
    UpdateCardsPackData
} from '../api/decks-api';
import {setAppError, setAppInfo, setAppIsLoading} from './app-reducer';

export const initialState: PacksInitialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    page: 5,
    pageCount: 10,
    privatePacks: false,
    sortBy: undefined,
    currentCardsCount: [0, 0],
    countPerPage: [10, 25, 50],
    packName: ''
}

export const decksReducer = (state: PacksInitialState = initialState, action: DecksActionsType): PacksInitialState => {
    switch (action.type) {
        case 'DECKS/SET-DECKS':
            return {...state, ...action.payload}
        case 'DECKS/SET-CURRENT-PAGE':
            return {...state, page: action.payload.pageNum}
        case 'DECKS/SET-DECKS-PER-PAGE':
            return {...state, pageCount: action.payload.count}
        case 'DECKS/SET-DECKS-TOTAL-COUNT':
            return {...state, cardPacksTotalCount: action.payload.count}
        case 'DECKS/SET-DECKS-MIN-MAX-COUNT':
            return {
                ...state, minCardsCount: action.payload.values[0],
                maxCardsCount: action.payload.values[1],
            }
        case 'DECKS/SET-DECKS-SORTING-METHOD':
            return {...state, sortBy: action.payload.method, page: 1}
        case'DECKS/SET-PRIVATE-DECKS':
            return {...state, privatePacks: action.payload.value}
        case 'DECKS/SET-CURRENT-CARDS-COUNT':
            return {...state, currentCardsCount: [...action.payload.values]}
        case 'DECKS/SET-DECK-NAME':
            return {...state, packName: action.payload.name}
        default:
            return state
    }
}

//Action Creators
export const setDecks = (payload: CardsPackResponse) => ({type: 'DECKS/SET-DECKS', payload} as const)
export const setDecksCurrentPage = (pageNum: number) => ({type: 'DECKS/SET-CURRENT-PAGE', payload: {pageNum}} as const)
export const setDecksPerPage = (count: number) => ({type: 'DECKS/SET-DECKS-PER-PAGE', payload: {count}} as const)
export const setDecksTotalCount = (count: number) => ({type: 'DECKS/SET-DECKS-TOTAL-COUNT', payload: {count}} as const)
export const setDecksMinMaxCount = (values: number[]) => ({
    type: 'DECKS/SET-DECKS-MIN-MAX-COUNT',
    payload: {values}
} as const)
export const setPrivateDecks = (value: boolean) => ({type: 'DECKS/SET-PRIVATE-DECKS', payload: {value}} as const);
export const setDecksSortingMethod = (method: string) => {
    return {type: 'DECKS/SET-DECKS-SORTING-METHOD', payload: {method}} as const;
};
export const setCurrentCardsCount = (values: number[]) => {
    return {type: 'DECKS/SET-CURRENT-CARDS-COUNT', payload: {values}} as const;
};
export const setPackName = (name: string) => {
    return {type: 'DECKS/SET-DECK-NAME', payload: {name}} as const;
};

//Thunk Creators
export const fetchCardsPacks = (payload?: GetCardPacksQueryParams): ThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {
        const decks = getState().decks
        const userID = decks.privatePacks && getState().profile?._id
        dispatch(setAppIsLoading(true))
        try {
            const res = await decksApi.getCardPacks({
                page: decks.page,
                pageCount: decks.pageCount,
                min: decks.currentCardsCount[0],
                max: decks.currentCardsCount[1],
                packName: payload?.packName || decks.packName || undefined,
                user_id: userID || undefined,
                sortPacks: decks.sortBy
            });
            dispatch(setDecks(res.data));
            // dispatch(setAppInfo('Cards are ready to study!'));
        } catch (e: any) {
            dispatch(setAppError(true));
            dispatch(setAppInfo(e.response ? e.response.data.error : e));
        } finally {
            dispatch(setAppIsLoading(false))
        }
    };


export const postDeck = (payload: NewCardsPackData): ThunkType => async dispatch => {
    dispatch(setAppIsLoading(true));
    try {
        await decksApi.createCardsPack(payload);
        await dispatch(fetchCardsPacks());
        dispatch(setAppInfo('Deck was created!'))
    } catch (e: any) {
        console.log((e as Error).message);
        dispatch(setAppError(true));
        dispatch(setAppInfo(e.response ? e.response.data.error : e));
    } finally {
        dispatch(setAppIsLoading(false));
    }
};

export const deleteDeck = (payload: DeleteCardsPackData): ThunkType => async dispatch => {
    dispatch(setAppIsLoading(true));
    try {
        await decksApi.deleteCardsPack(payload);
        await dispatch(fetchCardsPacks());
        dispatch(setAppInfo('Deck was deleted!'))
    } catch (e: any) {
        console.log((e as Error).message);
        dispatch(setAppError(true));
        dispatch(setAppInfo(e.response ? e.response.data.error : e));
    } finally {
        dispatch(setAppIsLoading(false));
    }
};

export const updateDeck = (payload: UpdateCardsPackData): ThunkType => async dispatch => {
    dispatch(setAppIsLoading(true));
    try {
        await decksApi.updateCardsPack(payload);
        await dispatch(fetchCardsPacks());
        dispatch(setAppInfo('Deck was updated!'));
    } catch (e: any) {
        console.log((e as Error).message);
        dispatch(setAppError(true));
        dispatch(setAppInfo(e.response ? e.response.data.error : e));
    } finally {
        dispatch(setAppIsLoading(false));
    }
};


//Types
export type PacksInitialState = CardsPackResponse & {
    privatePacks: boolean
    sortBy: string | undefined
    currentCardsCount: number[]
    countPerPage: number[]
    packName: string
}

export type SetDecksActionType = ReturnType<typeof setDecks>
export type SetDecksCurrentPageActionType = ReturnType<typeof setDecksCurrentPage>
export type SetDecksPerPageActionType = ReturnType<typeof setDecksPerPage>
export type SetDecksTotalCountActionType = ReturnType<typeof setDecksTotalCount>
export type SetDecksMinMaxCountActionType = ReturnType<typeof setDecksMinMaxCount>
export type SetPrivateDecksActionType = ReturnType<typeof setPrivateDecks>
export type SetDecksSortingMethodActionType = ReturnType<typeof setDecksSortingMethod>
export type SetCurrentCardsCountActionType = ReturnType<typeof setCurrentCardsCount>
export type SetPackNameActionType = ReturnType<typeof setPackName>

export type DecksActionsType =
    | SetDecksActionType
    | SetDecksCurrentPageActionType
    | SetDecksPerPageActionType
    | SetDecksTotalCountActionType
    | SetPrivateDecksActionType
    | SetDecksMinMaxCountActionType
    | SetDecksSortingMethodActionType
    | SetCurrentCardsCountActionType
    | SetPackNameActionType

