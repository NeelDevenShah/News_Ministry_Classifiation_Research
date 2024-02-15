import React from 'react'
import profile from '../images/profile.jpg'
const Profile = () => {
    return (
        <>
            <div className="container border shadow bg-white rounded-4 mt-5" style={{ width: "90%" }}>
                <div className="row">
                    <div className="col-md-4 my-4">
                        <img
                            src={profile}
                            alt="Profile"
                            className="img-fluid rounded-circle"
                        />
                    </div>
                    <div className="col-md-8 my-5">
                        <h1>{'John Doe'}</h1>
                        <p>Finance Minister</p>
                        <p><strong>Birthdate:</strong> {'18/12/2004'}</p>
                        <p><strong>Phone Number:</strong> {'1234566778'}</p>
                        <p><strong>Gmail:</strong> {'1234@gmail.com'}</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Profile