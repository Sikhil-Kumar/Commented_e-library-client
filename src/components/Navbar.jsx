import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


// Define Navbar functional component
function Navbar() {
// Check if admin is logged in by looking for adminToken in localStorage
    const isAdmin = localStorage.getItem('adminToken')
// Check if student is logged in by looking for token in localStorage
    const isStudent = localStorage.getItem('token')


    const navigate = useNavigate()
     // Function to handle logout for both admin and student
    const handleLogout = () => {
        if (isStudent) {
            // If student is logged in, remove their token from localStorage
            localStorage.removeItem('token')
        }

        // If admin is logged in, remove their token from localStorage
        if (isAdmin) {
            localStorage.removeItem('adminToken')
        }

        // After logging out, navigate to login page
        navigate('/login')
    }

    let location = useLocation();

   

    // returning jsx file 

    return (
        <div>
            <nav className=" navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><i>eSeller</i></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            {localStorage.getItem('adminToken')? <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/items' ? "active" : ""}`} to="/items">Items</Link> 
                            </li> : ''}

                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                           {localStorage.getItem('token')? <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/Products2' ? "active" : ""}`} to="/Products2">Products</Link> 
                            </li> : ''}


                        </ul>

                        {localStorage.getItem('token') || localStorage.getItem('adminToken') ?<button onClick={handleLogout} className='btn btn-primary'>Logout</button>: <div>
                            <Link className='btn btn-primary mx-2 btn-sm' to='/login' role='button'>Login</Link>
                            <Link className='btn btn-primary mx-1 btn-sm' to='/signup' role='button'>SignUp</Link>
                            </div> }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar