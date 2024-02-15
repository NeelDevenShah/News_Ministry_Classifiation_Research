import React from 'react'
import { useContext } from 'react';
import userContext from '../context/Users/UserContext';
import { redirect, redirectDocument, useLocation } from 'react-router-dom';

//6e3db17744b6412984f5f9b079e0d789
//23d19dac03ff4fb7817937055c914687

const Newsitem = (props) => {

    const handlereport = async () => {

        let url = 'http://localhost:5000/ministry/report'

        let data = {
            "newsid": props.id.toString(),
            'validation': validation == 'real' ? "fake" : "real"
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
            body: JSON.stringify(data)
        });

        redirect('/user/dashboard/news')
    }

    let location = useLocation()

    const context = useContext(userContext);
    const { isauthenticated, setisauthenticated } = context
    // console.log(location.pathname)

    let { title, description, Imageurl, url, date, author, validation, ministry } = props;

    return (
        <>
            <div className="col-md-10 my-2 mx-5">
                <div className="text-start bg-white shadow d-flex" style={{ width: "100%", height: "max-content", borderRadius: "25px" }}>
                    <span className={`position-absolute m-2 badge rounded-pill ${validation === "real" ? "bg-success" : "bg-danger"}`}>
                        {validation}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                    <img src={Imageurl} className="card-img-left rounded-4 m-3" alt="..." style={{ height: "220px", width: "350px" }} />

                    <div className=" mx-5 my-3 card-body w-25">
                        <h5 className="card-title">{title.length > 200 ? `${title.slice(0, 200)}...` : title}</h5>
                        <p className="card-text ">{description.length > 230 ? `${description.slice(0, 230)}...` : description}</p>
                        <p className="card-text"><small className="text-muted">on <strong>{date}</strong> by <strong>{author}</strong></small></p>
                        <span className={`mb-3 badge pill text-success border`}>
                            {ministry === "No Ministry" ? "General" : ministry.slice(12)}
                            <span className="visually-hidden"></span>
                        </span>
                        <br />
                        <a href={url} target='_blank' rel='noreferrer' className="btn btn-dark">Read More</a>

                        <button type="button" className={` mx-2 btn btn-dark ${(!isauthenticated) || (location.pathname !== "/user/dashboard/news") ? "d-none" : ""}`} data-bs-toggle="modal" data-bs-target={`#confirmationModal${props.id}`} >
                            <i className="fa-solid fa-flag"></i>
                        </button>

                        {/* <Link to={""} className={` mx-2 btn btn-dark ${(!isauthenticated) || (location.pathname !== "/user/dashboard/news") ? "d-none" : ""}`}></Link> */}
                    </div>
                </div>
            </div>

            <div className="modal fade" id={`confirmationModal${props.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirmation</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to Report News as <strong>{validation == 'real' ? "fake" : "real"}</strong>?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No</button>
                            <button type="button" onClick={handlereport} data-bs-dismiss="modal" className="btn btn-dark">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Newsitem