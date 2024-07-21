import { showSuccessMsg } from "../../services/event-bus.service.js";
import { toyService } from "../../services/toy.service.js";
import {
    ADD_TOY,
    REMOVE_TOY,
    SET_FILTER_BY,
    SET_TOYS,
    TOY_UNDO,
    UPDATE_TOY
} from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export function loadToys() {
    const { filterBy } = store.getState().toyModule
    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type: type, toy: savedToy })
        })
}

export function removeCarOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })

    return toyService.remove(toyId)
        .then(() =>
            showSuccessMsg('Removed Toy!')
        )
        .catch(err => {
            store.dispatch({ type: TOY_UNDO })
            console.log('Cannot remove toy', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}