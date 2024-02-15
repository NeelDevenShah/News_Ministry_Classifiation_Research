import React from 'react'
import Usersidebar from './Usersidebar'
import { Outlet } from 'react-router-dom'
import userContext from '../context/Users/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const User = () => {

    const context = useContext(userContext);
    const { isauthenticated, setisauthenticated } = context
    let navigate = useNavigate()

    useEffect(() => {

        if (!isauthenticated) {
            navigate('/')
        }

    }, [])

    return (
        <>
            <div className="d-flex" style={{ width: "100%" }}>
                <Usersidebar />
                <div className="abc" style={{ width: "83%", height: "200px" }}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default User