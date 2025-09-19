import { createContext } from "react";


// creating the new object called productContext
//context is used for sharing data between components without prop drilling 
const ProductContext = createContext()

// Exporting the productContext so other component can use it.
export default ProductContext