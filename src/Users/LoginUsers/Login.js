import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import { LoginUser } from '../../constants/API';
const LoginUsers = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch( LoginUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const { role, id, name } = data;
        if (role === 100) {      
          setTimeout(() => {
            navigate(`/Admin`, { state: { id, name, role } });
          }, 3000); // Delay for 3 seconds
          console.log({ id, name, role });
        } else if (role === 200) {
          setTimeout(() => {
            navigate(`/Chef`, { state: { id, name, role } });
          }, 3000); // Delay for 3 seconds
          console.log({ id, name, role });
        } else if (role === 300) {
          setTimeout(() => {
            navigate(`/Manger`, { state: { id, name, role } });
          }, 3000); // Delay for 3 seconds
          console.log({ id, name, role });
        } else if (role ===400){
          setTimeout(() => {
            navigate(`/Cashier`, { state: { id, name, role } });
          }, 3000); // Delay for 3 seconds
          console.log({ id, name, role });
        }else {
          setError('Unknown role');
        }
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };
  
  
  
  
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
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginUsers;
