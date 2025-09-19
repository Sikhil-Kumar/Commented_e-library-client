

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {ToastContainer, toast } from 'react-toastify'; // we have used toastify to provide an alert messages 
import 'react-toastify/dist/ReactToastify.css';


const Items = () => {
  // State to hold all items fetched from the background 
  const [items, setItems] = useState({});

  // State for the adding new items.
  const [newItemName, setNewItemName] = useState('');
  const [newItemValue, setNewItemValue] = useState(1); // Set initial value to 1

  //State for removing items.
  const [removeItemName, setRemoveItemName] = useState('');
  const [removeItemValue, setRemoveItemValue] = useState(0);

  //State to hold items 
  const [itemList, setItemList] = useState([]);

  //state to hold selectable quantity f0r removing 
  const [selectedItemQuantity, setSelectedItemQuantity] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const fetchItems = async () => {
    try {
      //call api to get all items 
      const response = await axios.get('https://e-library-server-jyjf.onrender.com/item/all');
      setItems(response.data);

      //in  line number 38 we are converting the objects into array of (name, quantity)
      const itemList = Object.keys(response.data).map((key) => ({ name: key, quantity: response.data[key] }));
      setItemList(itemList);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItems = async () => {
    if (newItemValue <= 0) {
      toast.warn('Item quantity must be greater than zero.');
      return; // Prevent further execution
    }
  
    try {
      const response = await axios.post('https://e-library-server-jyjf.onrender.com/item/add', { items: { [newItemName]: newItemValue } });
      toast.success("Item Added")
      setItems(response.data.items);
      setNewItemName('');
      setNewItemValue(1); // Reset to 1 after successful addition
      fetchItems()
    } catch (error) {
      toast.error("Error adding item")
      console.error('Error adding items:', error);
    }
  };

  const handleRemoveItems = async () => {
    try {
      const response = await axios.post('https://e-library-server-jyjf.onrender.com/item/remove', { items: { [removeItemName]: removeItemValue } });
      toast.success("Item Removed")
      setItems(response.data.items);
      setRemoveItemName('');
      setRemoveItemValue(0);
    } catch (error) {
      toast.error("Error removing item")
      console.error('Error removing items:', error);

    }
  };

  const handleSelectItem = (itemName) => {
    setRemoveItemName(itemName);
    const selectedItem = itemList.find(item => item.name === itemName);
    if (selectedItem) {
      setSelectedItemQuantity(Array.from({ length: selectedItem.quantity }, (_, i) => i + 1));
      setRemoveItemValue(1); // Reset to 1 when item selection changes
    }
  };
// returning jsx file 
  return (
    <div style={{marginTop:'-70px'}}> 
     <ToastContainer position="top-right" style={{ marginTop: '3rem' }} />
      <h1 style={{textAlign:'center'}}>Books</h1>

      <h2 style={{marginTop:'20px'}}>Available Books</h2>
      <table style={{ marginBottom: '1rem', width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Book Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Book Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(items).map(([key, value]) => (
            <tr key={key}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{key}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

    
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' , flexDirection:'column'}}>
      <h2>Add Items</h2>
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', marginBottom:'0px', color:'black' , border:'1px solid black'}}
        />
        <input
          type="number"
          placeholder="Item Value"
          value={newItemValue}
          onChange={(e) => setNewItemValue(parseInt(e.target.value, 10))}
          min="1" // Ensure minimum value is 1
          style={{ marginRight: '10px', padding: '8px', borderRadius:'5px', marginTop:'10px', marginBottom:'10px' }}
        />
        <button onClick={handleAddItems} className="btn btn-dark">Add </button>
      </div>

     
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', flexDirection:'column', justifyContent:'space-between' }}>
      <h2>Remove Items</h2>
        <select
          value={removeItemName}
          onChange={(e) => handleSelectItem(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', borderRadius:'5px' }}
        >
          <option value="">Select Item</option>
          {itemList.map(item => (
            <option key={item.name} value={item.name}>{item.name}</option>
          ))}
        </select>
      
        <select
          value={removeItemValue}
          onChange={(e) => setRemoveItemValue(parseInt(e.target.value, 10))}
          style={{ marginRight: '10px', padding: '8px', borderRadius:'5px', marginTop:'10px', marginBottom:'10px' }}
        >
          {/* {selectedItemQuantity.map(quantity => (
            <option key={quantity} value={quantity}>{quantity}</option>
          ))} */}

          <option value="">Select Quantity</option>
          {selectedItemQuantity.map(quantity => (
            <option key={quantity} value={quantity}>{quantity}</option>
          ))}
        </select>
        <button onClick={handleRemoveItems} className="btn btn-dark">Remove </button>
      </div>
    </div>
  );
};

export default Items;
