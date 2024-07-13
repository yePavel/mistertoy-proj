import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadToys, setFilterBy } from "../store/actions/toy.actions.js"
import { ToyList } from "../cmp/ToyList.jsx"
import { Link } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { ToyFilter } from "../cmp/ToyFilter.jsx"


export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
            .then(showSuccessMsg('Toys loaded!'))
            .catch(err => {
                showErrorMsg('OOPs try again')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return <div>
        <h3>Mister Toys!</h3>
        <main>
            <button><Link to='/toy/edit'>Add Toy</Link></button>
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <ToyList toys={toys} />
        </main>
    </div>

}