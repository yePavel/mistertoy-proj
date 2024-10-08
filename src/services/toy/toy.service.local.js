
import { storageService } from '../async-storage.service.js'
import { utilService } from '../util.service.js'

const STORAGE_KEY = 'toyDB'
_createToys()


export const toyService = {
    query,
    getById,
    save,
    remove,
    getLabels,
    getLabelCounts
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            var filteredToys = toys
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            const regExp = new RegExp(filterBy.txt, 'i')
            filteredToys = filteredToys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice
            )
            if (filterBy.inStock)
                filteredToys = filteredToys.filter(toy => toy.inStock === true)
            if (filterBy.labels && filterBy.labels.length) {
                filteredToys = filteredToys.filter(toy =>
                    filterBy.labels.every(label => toy.labels.includes(label))
                )
            }
            if (filterBy.sortBy === 'name') {
                filteredToys.sort((t1, t2) => {
                    return t1.name.localeCompare(t2.name) * filterBy.sortDir
                })
            }
            else if (filterBy.sortBy === 'price' ||
                filterBy.sortBy === 'createdAt') {
                filteredToys.sort((t1, t2) => {
                    return (t1.price - t2.price) * filterBy.sortDir
                })
            }
            return filteredToys
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

        return storageService.post(STORAGE_KEY, toy)
    }
}

function getLabelCounts() {
    return query().then(toys => {
        const labelCounts = {}
        toys.forEach(toy => {
            toy.labels.forEach(label => {
                if (labelCounts[label])
                    labelCounts[label]++
                else labelCounts[label] = 1
            });
        })

        const labelsArray = Object.entries(labelCounts).map(
            ([label, count]) => ({
                label,
                count
            })
        )
        return Promise.resolve(labelsArray)
    })
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        const names = ['Talking Doll', 'Racing Car', 'Lego Set', 'Stuffed Bear', 'Doll', 'Puzzle Box',
            'Action Figure', 'Wheels', 'Art', 'Treasure']
        for (let i = 0; i < 20; i++) {
            const txt = names[utilService.getRandomIntInclusive(0, names.length - 1)]
            const currToy = _createToy(txt,
                utilService.getRandomIntInclusive(10, 50))
            if (i % 2 === 0) currToy.inStock = true
            toys.push(currToy)
        }
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _createToy(name, price) {
    const todo = getEmptyToy(name, price)
    todo.labels = []
    const toysLabels = [
        'On wheels',
        'Box game',
        'Art',
        'Baby',
        'Doll',
        'Puzzle',
        'Outdoor',
        'Battery Powered'
    ]
    for (let i = 0; i <= 3; i++) {
        const label = toysLabels[utilService.getRandomIntInclusive(0, toysLabels.length - 1)]
        todo.labels.push(label)
    }
    todo._id = utilService.makeId()
    todo.createdAt = todo.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return todo
}

function getEmptyToy(name = '', price = 0) {
    return { name, price, inStock: true, labels: [] }
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





