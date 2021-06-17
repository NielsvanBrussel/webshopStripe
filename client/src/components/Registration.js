import React, { useState } from 'react'
import axios from "axios";



const Registration = () => {

    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [registered, setRegistered] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    
    const ErrorMessage = () => {
        return (<h3>{errorMessage}</h3>)
    }

    const onSubmit = e => {
        e.preventDefault()
        
        if (password === passwordConfirm) {
            
            const config = {
                headers: {
                  'Content-Type': 'application/json'
                },
                
            }
    
            axios.post("/api/user/register", { name: name, email: email, password: password }, { withCredentials: true }, config)
            .then(res => {
                console.log(res)
                setRegistered(true)
            })
            .catch(err => {
              
              setErrorMessage(err.request.response);
            });
            
        } else {
            setErrorMessage("Passwords do not match!")
        }}
        
        
        if (registered === false) {

            return (
                <>
                    <h3>Register</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-control">
                            <label htmlFor="text">Name</label>
                            <input type="text" value={name}  onChange={(e) => setName(e.target.value)} placeholder="enter name" required/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="text">Email</label>
                            <input type="text" value={email}  onChange={(e) => setEmail(e.target.value)} placeholder="enter email" required/>
                        </div>
                        <div className="form-control">
                        <label htmlFor="text">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required/>
                        </div>
                        <div className="form-control">
                        <label htmlFor="text">Confirm Password</label>
                            <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="Confirm password" required/>
                        </div>
                        <button className="btn">Register</button>
                    </form>
                    <ErrorMessage />  
                </>)
            
        } else {
            return (
                <>
                    <h3>You are now Registered</h3>               
                </>
                )
        }
        
        
    }

export default Registration
