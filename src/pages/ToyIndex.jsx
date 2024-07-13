import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadToys, saveToy } from "../store/actions/toy.actions.js"
import { ToyList } from "../cmp/ToyList.jsx"

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('err:', err)
            })
    }, [])

    return <div>
        <h3>Mister Toys!</h3>
        <main>
            <ToyList toys={toys} />
        </main>
    </div>

}