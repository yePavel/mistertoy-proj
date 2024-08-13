import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { loadReviews } from '../store/actions/review.actions.js'
import { ReviewPreview } from "../cmp/ReviewPreview.jsx"

export function UserDetails() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    useEffect(() => {
        const filterBy = {
            byUserId: loggedinUser._id || '',
            toyId: ''
        }
        loadReviews(filterBy)
    }, [])

    return <section className="main-user-details-container">
        <div className="user-details">
            <h2>{`${loggedinUser.username} Profile`}</h2>
            <p>User name: {`${loggedinUser.username}`}</p>
            <p>Full name: {`${loggedinUser.fullname}`}</p>
            <p>Admin abilities: {`${loggedinUser.isAdmin ? 'YES' : 'NO'}`}</p>
        </div>
        <div className="user-reviews">
            <ul className="review-list">
                <h2>User Reviews</h2>
                {reviews.map(review =>
                    <li key={review._id}>
                        <ReviewPreview review={review} />
                    </li>)
                }
            </ul>
        </div>
    </section>

}