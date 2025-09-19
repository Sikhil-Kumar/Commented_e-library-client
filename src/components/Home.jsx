import React, { useEffect } from 'react'
import "./Home/homestyle.css"

import first from "../images/libraryImages/first.png"
import sec from "../images/libraryImages/sec.png"
import third from "../images/libraryImages/third.png"

const Home = () => {

// When the components loads, its addes a backgrounf styling to the page by attteching a css class to the body. When  you leave the page the component unmounts,it removes that calss so the background return to normal. This ensure the background style is only active while you are on the home page.
  useEffect(() => {
    document.body.classList.add('home-background');
    return () => {
      document.body.classList.remove('home-background');
    };
  }, []);// eslint-disable-line react-hooks/exhaustive-deps


  return (
<>


<div style={{ maxWidth: '800px', margin: 'auto', textAlign: 'center', paddingTop: '2rem', marginTop:'-80px', color:'whitesmoke' }}>
      <h1 >Welcome to Our Library Management System</h1>
      <img src={sec} alt="Library" style={{ width: '100%', maxWidth: '600px', margin: 'auto', marginTop: '2rem', borderRadius:'10px' }} />
      
      <h2 style={{marginTop:'40px'}}>Explore Our Collection</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '2rem' }}>
        <div>
          <img src={third} alt="Books" style={{ width: '150px', height: '150px', objectFit: 'cover',borderRadius:'5px' }} />
          <p>Discover a wide range of books</p>
        </div>
        <div>
          <img src={first} alt="Reading" style={{ width: '150px', height: '150px', objectFit: 'cover',borderRadius:'5px' }} />
          <p>Enjoy a quiet place to read</p>
        </div>
      </div>

      <h2 style={{marginTop:'40px',textDecoration:'underline'}}>Library Services</h2>
      <p style={{fontFamily:'unset'}}>Our library offers various services including:</p>
      <ul style={{ textAlign: 'left'}}>
        <li>Book borrowing and returning</li>
        <li>Online catalog search</li>
        <li>Study rooms and facilities</li>
        <li>Special events and workshops</li>
      </ul>

      
    </div>
   </>
  )
}

export default Home