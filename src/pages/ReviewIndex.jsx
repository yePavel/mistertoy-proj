import { useSelector } from "react-redux"
import { ReviewList } from "../cmp/ReviewList.jsx"
import { useEffect } from "react"
import { loadReviews } from "../store/actions/review.actions.js"


export function ReviewIndex() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    useEffect(() => {
        loadReviews()
    }, [])

    return <section className="review-index">
        <h2>Mister Toy Reviews</h2>
        <ReviewList reviews={reviews} />
    </section>
}