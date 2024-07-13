import { Link } from "react-router-dom";
import { ToyPreview } from "./ToyPreview.jsx";

export function ToyList({ toys }) {
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                </li>)}
        </ul>
    )
}