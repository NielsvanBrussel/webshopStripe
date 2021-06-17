import React, { useContext } from 'react'
import { GlobalContext } from "../context/GlobalState";



const Dashboard = () => {

    const { email, loggedInStatus, currentEmail } = useContext(GlobalContext)

    const logOut = () => {
        loggedInStatus(false)
        currentEmail("")
    }

    return email ? (
        <div>
            <p>Welcome {email}!   <button className="btn" onClick={(e) => logOut()}>Logout</button></p>
        </div>
    ) : null
}

export default Dashboard
