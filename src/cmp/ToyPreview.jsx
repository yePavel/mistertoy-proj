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
            <img className="toy-img" src={`./src/assets/imgs/${toy.name}.png`} alt="" />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {toy.inStock ?
                <span className='green-mark'>IN STOCK!</span> :
                <span className='red-mark'>SOLD OUT</span>
            }
            <div>
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
                <Link to={`/toy/${toy._id}`}>Details</Link>
            </div>

            <button className="remove-btn" onClick={() => onRemoveToy(toy._id)}>X</button>
        </article>
    )
}