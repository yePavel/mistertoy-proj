import { object } from "yup"
import { httpService } from "../http.service.js"
const BASE_URL = 'toy/'

export const toyService = {
    query,
    save,
    getById,
    remove,
    getLabels,
    getLabelCounts,
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, { filterBy })
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function save(toy) {
    const method = toy._id ? 'put' : 'post'
    return httpService[method](BASE_URL, toy)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function getLabelCounts() {
    return httpService.get(BASE_URL + 'dashboard')
}

function getLabels() {
    const labels = [
        'On wheels',
        'Box game',
        'Art',
        'Baby',
        'Doll',
        'Puzzle',
        'Outdoor',
        'Battery Powered'
    ]
    return labels
}

