import { Link } from "react-router-dom";
import { removeCarOptimistic } from "../store/actions/toy.actions.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export function ToyPreview({ toy }) {

    function onRemoveToy(toyId) {
        removeCarOptimistic(toyId)
            .then(showSuccessMsg(`${toyId} toy Removed!`))
            .catch(err => showErrorMsg('OOPs cannot remove toy...', err))
    }

    return (
        <article>
            <h4>{toy.name}💫</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>
            <button className="remove-btn" onClick={() => onRemoveToy(toy._id)}>X</button>
        </article>
    )
}