import { toyService } from "../../services/toy.service.local.js";
import { ADD_TOY, REMOVE_TOY, SET_TOYS, UPDATE_TOY } from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export function loadToys() {
    return toyService.query()
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
}

export function saveToy(toy) {
    console.log('toy:', toy)
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            console.log('savedToy:', savedToy)
            store.dispatch({ type: type, toy: savedToy })
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => store.dispatch({ type: REMOVE_TOY, toyId }))
}