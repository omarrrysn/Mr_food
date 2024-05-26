import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import {LoginUser} from '../../constants/API';
import { CircularProgress } from '@mui/material';
const LoginUsers = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading]=useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false); 
      setError('An error occurred. Please try again.');
    }, 30000);
    try {
      const response = await fetch(LoginUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        const { role, id, name } = data;

        localStorage.setItem('id', id);
        if (role === 100) {      
            navigate(`/Admin`);
          console.log({ id, name, role });
        } else if (role === 200) {
          navigate(`/Chef`);
          
          console.log({ id, name, role });
        } else if (role === 300) {
          navigate(`/Manger`);
          
          console.log({ id, name, role });
        } else if (role ===400){
        
            navigate(`/Cashier`);
          console.log({ id, name, role });
        }else {
          setError('Unknown role');
        }
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);;
    }
  };
  
  useEffect(() => {
    localStorage.removeItem('id');
  }, []);
  
  
  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="form-input"
            placeholder="Email"
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
        {loading && (
      <div className="reload">
        <h2 style={{ marginLeft: "20px" }}>
          Loading...
          <CircularProgress style={{ marginLeft: "15px" }} className="reload-icon" />
        </h2>
      </div>
    )}
        {error && <p  className="error" style={{color:"white"}}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginUsers;
