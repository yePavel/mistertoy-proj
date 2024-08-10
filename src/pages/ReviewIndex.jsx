import { useSelector } from "react-redux"
import { ReviewList } from "../cmp/ReviewList.jsx"
import { useEffect } from "react"
import { loadReviews, removeCarOptimistic } from "../store/actions/review.actions.js"


export function ReviewIndex() {
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    function removeReview(reviewId) {
        removeCarOptimistic(reviewId)
    }

    useEffect(() => {
        loadReviews()
    }, [])

    return <section className="review-index">
        <h2>Mister Toy Reviews</h2>
        <ReviewList reviews={reviews} onRemoveReview={removeReview} />
    </section>
}