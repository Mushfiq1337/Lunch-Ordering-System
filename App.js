import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("employee");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`User Type: ${userType}`);
    // Call API to submit lunch order
  };

  return (
    <div className="App">
      <h1>Lunch Order System</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="userType">User Type:</label>
          <select id="userType" onChange={handleUserTypeChange} value={userType}>
            <option value="employee">Employee</option>
            <option value="visitor">Visitor</option>
            <option value="intern">Intern</option>
          </select>
        </div>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}

export default App;
