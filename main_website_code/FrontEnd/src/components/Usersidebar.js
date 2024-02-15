import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import profile from '../images/profile.jpg'

const Usersidebar = () => {
    let navigate = useNavigate()

    const fetchnews = async (type) => {
        let url = `http://localhost:5000/api/ministry/${type}`
        let data = { userid: "64fd878edcd475a8a158ff44" }
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
            body: JSON.stringify(data),
        });
        let json = await response.json()
        let articles = await json.news

        navigate('/dashboard/news', { state: { articles } })
    }

    const fetchstats = async () => {
        let url = "http://localhost:5000/api/ministry/stats"
        let data = {
            userid: "64fd878edcd475a8a158ff44"
        }
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
            body: JSON.stringify(data),
        });
        let json = await response.json()
        navigate('/dashboard/stats', { state: { stats: json } })
    }

    return (
        <>
            <nav className='navbar navbar-expand-lg m-3 p-1 bg-white shadow d-block' style={{ height: "80vh", width: "250px", borderRadius: "25px" }}>
                <div className="container d-block">
                    <ul className='list my-2 p-2 '>
                        <li className="list-group-item my-4 ">
                            <h5 className='text-dark text-decoration-none'>
                                News Automation
                            </h5>
                        </li>
                        <hr/>
                        <li className="list-group-item my-4  ">
                            <Link to="/user/profile" className='text-dark text-decoration-none'><i className="fa-solid fa-house"></i> Profile</Link>
                        </li>
                        <li className="list-group-item my-4  ">
                            <Link to="/user/dashboard" className='text-dark text-decoration-none'><i className="fa-regular fa-newspaper"></i> News</Link>
                        </li>
                        <li className="list-group-item my-4">
                            <Link to="/user/report" className='text-dark text-decoration-none'><i className="fa-solid fa-flag"></i> Report News</Link>
                        </li>
                        <li className="list-group-item my-4">
                            <Link to="" className='text-dark text-decoration-none'><i className="fa-regular fa-pen-to-square"></i> Edit Profile</Link>
                        </li>
                    </ul>


                    <ul className='list p-2' style={{ marginTop: "150%" }}>
                        <li className="list-group-item my-4 d-flex ">
                            <img src={profile} alt="User Profile" className="img-fluid rounded-circle" style={{ width: "35px", height: "35px" }} />
                            <p className=" mb-0 mx-2 mt-auto ">John Doe</p>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}


export default Usersidebar