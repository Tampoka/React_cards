import axios, {AxiosResponse} from "axios";
import {instance} from "./auth-api";


export const packsAPI = {
    getCardPacks: (payload?: GetCardPacksQueryParams) => instance
        .get<CardsPackResponse>('/cards/pack', {params: payload}),

    createCardsPack: (payload: NewCardsPackData) => instance
        .post<NewCardsPackData, AxiosResponse<CardsPackType>>('/cards/pack', payload),

    deleteCardsPack: (payload: DeleteCardsPackData) => instance
        .delete<CardsPackType>('/cards/pack', {params: payload}),

    updateCardsPack: (payload: UpdateCardsPackData) => instance
        .put<UpdateCardsPackData, AxiosResponse<CardsPackType>>('/cards/pack', payload),
}



export type CardsPackType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

export type CardsPackResponse = {
    cardPacks: CardsPackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type GetCardPacksQueryParams = {
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
    packName?: string
}

export type NewCardsPackData = {
    cardsPack: {
        name: string
        private?: boolean
    }
}

export type UpdateCardsPackData = {
    cardsPack: {
        _id: string
        name: string
    }
}

export type DeleteCardsPackData = {
    id: string
}