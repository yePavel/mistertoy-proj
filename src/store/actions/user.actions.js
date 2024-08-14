import { socketService } from "../../services/socket.service.js";
import { userService } from "../../services/user.service.js";
import { SET_USER } from "../reducers/user.reducer.js";
import { store } from "../store.js";


export async function login(credentials) {
    try {
        const loggedinUser = await userService.login(credentials)
        store.dispatch({ type: SET_USER, loggedinUser })
        socketService.login(loggedinUser._id)
    }
    catch (err) {
        console.log('Cannot Login', err)
        throw err
    }
}

export async function logOut() {
    try {
        await userService.logOut()
        store.dispatch({ type: SET_USER, loggedinUser: null })
        socketService.logout()
    } catch (err) {
        console.log('Cannot log out', err)

        throw err
    }
}