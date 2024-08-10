import { reviewService } from '../../services/review'
import { SET_REVIEWS } from '../reducers/review.reducer.js'
import { store } from '../../store/store.js'

export async function loadReviews() {
    try {
        const reviews = await reviewService.query()
        store.dispatch({ type: SET_REVIEWS, reviews })
    } catch (err) {
        console.log('ReviewActions: err in loadReviews', err)
        throw err
    }
}

