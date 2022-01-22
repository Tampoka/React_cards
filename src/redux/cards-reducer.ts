import {CardsResponse} from '../api/cards-api';

const initialState:CardsInitialStateType={
    cards:[],
    page: 1,
    pageCount: 10,
    cardsTotalCount: 0,
    packUserId: '',
    minGrade: 0,
    maxGrade: 0,
    currentCardsPackID: '',
    sortCardsMethod: undefined,
    currentGrade: [0, 0],
    countPerPage: [10, 25, 50]
}

// export const cardsReducer=(state=initialState,action:CardsActionsType):CardsInitialStateType=>{
//     switch (action.type) {
//         default:
//             return state
//     }
// }
//





//TYPES

export type CardsInitialStateType = CardsResponse & {
    currentCardsPackID: string
    sortCardsMethod: string | undefined
    currentGrade: number[]
    countPerPage: number[]
}
// export type CardsActionsType={}