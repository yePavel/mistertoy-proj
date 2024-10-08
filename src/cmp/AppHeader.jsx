import { NavLink, Link } from "react-router-dom";
import { UserMsg } from "./UserMsg.jsx";
import { useSelector } from "react-redux";
import { logOut } from "../store/actions/user.actions.js";

export function AppHeader() {
    const user = useSelector(state => state.userModule.loggedinUser)

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
                <NavLink to="/review" >Reviews</NavLink>
                <NavLink to="/about" >About</NavLink>
                {user ?
                    <div className="user-container">
                        <NavLink to="userDetails" className={'user-link'} >
                            <img className="user-img" src="/src/assets/imgs/user-img.png" alt="" />
                        </NavLink>
                        {`Welcome ${user.username} `}
                        <NavLink className={'user-link'} to="/" >
                            <button onClick={userLogOut}>Log out</button>
                        </NavLink>
                    </div> :
                    <div className="user-container">
                        <Link to='/login'>Log in</Link>
                        <Link to='/'>Sign Up</Link>
                    </div>
                }
            </nav>
        </section>
        <UserMsg />
    </header>
}