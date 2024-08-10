const { VITE_LOCAL } = import.meta.env

import { toyService as local } from './toy.service.local'
import { toyService as remote } from './toy.service.remote'


function getEmptyToy(name = '', price = 0) {
    return { name, price, inStock: true, labels: [] }
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


const service = VITE_LOCAL === 'true' ? local : remote
export const toyService = { getEmptyToy, getDefaultFilter, ...service }




