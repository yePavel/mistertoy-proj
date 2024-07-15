import { useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectOnUpdate } from "../hooks/useEffectOnUpdate.js"
import { toyService } from "../services/toy.service.local.js"

const toyLabels = toyService.getLabels()

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffectOnUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name: field, type } = target
        let value = target.value
        switch (type) {
            case 'number':
                value = +value || ''
                break;
            case 'checkbox':
                value = target.checked
                break;
            case 'select-multiple':
                value = Array.from(target.selectedOptions, option => option.value || [])
            default:
                break;
        }
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    const { labels } = filterByToEdit

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
            <div>
                <select
                    multiple
                    name="labels"
                    id="labels"
                    value={labels || []}
                    onChange={handleChange}
                >
                    <option value="">Labels</option>
                    {toyLabels.map(label => (
                        <option value={label} key={label} >
                            {label}
                        </option>
                    ))}
                </select>
            </div>

        </form>

    </section >

}