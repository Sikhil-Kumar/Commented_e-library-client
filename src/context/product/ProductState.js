
// Import React and useState hook
import React, { useState } from 'react';
// Import the ProductContext we created earlier
import ProductContext from './productContext';

// Define the ProductState component which will wrap children with ProductContext.Provider
const ProductState = (props) => {
    // Backend server URL
    const host = "http://localhost:4000";

    // State variable to store all products, initialized as empty array
    const [products, setProducts] = useState([]);

    // Function to fetch products of a specific logged-in user
    const getIndividualUserProducts = async () => {
        const response = await fetch(`${host}/product/fetchAllProductsOfAUser`, {
            method: "GET", // API method
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token') // Passing user token for authentication
            }
        });
        const json = await response.json(); // Convert response to JSON
        setProducts(json); // Update state with products
    }

    // Function to fetch products of all users (public access)
    const getAllProducts = async () => {
        const response = await fetch(`${host}/product/getallUsersProduct`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        setProducts(json); // Save fetched products to state
    }

    // Function to add a new product
    const addProduct = async (crane, pulley, ballbearings, grece) => {
        const response = await fetch(`${host}/product/addProduct`, {
            method: "POST", // API method to create new product
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token') // Only authenticated user can add
            },
            // Send product details in request body
            body: JSON.stringify({ crane, pulley, ballbearings, grece }),
        });
        const json = await response.json();
        // Add new product to existing list of products
        setProducts(products.concat(json));
    }

    // Function to update an existing product by its ID
    const updateProduct = async (id, crane, pulley, ballbearings, grece) => {
        const response = await fetch(`${host}/product/updateProduct/${id}`, {
            method: "PUT", // API method to update
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ crane, pulley, ballbearings, grece }),
        });
        const json = await response.json();
        // Update the product in the state array
        setProducts(products.map(product => product._id === id ? json : product));
    }

    // Function to increment a product field (e.g., increase quantity)
    const incrementProduct = async (field) => {
        const response = await fetch(`${host}/product/incrementProduct`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ field }),
        });
        const json = await response.json();
        // Update the incremented product in the state
        setProducts(products.map(product => product._id === json._id ? json : product));
    }

    // Function to decrement a product field (e.g., decrease quantity)
    const decrementProduct = async (field) => {
        const response = await fetch(`${host}/product/decrementProduct`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ field }),
        });
        const json = await response.json();
        // Update the decremented product in the state
        setProducts(products.map(product => product._id === json._id ? json : product));
    }

    // Return the context provider that makes state & functions available to all children
    return (
        <ProductContext.Provider value={{
            products, // current list of products
            getIndividualUserProducts, // function to fetch individual user’s products
            getAllProducts, // function to fetch all users’ products
            addProduct, // function to add a new product
            updateProduct, // function to update existing product
            incrementProduct, // function to increment a product field
            decrementProduct // function to decrement a product field
        }}>
            {props.children} {/* Render all child components inside Provider */}
        </ProductContext.Provider>
    );
}

// Export the ProductState component so it can be used in App.js
export default ProductState;
