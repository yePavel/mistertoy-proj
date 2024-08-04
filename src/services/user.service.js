import { httpService } from "./http.service"

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    getEmptyCredentials,
    getLoggedInUser,
    login,
    logOut,
    // signUp,
    // updateUser,
}

async function login(userCred) {
    const loggedinUser = await httpService.post('auth/login', userCred)
    if (loggedinUser) {
        return saveLocalUser(loggedinUser)
    }
}

async function logOut() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}

function saveLocalUser(user) {
    user = { _id: user._id, username: user.username, fullname: user.fullname, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}
