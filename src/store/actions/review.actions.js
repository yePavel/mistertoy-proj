import { reviewService } from '../../services/review'
import { REMOVE_REVIEW, SET_REVIEWS } from '../reducers/review.reducer.js'
import { store } from '../../store/store.js'


export async function loadReviews(filterBy) {
    try {
        const reviews = await reviewService.query(filterBy)
        store.dispatch({ type: SET_REVIEWS, reviews })
    } catch (err) {
        console.log('ReviewActions: err in loadReviews', err)
        throw err
    }
}

export function removeCarOptimistic(reviewId) {
    store.dispatch({ type: REMOVE_REVIEW, reviewId })

    return reviewService.remove(reviewId)
        .then(() =>
            showSuccessMsg('Removed Toy!')
        )
        .catch(err => {
            store.dispatch({ type: REMOVE_REVIEW })
            console.log('Cannot remove review', err)
            throw err
        })
}

