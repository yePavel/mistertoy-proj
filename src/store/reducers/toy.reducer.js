import { toyService } from "../../services/toy.service.local.js"

export const SET_TOYS = 'SET_TOYS'
export const UPDATE_TOY = 'UPDATE_TOY'
export const ADD_TOY = 'ADD_TOY'

const initialState = {
    toys: [],
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            }
        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, action.toy]
            }
        default:
            return state
    }
}