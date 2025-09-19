// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'


// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ProductContext from '../context/product/productContext';

// const Products = () => {
//     const context = useContext(ProductContext);
//     const { products, getIndividualUserProducts, incrementProduct, decrementProduct } = context;
//     const navigate = useNavigate()
//     useEffect(() => {
//         if (localStorage.getItem('token')) {
//             getIndividualUserProducts();
//         } else {
//             navigate('/');
//         }
//     }, []); // eslint-disable-line react-hooks/exhaustive-deps

//     const handleIncrement = async (field) => {
//         await incrementProduct(field);
//         toast.success("Incremented product successfully.");
//         getIndividualUserProducts();
//     };

//     const handleDecrement = async (field) => {
//         await decrementProduct(field);
//         toast.success("Decremented product successfully.");
//         getIndividualUserProducts();
//     };

//     return (
//         <>
//             <h2 style={{ textAlign: 'center', marginTop: '7rem' }}>Your Products</h2>

//             <div style={{ height: '42vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black', borderRadius: '10px' }}>
//                 <div className="container">
//                     {products.length === 0 && 'No products to display'}
//                 </div>
//                 {products.map((product, index) => (
//                     <div key={index} style={{ marginBottom: '1rem', textAlign: 'center' }}>
//                         <h4>Product {index + 1}</h4>
//                         <p>Crane: {product.crane}</p>
//                         <p>Pulley: {product.pulley}</p>
//                         <p>Ballbearings: {product.ballbearings}</p>
//                         <p>Grece: {product.grece}</p>
//                         <button className="btn btn-primary mx-1" onClick={() => handleIncrement('crane')}>Increment Crane</button>
//                         <button className="btn btn-primary mx-1" onClick={() => handleDecrement('crane')}>Decrement Crane</button>
//                         <button className="btn btn-primary mx-1" onClick={() => handleIncrement('pulley')}>Increment Pulley</button>
//                         <button className="btn btn-primary mx-1" onClick={() => handleDecrement('pulley')}>Decrement Pulley</button>
//                         <button className="btn btn-primary mx-1" onClick={() => handleIncrement('ballbearings')}>Increment Ballbearings</button>
//                         <button className="btn btn-primary mx-1" onClick={() => handleDecrement('ballbearings')}>Decrement Ballbearings</button>
//                         <button className="btn btn-primary mx-1" onClick={() => handleIncrement('grece')}>Increment Grece</button>
//                         <button className="btn btn-primary mx-1" onClick={() => handleDecrement('grece')}>Decrement Grece</button>
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// };

// export default Products;
