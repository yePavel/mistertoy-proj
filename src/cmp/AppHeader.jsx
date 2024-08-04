import { NavLink, Link } from "react-router-dom";
import { UserMsg } from "./UserMsg.jsx";
import { useSelector } from "react-redux";
import { logOut } from "../store/actions/user.actions.js";

export function AppHeader() {
    const user = useSelector(state => state.userModule.loggedinUser)
    console.log('user:', user)

    function userLogOut() {
        logOut()
    }

    return <header className="app-header">
        <section className="header-container">
            <img className="toy-logo" src="/src/assets/imgs/toy-logo.png" alt="" />
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/toy" >Toys</NavLink>
                <NavLink to="/toy/dashboard" >Dashboard</NavLink>
                <NavLink to="/about" >About</NavLink>
                {user ?
                    <div className="user-container">
                        <img className="user-img" src="/src/assets/imgs/user-img.png" alt="" />
                        {`Welcome ${user.username} `}
                        <button onClick={userLogOut}>Log out</button>
                    </div> :
                    <div>
                        <Link to='/login'>Log in</Link>
                        <Link to='/'>Sign Up</Link>
                    </div>
                }
            </nav>
        </section>
        <UserMsg />
    </header>
}