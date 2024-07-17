import { httpService } from "./http.service.js"
const BASE_URL = 'toy/'

export const toyService = {
    query,
    save,
    getById,
    remove,
    getDefaultFilter,
    getLabels,
    getEmptyToy
}

function query(filterBy = {}) {
    console.log('filterBy:', filterBy)
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

function getDefaultFilter() {
    return {
        txt: '',
        maxPrice: '',
        inStock: false,
        labels: [],
        sortBy: '',
        sortDir: 1
    }
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

function getEmptyToy(name = '', price = 0) {
    return { name, price, inStock: true, labels: [] }
}