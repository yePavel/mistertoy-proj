import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service.local.js";
import { saveToy } from "../store/actions/toy.actions.js";

export function ToyEdit() {
    const navigate = useNavigate()
    const { toyId } = useParams()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => {
                setToyToEdit(toy)
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.price || !toyToEdit.name)
            return console.log('Insert Data')
        saveToy(toyToEdit)
            .then(console.log('toy saved!'))
            .catch(err => console.log('err:', err))
    }

    return <section className="edit-toy-container">
        <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

        <form onSubmit={onSaveToy} >
            <label htmlFor="name">Name : </label>
            <input type="text"
                name="name"
                id="name"
                placeholder="Enter toy name..."
                value={toyToEdit.name}
                onChange={handleChange}
            />
            <label htmlFor="price">Price : </label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter price"
                value={toyToEdit.price}
                onChange={handleChange}
            />

            <div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Back</Link>
            </div>
        </form>
    </section>

}