import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateAccount() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('https://madeathome-backend2.onrender.com/register', { username, password });
        console.log("have we got anything printed for register")
        console.log(response.data);
        navigate('/'); 
        // Handle response, e.g., user feedback, redirection, etc.
      } catch (error) {
        console.log("we are having an error here")
        console.error(error);
        // Handle errors, e.g., user feedback
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
  
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
  
        <button type="submit">Register</button>
      </form>
    );
  }
  
export default CreateAccount;
