
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css"; // Make sure to import the CSS

const Signup = (props) => {

    // state to hold input values (name, email, password)
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });

    //state for role selection 
    const [admin, setAdmin] = useState(false); // when  when user chooses student 
    const [student, setStudent] = useState(false);  //when user chooses Admin
    const [truth, setTruth] = useState(true);   //initially true  show role selection buttons
    // const [file, setFile] = useState();
    const navigate = useNavigate();
    const host = "https://e-library-server-jyjf.onrender.com"; // Update this to your backend host



   // Runs once when component loads → adds background class
    useEffect(() => {
        document.body.classList.add('login-signup-background');
        return () => {
          document.body.classList.remove('login-signup-background');

          // cleanup whan componets unmounts;
        };
      }, []);// eslint-disable-line react-hooks/exhaustive-deps
    
    // admin signup submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.name.length < 5) { // here in this line if the name is less than the length 5 then it will give me the alert message 
            toast.error("Name must be at least 5 characters long.");
            return;
        }

        if (credentials.password.length < 5) { // here in this line if ther password is less than the length 5 then it will give me the alert message
            toast.error("Password must be at least 5 characters long.");
            return;
        }

        const response = await fetch(`${host}/api/users/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

             // send entered credentials in request body
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
            }),
        });

        const json = await response.json();
        console.log(json);

         // If signup success → token is returned
        if (json.token) {
            // save student token 
            localStorage.setItem('token', json.token);
            toast.success("Account created Successfully");
            props.showAlert("Account created Successfully", "success");
            navigate('/');
        } else {
             // Error case: no token received
            console.log("Error creating account");
            toast.error("Invalid Credentials");
            props.showAlert("Invalid Credentials", "danger");
        }
    };
  // Function: Handles admin signup form submission
    const handleAdminSubmit = async (e) => {
        e.preventDefault(); // prevent refresh 


          // API call: create admin user
        const response = await fetch(`${host}/api/serviceProvider/createAdmin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
        });

        // Convert response to JSON
        const json = await response.json();


          // If success → save admin token
        if (json.token) {
            
            localStorage.setItem('adminToken', json.token);
            toast.success("Account created Successfully");
            props.showAlert("Account created Successfully", "success");
            navigate('/'); // redirect to home page 
        } else {
            console.log("Error creating account");
            toast.error("Invalid Credentials");
            props.showAlert("Invalid Credentials", "danger");
        }
    };

    const onChange = (e) => {
     
            setCredentials({ ...credentials, [e.target.name]: e.target.value });
   
    };
 // Function: User clicks "SignUp as Student"
    const handleStudentClick = () => {
        setStudent(true); 
        setAdmin(false);
        setTruth(false); 
    };

    // admin signup from submit 
    const handleAdminClick = () => {
        setAdmin(true);// enable admin form
        setStudent(false);// disable student form
        setTruth(false);// hide role selection buttons
    };

    // jsx returned by signup components 
    return (
        <div className="container">
            <ToastContainer position="top-right" style={{ marginTop: '5rem' }} />
            <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box">
                    <div className="col-lg-12 login-key">
                        <i className="fa fa-key" aria-hidden="true"></i>
                    </div>
                    <div className="col-lg-12 login-title">
                        SIGN UP
                    </div>
                    {truth && (
                        <div className="d-flex justify-content-center" style={{marginBottom:'20px', marginTop:'10px'}}>
                            <button className="btn btn-warning mx-3" onClick={handleStudentClick}>SignUp as Student</button>
                            <button className="btn btn-warning" onClick={handleAdminClick}>SignUp as Admin</button>
                        </div>
                    )}
                    {student && (
                        <div className="col-lg-12 login-form">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-control-label">Name</label>
                                    <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} required minLength={5} />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Email</label>
                                    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} required minLength={5} />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Password</label>
                                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} required minLength={5} />
                                </div>
                                {/* <div className="form-group">
                                    <label className="form-control-label">Image</label>
                                    <input type="file" accept='image/*' className="form-control" name="image" onChange={onChange} />
                                </div> */}
                                <div className="col-lg-12 loginbttm">
                                    <div className="col-lg-6 login-btm login-text"></div>
                                    <div className="col-lg-6 login-btm login-button">
                                        <button type="submit" className="btn btn-outline-primary">SIGN UP</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                    {admin && (
                        <div className="col-lg-12 login-form">
                            <form onSubmit={handleAdminSubmit}>
                                <div className="form-group">
                                    <label className="form-control-label">Name Admin</label>
                                    <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} required minLength={5} />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Email Admin</label>
                                    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} required minLength={5} />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Password Admin</label>
                                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} required minLength={5} />
                                </div>
                                <div className="col-lg-12 loginbttm">
                                    <div className="col-lg-6 login-btm login-text"></div>
                                    <div className="col-lg-6 login-btm login-button">
                                        <button type="submit" className="btn btn-outline-primary">SIGN UP</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
                <div className="col-lg-3 col-md-2"></div>
            </div>
        </div>
    );
};

// export signup component for the use in other parts of app

export default Signup;

