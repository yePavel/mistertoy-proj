import { NavLink } from "react-router-dom";

export function AppHeader() {
    return <header className="app-header">
        <section className="header-container">
            <h1>Mister Toy!</h1>
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/toy" >Toys</NavLink>
                <NavLink to="/about" >About</NavLink>
            </nav>
        </section>
        {/* <UserMsg /> */}
    </header>
}