import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toyService } from "../services/toy"
import { useSelector } from "react-redux";
import { loadReviews } from "../store/actions/review.actions.js";
import { ReviewPreview } from "../cmp/ReviewPreview.jsx";
import { ChatRoom } from "../cmp/ChatRoom.jsx";

export function ToyDetails() {
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => {
                setToy(toy)
                const filterBy = {
                    byUserId: '',
                    toyId: toy._id
                }
                loadReviews(filterBy)
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>

    return (
        <section className="main-toy-details-container">
            <div className="toy-details">
                <h1>{toy.name}</h1>
                <img className="toy-img" src={`./src/assets/imgs/${toy.name}.png`} alt="" />
                <h3 className="details-price">Price: ${toy.price}</h3>
                <h4 >
                    In stoke:
                    <span className={toy.inStock ? 'green-mark' : 'red-mark'}>
                        {toy.inStock ? ' yes' : ' no'}</span>
                </h4>
                <div className="toy-nav">
                    <Link to={`/toy/edit/${toy._id}`}
                        className="edit-details-btn"
                    >Edit
                    </Link> &nbsp;
                    <Link to={`/toy`}
                        className="edit-back-btn"
                    >Back
                    </Link>
                </div>
            </div>
            <ChatRoom toyId={toyId} />
            <div className="toy-reviews">
                <h2>Toy Reviews</h2>
                {reviews.length > 0 ? <ul className="list review-list">
                    {reviews.map(review =>
                        <li key={review._id}>
                            <ReviewPreview review={review} />
                        </li>)
                    }
                </ul> : <div className="toy-reviews">No Reviews</div>}
            </div>
        </section>
    )
}