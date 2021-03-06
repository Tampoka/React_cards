import {AxiosResponse} from 'axios';
import {instance} from './axios-instance';

export const cardsAPI = {
    getCards: (payload?: GetCardsQueryParams) => instance
        .get<CardsResponse>('/cards/card', {params: payload}),

    createCard: (payload?: NewCardData) => instance
        .post<NewCardData, AxiosResponse<CardType>>('/cards/card', payload),

    deleteCard: (payload: DeleteCardData) => instance
        .delete<CardType>('/cards/card', {params: payload}),

    updateCard: (payload: UpdateCardData) => instance
        .put<UpdateCardData, AxiosResponse<CardType>>('/cards/card', payload),

    grade: (payload: GradeData) => instance
        .put<GradeData, AxiosResponse<GradeResponse>>('/cards/grade', payload)
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}

export type CardsResponse = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string|undefined
}

export type GetCardsQueryParams = {
    cardsPack_id?: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type NewCardData = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        rating?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
        type?: string
    }
}

export type UpdateCardData = {
    card: {
        _id: string
        question?: string
        answer?: string
    }
}

export type DeleteCardData = {
    id: string
}

export type GradeData = {
    card_id: string
    grade: number
}

export type GradeResponse = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}

