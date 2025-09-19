


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css"

// Define Login functional component
const Login = (props) => {

     // State to store email and password entered by the user
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    
    // State to control whether Admin or Student is logging in
    const [admin, setAdmin] = useState(false);

   
    const [student, setStudent] = useState(false);

       // State to show/hide the choice buttons initially
    const [truth, setTruth] = useState(true);

     // For navigation after login
    const navigate = useNavigate();

     // Backend server URL
    const host = "https://e-library-server-jyjf.onrender.com";

// useEffect to add/remove a background class when the component mounts/unmounts
    useEffect(() => {
        document.body.classList.add('login-signup-background'); // Add background class on load
        return () => {
          document.body.classList.remove('login-signup-background'); // Clean up when component unmounts
        };
      }, []);// eslint-disable-line react-hooks/exhaustive-deps  // Empty dependency array means this runs only once on mount

     


// Handle login for Student
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent form refresh

// Make API call to login endpoint
        const response = await fetch(`${host}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // Sending JSON
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }), // converting objects into Strings // Send email and password to backend

        });

         // Convert response to JSON
        const json = await response.json();


        // If login success, store token in localStorage
        if (json.token) {
            localStorage.setItem('token', json.token);// Save token for authentication

            toast.success("Logged in Successfully");// Show success toast

            props.showAlert("Logged in Successfully", "success");// Call parent alert function
            navigate('/'); // Navigate to homepage

        } else {
            toast.error("Invalid Credentials"); // Show error toast
            props.showAlert("Invalid Credentials", 'danger'); // Show error message
        }
    };
// Handle login for Admin
    const handleAdminSubmit = async (e) => {
        e.preventDefault();// Prevent default form refresh


        
        // API call for admin login
        const response = await fetch(`${host}/api/serviceProvider/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
                        // Send credentials

            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();

        if (json.token) {
            localStorage.setItem('adminToken', json.token);// Store admin token separately
            toast.success("Logged in Successfully");
            props.showAlert("Logged in Successfully", "success");
            navigate('/');// Navigate to homepage
        } else {
            toast.error("Invalid Credentials of admin");
            props.showAlert("Invalid Credentials", 'danger');
        }
    };
// Handle changes in input fields (email & password)
    const onChange = (e) => {
                // Update state dynamically based on input name

        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // When user clicks "Login as Student"

    const handleStudentClick = () => {
        setStudent(true);// Enable student form
        setAdmin(false); //// Disable admin form
        setTruth(false);// Hide selection buttons
    };

        // When user clicks "Login as Admin"

    const handleAdminClick = () => {
        setAdmin(true); // Enable admin form
        setStudent(false);// Disable student form
        setTruth(false); // Hide selection buttons
    };

    return (
        <div className="container">
            <ToastContainer position="top-right" style={{ marginTop: '5rem' }} />
            <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box">
                    <div className="col-lg-12 login-key">
                    {/* <i class="fa-solid fa-key"></i> */}
                        {/* <i className="fa fa-key" aria-hidden="true"></i> */}
                        <i class="fa-solid fa-key fa-shake"></i>
                    </div>
                    <div className="col-lg-12 login-title">
                        Login
                    </div>
                    <div className="col-lg-12 login-form">
                        {truth && (
                            <div className="d-flex justify-content-center" style={{marginBottom:'20px'}}>
                                <button className="btn btn-warning mx-3" onClick={handleStudentClick}>Login as Student</button>
                                <button className="btn btn-warning" onClick={handleAdminClick}>Login as Admin</button>
                            </div>
                        )}
                        {student && (
                            <div className="col-lg-12 login-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-control-label">Email</label>
                                        <input type="text" className="form-control" name="email" value={credentials.email} onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">Password</label>
                                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
                                    </div>
                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text"></div>
                                        <div className="col-lg-6 login-btm login-button">
                                            <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                        {admin && (
                            <div className="col-lg-12 login-form">
                                <form onSubmit={handleAdminSubmit}>
                                    <div className="form-group">
                                        <label className="form-control-label">Email Admin</label>
                                        <input type="text" className="form-control" name="email" value={credentials.email} onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">Password Admin</label>
                                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
                                    </div>
                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text"></div>
                                        <div className="col-lg-6 login-btm login-button">
                                            <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-lg-3 col-md-2"></div>
            </div>
        </div>
    );
};

export default Login;


