import React, { useState, useContext } from 'react'
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [errorMessage, setErrorMessage] = useState("")
    const { currentEmail, loggedInStatus, loggedIn } = useContext(GlobalContext)

    const ErrorMessage = () => {
        return (<h3>{errorMessage}</h3>)
    }

    const logOut = () => {
        loggedInStatus(false)
        currentEmail("")
    }

    const onSubmit = e => {
        e.preventDefault()
        
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }

        axios.post("/api/user/login", { email: email, password: password }, config)
        .then(res => {
            console.log(res)
            loggedInStatus(true)
            currentEmail(email)

        })
        .catch(err => {
          console.log(err.request.response);
          setErrorMessage(err.request.response)
                
      });
        }
        if (loggedIn === false) {

            return (
                <>
                    <h3>Please Log In</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-control">
                            <label htmlFor="text">Email</label>
                            <input type="text" value={email}  onChange={(e) => setEmail(e.target.value)} placeholder="enter email" required/>
                        </div>
                        <div className="form-control">
                        <label htmlFor="text">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required/>
                        </div>
                        <button className="btn btn-large blue">Login</button>
                    </form>
                    <ErrorMessage />  
               
                </>)
            
        } else {
            return (
                <>
                    <h3>Welcome {email}</h3>
                    <button className="btn" onClick={(e) => logOut()}>Logout</button>
               
                </>
                )
        }
                
    }

export default Login
