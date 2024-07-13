import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadToys, removeToy } from "../store/actions/toy.actions.js"
import { ToyList } from "../cmp/ToyList.jsx"
import { Link } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
            .then(showSuccessMsg('Toys loaded!'))
            .catch(err => {
                showErrorMsg('OOPs try again')
            })
    }, [])


    return <div>
        <h3>Mister Toys!</h3>
        <main>
            <button><Link to='/toy/edit'>Add Toy</Link></button>
            <ToyList toys={toys} />
        </main>
    </div>

}