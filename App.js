import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LunchOrderingSystem() {
  // State variables
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [paymentOption, setPaymentOption] = useState('creditCard');
  const [userType, setUserType] = useState('employee');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 }
  // Load menu items from API on component mount
  useEffect(() => {
    axios.get('/api/menuItems')
      .then(response => setMenuItems(response.data))
      .catch(error => console.error(error));
  }, []);

  // Handle adding/removing items from selectedItems array
  function handleItemSelection(itemId) {
    const newSelectedItems = [...selectedItems];
    const itemIndex = newSelectedItems.indexOf(itemId);
    if (itemIndex === -1) {
      newSelectedItems.push(itemId);
    } else {
      newSelectedItems.splice(itemIndex, 1);
    }
    setSelectedItems(newSelectedItems);
  }

  // Handle submitting order to API
  function handleSubmitOrder(event) {
    event.preventDefault();
    axios.post('/api/orders', {
      items: selectedItems,
      delivery: deliveryOption,
      payment: paymentOption
    })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }

  // Handle user authentication
  function handleLogin(event) {
    event.preventDefault();
    axios.post('/api/login', {
      username: username,
      password: password
    })
      .then(response => {
        setIsLoggedIn(true);
        setUsername('');
        setPassword('');
      })
      .catch(error => console.error(error));
  }

  // Conditional rendering based on user type and login status
  let content = null;
  if (isLoggedIn && userType === 'employee') {
    content = (
      <div>
        <h2>Welcome Employee!</h2>
        <form onSubmit={handleSubmitOrder}>
          <h3>Menu Items:</h3>
          {menuItems.map(item => (
            <div key={item.id}>
              <label>
                <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleItemSelection(item.id)} />
                {item.name} (${item.price})
              </label>
            </div>
          ))}
          <h3>Delivery Option:</h3>
          <label>
            <input type="radio" name="deliveryOption" value="pickup" checked={deliveryOption === 'pickup'} onChange={() => setDeliveryOption('pickup')} />
            Pick up
          </label>
          <label>
            <input type="radio" name="deliveryOption" value="delivery" checked={deliveryOption === 'delivery'} onChange={() => setDeliveryOption('delivery')} />
            Delivery
          </label>
          <h3>Payment Option:</h3>
          <label>
            <input type="radio" name="paymentOption" value="creditCard" checked={paymentOption === 'creditCard'} onChange={() => setPaymentOption('creditCard')} />
            Credit Card
          </label>
          <label>
            <input type="radio" name="paymentOption" value="debitCard" checked={paymentOption === 'debitCard'} onChange={() => setPaymentOption('debitCard')} />
            Debit Card
          </label>
          <button type="submit">Submit Order</button>
        </form>
      </div>
        );
    }
      export default LunchOrderingSystem;