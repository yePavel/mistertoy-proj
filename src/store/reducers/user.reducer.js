import { userService } from "../../services/user.service"

export const SET_USER = 'SET_USER'

const initialState = {
    loggedinUser: userService.getLoggedInUser(),
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
            return { ...state, loggedinUser: action.loggedinUser }
        default:
            return state
    }
}