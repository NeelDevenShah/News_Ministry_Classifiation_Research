import userContext from "./UserContext";
import { useState } from "react";
import { useEffect } from "react";
const UserState = (props) => {


    const [isauthenticated, setisauthenticated] = useState(false)
    const [user, setuser] = useState({})

    useEffect(() => {
        let authtoken = localStorage.getItem('auth-token')
        if (authtoken) {
            setisauthenticated(true)
        }
    }, [isauthenticated])



    return (
        <userContext.Provider value={{ isauthenticated, setisauthenticated,user,setuser }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState