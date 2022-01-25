import {
    cardsAPI,
    CardsResponse,
    DeleteCardData,
    GetCardsQueryParams,
    GradeData,
    NewCardData,
    UpdateCardData
} from '../api/cards-api';
import {AppRootStateType, ThunkType} from './store';
import {setAppError, setAppInfo, setAppIsLoading} from './app-reducer';

export const initialState: CardsInitialStateType = {
    cards: [],
    page: 1,
    pageCount: 10,
    cardsTotalCount: 0,
    packUserId: '',
    minGrade: 0,
    maxGrade: 0,
    currentCardsPackID: '',
    sortCardsMethod: undefined,
    currentGrade: [0, 0],
    countPerPage: [10, 25, 50],
    cardAnswer: '',
    cardQuestion: '',
}

export const cardsReducer = (state = initialState, action: CardsActionsType): CardsInitialStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS':
            return {...state, ...action.payload}
        case 'CARDS/SET-CARDS-CURRENT-PAGE':
            return {...state, page: action.payload.page}
        case 'CARDS/SET-CARDS-PER-PAGE':
            return {...state, pageCount: action.payload.num}
        case 'CARDS/SET-CARDS-TOTAL-COUNT':
            return {...state, cardsTotalCount: action.payload.num}
        case 'CARDS/SET-CURRENT-CARDS-DECK-ID':
            // @ts-ignore
            return {...state, currentCardsPackID: action.payload.deckId}
        case 'CARDS/SET-MIN-MAX-GRADE':
            return {...state, minGrade: action.payload.values[0], maxGrade: action.payload.values[1]}
        case 'CARDS/SET-CURRENT-GRADE':
            return {...state, currentGrade: [...action.payload.values]}
        case 'CARDS/SET-SORTING-METHOD':
            return {...state, sortCardsMethod: action.payload.sortCardsMethod}
        case 'CARDS/SET-CARD-QUESTION':
            return {...state, cardQuestion: action.payload.question}
        case 'CARDS/SET-CARD-ANSWER':
            return {...state, cardAnswer: action.payload.answer}
        default:
            return state
    }
}

//ACTION CREATORS
export const setCards = (payload: CardsResponse) => ({type: 'CARDS/SET-CARDS', payload} as const)
export const setCardsCurrentPage = (page: number) => ({type: 'CARDS/SET-CARDS-CURRENT-PAGE', payload: {page}} as const)
export const setCardsPerPage = (num: number) => ({type: 'CARDS/SET-CARDS-PER-PAGE', payload: {num}} as const)
export const setCardsTotalCount = (num: number) => ({type: 'CARDS/SET-CARDS-TOTAL-COUNT', payload: {num}} as const)
export const setCurrentCardsDeckID = (deckId: string | undefined) => ({
    type: 'CARDS/SET-CURRENT-CARDS-DECK-ID',
    payload: {deckId}
} as const)
export const setMinMaxGrade = (values: number[]) => ({type: 'CARDS/SET-MIN-MAX-GRADE', payload: {values}} as const)
export const setCurrentGrade = (values: number[]) => ({type: 'CARDS/SET-CURRENT-GRADE', payload: {values}} as const)
export const setSortCardsMethod = (sortCardsMethod: string) => ({
    type: 'CARDS/SET-SORTING-METHOD',
    payload: {sortCardsMethod}
} as const)
export const setCardQuestion = (question: string) => {
    return {type: 'CARDS/SET-CARD-QUESTION', payload: {question}} as const;
};
export const setCardAnswer = (answer: string) => {
    return {type: 'CARDS/SET-CARD-ANSWER', payload: {answer}} as const;
};

//THUNK CREATORS
export const fetchCards = (payload?: GetCardsQueryParams): ThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {
        const cards = getState().cards
        try {
            dispatch(setAppIsLoading(true))
            const res = await cardsAPI.getCards({
                cardsPack_id: cards.currentCardsPackID || payload?.cardsPack_id,
                page: cards.page,
                pageCount: payload?.pageCount || cards.pageCount,
                min: cards.currentGrade[0],
                max: cards.currentGrade[1],
                // cardName: payload?.name || cards.cardName||undefined,
                cardQuestion: payload?.cardQuestion || cards.cardQuestion || undefined,
                cardAnswer: payload?.cardAnswer || cards.cardAnswer || undefined,
                sortCards: cards.sortCardsMethod
            });
            dispatch(setCards(res.data));
            dispatch(setAppInfo('Cards are ready to study!'));
            console.log(res.data)
        } catch (e: any) {
            dispatch(setAppError(true));
            dispatch(setAppInfo(e.response ? e.response.data.error : e));
        } finally {
            dispatch(setAppIsLoading(false))
        }
    };

export const createCard = (payload?: { card: { cardsPack_id: string; question: string; answer: string } }): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await cardsAPI.createCard(payload)
        await dispatch(fetchCards())
    } catch (e: any) {
        dispatch(setAppError(true));
        dispatch(setAppInfo(e.response ? e.response.data.error : e));
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const deleteCard = (payload: DeleteCardData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await cardsAPI.deleteCard(payload)
        await dispatch(fetchCards())
    } catch (e: any) {
        dispatch(setAppError(true));
        dispatch(setAppInfo(e.response ? e.response.data.error : e));
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const updateCard = (payload: UpdateCardData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await cardsAPI.updateCard(payload)
        await dispatch(fetchCards())
    } catch (e: any) {
        dispatch(setAppError(true));
        dispatch(setAppInfo(e.response ? e.response.data.error : e));
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const gradeAnswer = (payload: GradeData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await cardsAPI.grade(payload)
        // await dispatch(fetchCards())
    } catch (e: any) {
        dispatch(setAppError(true));
        dispatch(setAppInfo(e.response ? e.response.data.error : e));
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

//TYPES

export type CardsInitialStateType = CardsResponse & {
    currentCardsPackID: string
    sortCardsMethod: string | undefined
    currentGrade: number[]
    countPerPage: number[]
    cardAnswer: string
    cardQuestion: string
}

export type SetCardsActionType = ReturnType<typeof setCards>
export type SetCardsCurrentPageActionType = ReturnType<typeof setCardsCurrentPage>
export type SetCardsPerPageActionType = ReturnType<typeof setCardsPerPage>
export type SetCardsTotalCountActionType = ReturnType<typeof setCardsTotalCount>
export type SetCurrentCardsDeckIDActionType = ReturnType<typeof setCurrentCardsDeckID>
export type SetMinMaxGradeActionType = ReturnType<typeof setMinMaxGrade>
export type SetCurrentGradeActionType = ReturnType<typeof setCurrentGrade>
export type SetSortCardsMethodActionType = ReturnType<typeof setSortCardsMethod>
export type SetCardQuestionActionType = ReturnType<typeof setCardQuestion>
export type SetCardAnswerActionType = ReturnType<typeof setCardAnswer>

export type CardsActionsType =
    | SetCardsActionType
    | SetCardsCurrentPageActionType
    | SetCardsPerPageActionType
    | SetCardsTotalCountActionType
    | SetCurrentCardsDeckIDActionType
    | SetMinMaxGradeActionType
    | SetCurrentGradeActionType
    | SetSortCardsMethodActionType
    | SetCardQuestionActionType
    | SetCardAnswerActionType