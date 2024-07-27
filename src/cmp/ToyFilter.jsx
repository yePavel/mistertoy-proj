import { useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectOnUpdate } from "../hooks/useEffectOnUpdate.js"
import { toyService } from "../services/toy.service.js"

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

    function handleSort({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setFilterByToEdit(prevSort => ({
            ...prevSort,
            [field]: field === 'sortDir' ? -prevSort.sortDir : value,
        }))
    }
    const { labels } = filterByToEdit

    return <section className="toy-filter">
        <h2>Custom Filters</h2>
        <form >
            <input type="text"
                id="name"
                name="txt"
                placeholder="Search By Name.."
                value={filterByToEdit.name}
                onChange={handleChange}
            />

            <input type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="Search By max price.."
                value={filterByToEdit.maxPrice || ''}
                onChange={handleChange}
            />
            <div className={`in-stock ${filterByToEdit.inStock ? 'active' : ''}`}>
                <label htmlFor="in-stock">In stock </label>
                <input type="checkbox"
                    id="in-stock"
                    name="inStock"
                    checked={filterByToEdit.inStock}
                    onChange={handleChange}
                />
            </div>
            <div>
                <select name="sortBy" id="sort-by" className="sort-by-toys"
                    onChange={handleSort}>
                    <option value="">Sort By:</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Created at</option>
                </select>
            </div>
            <div className={`desc-dir ${filterByToEdit.sortDir > 0 ? '' : 'active'}`}>
                <label htmlFor="desc-dir">{filterByToEdit.sortDir > 0 ? 'Descending' : 'Acceding'}</label>
                <input
                    id="desc-dir"
                    type="checkbox"
                    name="sortDir"
                    checked={filterByToEdit.sortDir < 0}
                    onChange={handleSort}
                />
            </div>
            {toyLabels && <div >
                <select className="sort-by-labels"
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
            </div>}

        </form>

    </section >

}