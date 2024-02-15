import React from 'react'
import googlelogo from "../images/google.png"
import authimg from '../images/auth.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import userContext from '../context/Users/UserContext';
import { useContext } from 'react';

const Login = () => {

    const context = useContext(userContext);
    const { isauthenticated, setisauthenticated, user, setuser } = context

    const [invalid, setinvalid] = useState(false)

    const [show, setshow] = useState(false)
    const handlePass = () => setshow(!show);

    let navigate = useNavigate()
    const handleclick = async (e) => {

        e.preventDefault();
        let email = document.getElementById("email").value
        let password = document.getElementById('password').value

        let data = { email, password }
        let url = "http://localhost:5000/auth/login"

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });


        let json = await response.json()
        localStorage.setItem("auth-token", json.authtoken)

        if (json.success) {
            setisauthenticated(true)

            setuser({"pankil":"pankil"})
            console.log(user)
            navigate('/user/profile')
        } else {
            setinvalid(true)
        }
    }
    return (
        <>
            <div className="d-flex m-5" style={{ width: '100%' }}>
                <div className="p-3 box-area" style={{ height: "700px" }}>
                    <div className="m-auto" style={{ width: "60%" }}>
                        <div className="row align-items-center">
                            <div className="header-text mb-4">
                                <h1><strong>Hello, Again</strong></h1>
                                <p className='mt-4'><h5>Enter your email and password to sign in!</h5></p>
                            </div>
                            <hr />
                            <form onSubmit={handleclick}>
                                <h6 className='my-4 mx-2' >Email</h6>
                                <div className="input-group mb-3">
                                    <input type="email" id='email' required className="form-control rounded-4 p-3 form-control-lg bg-light fs-6" placeholder="mail@example.com" />
                                </div>
                                <h6 className='my-4 mx-2'>Password</h6>
                                <div className="mb-1 justify-content-end">
                                    <input type={show ? "text" : "password"} id='password' required className="form-control rounded-4 p-3 form-control-lg bg-light fs-6 mb-2" placeholder="Min 8 characters" />
                                    <i className="fa-solid fa-eye"></i>
                                </div>
                                <div className={`text-center text-danger my-3 ${invalid ? "" : "d-none"}`}>
                                    Invalid Email/Password
                                </div>
                                <div className="input-group mb-5 d-flex justify-content-between">
                                    <div className="forgot my-4 mx-2">
                                        <small><a href="/" style={{ color: "blue" }}>Forgot Password?</a></small>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <button className="btn btn-lg rounded-4 w-100 fs-6" style={{ cursor: "pointer", backgroundColor: "black", color: "white", height: "50px" }} >Login</button>
                                </div>
                            </form>

                            <div className="input-group mb-3">
                                <button className="btn btn-lg btn-light w-100 fs-6"><img src={googlelogo} style={{ width: '20px' }} className="me-2" alt="Google Icon" /><small>Sign In with Google</small></button>
                            </div>
                        </div>
                    </div >
                </div>

                <div className="col-md-6 mx-5 my-auto right-box text-white">
                    <p className='m-auto shadow border p-2 rounded-5' style={{ width: "max-content", fontSize: "80px", verticalAlign: "center" }}>News Automation</p>
                    <div>
                        <img src={authimg} className="position-absolute" id="leftimg" style={{ width: '1400px', top: "15%", zIndex: "-5", borderRadius: "200px" }} alt="Logo" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login