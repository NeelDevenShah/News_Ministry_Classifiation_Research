import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const DashboardNavbar = () => {

    useEffect(() => {
        const button1 = document.getElementById('allnews')
        button1.click()
    }, [])

    let navigate = useNavigate()

    const fetchnews = async (type) => {
        let url = `http://localhost:5000/ministry/${type}`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
        });
        let json = await response.json()
        let articles = await json.news

        navigate('/user/dashboard/news', { state: { articles, title: type } })
    }

    const fetchstats = async () => {
        let url = "http://localhost:5000/ministry/stats"
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
        });
        let json = await response.json()
        navigate('/user/dashboard/stats', { state: { stats: json } })
    }

    return (
        <>
            <nav className='navbar p-1 bg-white shadow d-block w-100' style={{ borderRadius: "25px" }}>
                <div className="mx-3">
                    <button id='btnnavtoggle' className="navbar-toggler my-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ border: "0px" }}>
                        <span className="navbar-toggler-icon" ></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent1">
                        {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${isauthenticated ? "" : "d-none"}   ${location.pathname == "/home" ? "active" : ""}`} to="/home">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname == "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul> */}
                        <button onClick={() => { fetchnews("fetchministryallnews") }} className="btn btn-dark mx-2 my-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" style={{ borderRadius: "25px" }} id='allnews'>All News</button>

                        <button onClick={() => { fetchnews("fetchfakenews") }} className="btn btn-dark mx-2 my-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" style={{ borderRadius: "25px" }}>Fake News</button>
                        <button onClick={() => { fetchnews("fetchrealnews") }} className="btn btn-dark mx-2 my-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" style={{ borderRadius: "25px" }}>Real News</button>
                        <button onClick={() => { fetchnews("fetchpositivenews") }} className="btn btn-dark mx-2 my-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" style={{ borderRadius: "25px" }}>Postive News</button>
                        <button onClick={() => { fetchnews("fetchnegativenews") }} className="btn btn-dark mx-2 my-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" style={{ borderRadius: "25px" }}>Negative News</button>
                        <button onClick={() => { fetchnews("fetchneutralnews") }} className="btn btn-dark mx-2 my-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" style={{ borderRadius: "25px" }}>Nautral News</button>
                        <button onClick={fetchstats} className="btn btn-dark mx-2 my-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" style={{ borderRadius: "25px" }} >News Stats</button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default DashboardNavbar