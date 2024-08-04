import { userService } from "../../services/user.service.js";
import { SET_USER } from "../reducers/user.reducer.js";
import { store } from "../store.js";


export async function login(credentials) {
    const loggedinUser = await userService.login(credentials)
    console.log('loggedInUser:', loggedinUser)
    store.dispatch({ type: SET_USER, loggedinUser })
}

export async function logOut() {
    await userService.logOut()
    store.dispatch({ type: SET_USER, loggedinUser: null })
}