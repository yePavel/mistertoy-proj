import { Link } from "react-router-dom";
import { ToyPreview } from "./ToyPreview.jsx";

export function ToyList({ toys, onEditCar }) {
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    {/* <div>
                        <button onClick={() => onRemoveCar(car._id)}>x</button>
                        <button onClick={() => onEditCar(toy)}>Edit</button>
                    </div> */}

                </li>)}
        </ul>
    )
}