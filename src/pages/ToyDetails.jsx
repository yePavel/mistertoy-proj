import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toyService } from "../services/toy"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => {
                setToy(toy)
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
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
        </section>
    )
}