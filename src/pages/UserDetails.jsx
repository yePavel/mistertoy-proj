import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { loadReviews } from '../store/actions/review.actions.js'
import { ReviewPreview } from "../cmp/ReviewPreview.jsx"

export function UserDetails() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    useEffect(() => {
        loadReviews(loggedinUser._id)
    }, [])

    return <section className="user-details-container">

        <h2>{`${loggedinUser.username} Profile`}</h2>
        <p>User name: {`${loggedinUser.username}`}</p>
        <p>Full name: {`${loggedinUser.fullname}`}</p>
        <p>Admin abilities: {`${loggedinUser.isAdmin ? 'YES' : 'NO'}`}</p>
        <ul className="list review-list">
            {reviews.map(review =>
                <li key={review._id}>
                    <ReviewPreview review={review} />
                </li>)
            }
        </ul>
    </section>

}