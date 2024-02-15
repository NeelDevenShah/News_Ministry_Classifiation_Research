import React from 'react'
import { Link } from 'react-router-dom'
import userContext from '../context/Users/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'
import profile from '../images/profile.jpg'
// import noteContext from '../context/Notes/NoteContext';


const Navbar = (props) => {

    const navigate = useNavigate();
    // const [islogeedin, setislogeedin] = useState(false)
    const context = useContext(userContext);
    const { isauthenticated, setisauthenticated } = context

    // const ntcontext = useContext(noteContext)
    // const { authtoken,setauthtoken} = ntcontext


    const handlelogout = () => {

        // setauthtoken("");
        localStorage.removeItem("auth-token");
        // props.showalert("Logged out successfully", "success");
        // navigate("/login")
        setisauthenticated(false);
        navigate('/');
    }


    // let location = useLocation();

    // useEffect(() => {

    // }, [location])

    return (
        <>
            <nav className="navbar navbar-expand-lg shadow m-2 bg-white" style={{ borderRadius: "25px" }}>
                <div className="container-fluid">
                    <Link className="mx-2 navbar-brand " to=""><img style={{ width: "150px", marginLeft: "10px" }} src={logo} alt="" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/* <Link className={`nav-link ${isauthenticated?"":"d-none"}   ${location.pathname == "/home" ? "active" : ""}`} to="/home">Dashboard</Link> */}
                            </li>
                            <li className="nav-item">
                                {/* <Link className={`nav-link ${location.pathname == "/about" ? "active" : ""}`} to="/about">About</Link> */}
                            </li>
                        </ul>
                        <Link className={`btn btn-dark mx-1 d-${isauthenticated ? "none" : ""}`} style={{ borderRadius: "10px" }} to="/login" role="button">Login <i class="fa-solid fa-right-to-bracket"></i></Link>

                        <div className={`d-flex ${isauthenticated ? "" : "d-none"}`}>
                            <li style={{ listStyle: "none" }}>
                                <Link className="dropdown-item" to="/user/profile">
                                    <img src={profile} alt="User Profile" className="img-fluid rounded-circle" style={{ width: "35px", height: "35px" }} />
                                </Link>
                            </li>

                            <li className="nav-item dropdown d-flex" style={{ listStyle: "none", marginRight: "50px" }}>
                                <p className=" my-auto mx-2 mt-auto ">John Doe</p>
                                <a className="nav-link my-auto dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/user/profile">My Account</Link></li>
                                    <li><a className="dropdown-item text-danger" onClick={handlelogout} >Logout</a></li>
                                </ul>
                            </li>
                        </div>



                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar