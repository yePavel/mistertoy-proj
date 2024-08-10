import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { loadReviews } from '../store/actions/review.actions.js'

export function UserDetails() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    console.log("🚀 ~ UserDetails ~ reviews:", reviews)

    useEffect(() => {
        loadReviews()
    }, [])

    return <section className="user-details-container">

        <h2>{`${loggedinUser.username} Profile`}</h2>
        <p>User name: {`${loggedinUser.username}`}</p>
        <p>Full name: {`${loggedinUser.fullname}`}</p>
        <p>Admin abilities: {`${loggedinUser.isAdmin ? 'YES' : 'NO'}`}</p>


    </section>

}