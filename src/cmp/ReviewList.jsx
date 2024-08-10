import { userService } from "../services/user.service"
import { ReviewPreview } from "./ReviewPreview.jsx"


export function ReviewList({ reviews, onRemoveReview }) {

    function shouldShowActionBtns(review) {
        const user = userService.getLoggedInUser()
        if (!user) return false
        if (user.isAdmin) return true
        return review.byUser?._id === user._id
    }

    return (
        <section>
            <ul className="list review-list">
                {reviews.map(review =>
                    <li key={review._id}>
                        <ReviewPreview review={review} />
                        {/* {shouldShowActionBtns(review) && <div className="actions">
                            <button onClick={() => onRemoveReview(review._id)}>x</button>
                        </div>} */}
                    </li>)
                }
            </ul>
        </section>
    )
}