import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Homenavbar = () => {

    useEffect(() => {
        const button1 = document.getElementById('allnews')
        button1.click()
    }, [])

    let navigate = useNavigate()

    const fetchnews = async (type) => {
        // let url = `http://localhost:5000/fetchallnews`
        // const response = await fetch(url, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "auth-token": localStorage.getItem("auth-token")
        //     },
        // });
        // let json = await response.json()
        // let articles = await json.news

        // navigate('/user/dashboard/news', { state: { articles, title: type } })
    }
    return (
        <>
            <nav className='navbar navbar-expand-lg shadow m-3 p-1 bg-white d-block' style={{ borderRadius: "20px",width:"90%"}}>
                <div className="mx-3">
                    <button id='btnnavtoggle' className="navbar-toggler my-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ border: "0px" }}>
                        <span className="navbar-toggler-icon" ></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent1">
                        <button onClick={() => { fetchnews("fetchministryallnews") }} className="btn btn-dark mx-2 my-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" style={{ borderRadius: "25px" }} id='allnews'>All News</button>

                        <a onClick={() => { fetchnews("fetchfakenews") }} className="text-dark mx-2 my-2 text-decoration-none" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" style={{ borderRadius: "25px",cursor:"pointer" }}>Fake News</a>
                        <a onClick={() => { fetchnews("fetchfakenews") }} className="text-dark mx-2 my-2 text-decoration-none" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" style={{ borderRadius: "25px",cursor:"pointer" }}>Education</a>
                        <a onClick={() => { fetchnews("fetchfakenews") }} className="text-dark mx-2 my-2 text-decoration-none" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" style={{ borderRadius: "25px",cursor:"pointer" }}>Finance</a>
                        <a onClick={() => { fetchnews("fetchfakenews") }} className="text-dark mx-2 my-2 text-decoration-none" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" style={{ borderRadius: "25px",cursor:"pointer" }}>Health</a>
                        <a onClick={() => { fetchnews("fetchfakenews") }} className="text-dark mx-2 my-2 text-decoration-none" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" style={{ borderRadius: "25px",cursor:"pointer" }}>Sports</a>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Homenavbar