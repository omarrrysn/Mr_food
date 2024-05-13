import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { LoginTables } from '../../constants/API';
import axios from 'axios';
const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOpen = ()=>{
    navigate(`/About`);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('password', password);


    try {
      const response = await axios.post(LoginTables, formData);

      if (response.data.success) {
        const tableId = response.data.tableId;
        console.log('Login successful');
        navigate(`/Menu`, { state: {tableId} });

      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error(error);
    }
  };
  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label className="form-label">Table Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleEmailChange}
            required
            className="form-input"
            placeholder="Table Name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="form-input"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
