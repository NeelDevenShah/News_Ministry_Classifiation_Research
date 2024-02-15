import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import { Outlet } from 'react-router-dom'


export const Dashboard = () => {

    return (
        <>
            <div className='m-4'>
                <h2 className='mx-2 my-3'>
                    Dashboard
                </h2>
                <DashboardNavbar />
                <div className="daa">
                    <Outlet />
                </div>
            </div>

        </>
    )
}

