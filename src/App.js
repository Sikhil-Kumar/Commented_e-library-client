
import { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import './App.css';

import Navbar from './components/Navbar';
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import ProductState from "./context/product/ProductState";

import Product2 from "./components/Product2";
import Items from "./components/Items";


function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  return (
    <>
      {/* <NoteState> */}
      <ProductState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>

              <Route exact path="/about" element={<About />}></Route>
              <Route path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route path="/signup" element={<Signup showAlert={showAlert} />}></Route>
              {/* <Route path="/Products" element={<Products showAlert={showAlert} />}></Route> */}
              <Route path="/Products2" element={<Product2 showAlert={showAlert} />}></Route>
              <Route path="/items" element={<Items showAlert={showAlert} />}></Route>

            </Routes>
          </div>
        </Router>
        </ProductState>
      {/* </NoteState> */}
    </>
  );
}

export default App;
