import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service.js";

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
            <h4>Price: ${toy.price}</h4>
            <h4>In stoke: {toy.inStock ? 'yes' : 'no'}</h4>
            <div className="toy-nav">
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
                <Link to={`/toy`}>Back</Link>
            </div>
        </section>
    )
}