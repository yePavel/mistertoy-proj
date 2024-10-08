import { httpService } from '../http.service'
const BASE_URL = 'review/'

export const reviewService = {
    query,
    add,
    remove,
}

function query(filterBy) {
    var queryStr = filterBy ? `${BASE_URL}?byUserId=${filterBy.byUserId}&toyId=${filterBy.toyId}` : ''
    return httpService.get(queryStr)
}

async function remove(reviewId) {
    await httpService.delete(BASE_URL + reviewId)
}

async function add({ txt, aboutUserId }) {
    return await httpService.post(`review`, { txt, aboutUserId })
}