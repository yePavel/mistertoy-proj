import { toyService } from "../../services/toy.service.js"

export const SET_TOYS = 'SET_TOYS'
export const UPDATE_TOY = 'UPDATE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const TOY_UNDO = 'TOY_UNDO'

const initialState = {
    toys: [],
    filterBy: toyService.getDefaultFilter()
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
        case REMOVE_TOY:
            const lastToys = [...state.toys]
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== action.toyId),
                lastToys
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }
        case TOY_UNDO:
            return {
                ...state,
                toys: [...state.toys]
            }
        default:
            return state
    }
}