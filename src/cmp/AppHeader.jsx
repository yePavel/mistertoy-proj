import { NavLink } from "react-router-dom";
import { UserMsg } from "./UserMsg.jsx";

export function AppHeader() {
    return <header className="app-header">
        <section className="header-container">
            <img className="toy-logo" src="/src/assets/imgs/toy-logo.png" alt="" />
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/toy" >Toys</NavLink>
                <NavLink to="/toy/dashboard" >Dashboard</NavLink>
                <NavLink to="/about" >About</NavLink>
            </nav>
        </section>
        <UserMsg />
    </header>
}