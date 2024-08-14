import { light } from "@mui/material/styles/createPalette"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { SOCKET_EMIT_SEND_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ADD_MSG, socketService } from "../services/socket.service.js"


export function ChatRoom({ toyId }) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])

    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, toyId)
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedinUser?.username || 'Me'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    return <div className="toy-chat">
        <h2>Toy Chat</h2>
        <ul>
            {msgs.map((msg, idx) =>
            (<li key={idx}>
                {msg.from}: {msg.txt}
            </li>))}
        </ul>
        <form onSubmit={sendMsg}>
            <input
                type="text"
                value={msg.txt}
                onChange={handleFormChange}
                name="txt"
                autoComplete="off" />
            <button>Send</button>
        </form>

    </div >
}