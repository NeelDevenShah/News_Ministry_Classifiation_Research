import React from 'react'

export const Alert = (props) => {

    return (
        <>
            {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
                <a href="#" className="alert-link"></a>{props.alert.message}
            </div>}
        </>
    )
}


export default Alert