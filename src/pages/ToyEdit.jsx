import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service.js";
import { saveToy } from "../store/actions/toy.actions.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export function ToyEdit() {
    const navigate = useNavigate()
    const { toyId } = useParams()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

    const labels = toyService.getLabels()

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
            return showErrorMsg('Insert Data...')
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => showErrorMsg('Error saving toy...', err))
    }

    function handleLabelChange({ target }) {
        const value = target.value
        setToyToEdit(prevToy => {
            const newLabels = prevToy.labels.includes(value)
                ? prevToy.labels.filter(label => label !== value)
                : [...prevToy.labels, value]
            return { ...prevToy, labels: newLabels }
        })
    }

    const { labels: selectedLabels } = toyToEdit

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

            <div className="labels-container">
                {labels.map(label => (
                    <div key={label}>
                        <input
                            type="checkbox"
                            id={label}
                            value={label}
                            checked={selectedLabels.includes(label)}
                            onChange={handleLabelChange}
                        />
                        <label htmlFor={label}>{label}</label>
                    </div>
                ))}
            </div>

            <div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Back</Link>
            </div>
        </form>
    </section>

}