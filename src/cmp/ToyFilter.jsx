import { useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectOnUpdate } from "../hooks/useEffectOnUpdate.js"


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffectOnUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name: field, type } = target
        let value = target.value
        console.log('target.checked:', target.checked)
        switch (type) {
            case 'number':
                value = +value || ''
                break;
            case 'checkbox':
                value = target.checked
                break;
            default:
                break;
        }
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    console.log('filterByToEdit:', filterByToEdit)
    return <section className="toy-filter">
        <h2>Toys Filter:</h2>
        <form >
            <label htmlFor="name">Name:</label>
            <input type="text"
                id="name"
                name="txt"
                placeholder="By Name..."
                value={filterByToEdit.name}
                onChange={handleChange}
            />

            <label htmlFor="maxPrice">Max price:</label>
            <input type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="By max price"
                value={filterByToEdit.maxPrice || ''}
                onChange={handleChange}
            />
            <div>
                <label htmlFor="in-stock">In stock: </label>
                <input type="checkbox"
                    id="in-stock"
                    name="inStock"
                    checked={filterByToEdit.inStock}
                    onChange={handleChange}
                />
            </div>

        </form>

    </section>

}