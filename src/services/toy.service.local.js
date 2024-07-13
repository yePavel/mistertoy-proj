
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
const myToys = _createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            const regExp = new RegExp(filterBy.txt, 'i')
            return toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice
            )
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        const names = ['Talking Doll', 'Racing Car', 'Lego Set', 'Stuffed Bear', 'Doll', 'Puzzle Box',
            'Action Figure', 'Toy Train', 'Building Blocks', 'Board Game']
        for (let i = 0; i < 20; i++) {
            const txt = names[utilService.getRandomIntInclusive(0, names.length - 1)]
            toys.push(_createToy(txt,
                utilService.getRandomIntInclusive(10, 50)))
        }
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _createToy(name, price) {
    const todo = getEmptyToy(name, price)
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
    todo.labels = []
    for (let i = 0; i <= 3; i++) {
        const label = labels[utilService.getRandomIntInclusive(0, labels.length - 1)]
        todo.labels.push(label)
    }
    todo._id = utilService.makeId()
    todo.createdAt = todo.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return todo
}

function getEmptyToy(name = '', price = 0) {
    return { name, price, inStock: true }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', inStock: false, labels: [], SortBy: '' }
}



