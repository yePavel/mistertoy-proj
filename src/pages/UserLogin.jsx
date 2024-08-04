import { useState } from "react"
import { userService } from "../services/user.service.js"
import { login } from "../store/actions/user.actions.js"
import { useNavigate } from 'react-router-dom';

export function UserLogin() {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const navigate = useNavigate()

    function handleChange({ target }) {
        const { value, name: field } = target
        setCredentials(prevCredentials => ({ ...prevCredentials, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        login(credentials)
            .then(navigate('/'))
    }

    return <div>
        <h2>Welcome back!</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">User name: </label>
            <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter user name.."
                value={credentials.username}
                onChange={handleChange}
                required
                autoFocus
            />
            <label htmlFor="password">Password: </label>
            <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={handleChange}
                required
            />
            <button>Log In</button>
        </form>
    </div>
}