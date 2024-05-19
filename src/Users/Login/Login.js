import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";
import { LoginTables } from '../../constants/API';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading]=useState(false);
  const handleEmailChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOpen = ()=>{
    navigate(`/LoginUsers`);
  }
  const handletest = ()=>{
    navigate(`/Menu`);
  }
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('password', password);


    try {
      const response = await axios.post(LoginTables, formData);

      if (response.data.success) {
        setName("");
        setPassword("");
        const tableId = response.data.tableId;
        setLoading(false);
        console.log('Login successful');

        localStorage.setItem('tableId', tableId);
        navigate(`/Menu`);

      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error(error);
    }
  };
  useEffect(() => {
    localStorage.removeItem('tableId');
  }, []);



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
        <br></br>
        {error && <p className="error">{error}</p>}
      </form>
        <button className="login-btn"  onClick={handleOpen} >Login Users</button>
        <button className="login-btn"  onClick={handletest} >Menu</button>
        <br></br>
        {loading && (
      <div className="reload">
        <h2 style={{ marginLeft: "20px" }}>
          Loading...
          <CircularProgress style={{ marginLeft: "15px" }} className="reload-icon" />
        </h2>
      </div>
    )}
    </div>
  );
};

export default Login;
