import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoginTables } from '../../constants/API';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import Start from '../../pages/start/Start';
const Login = () => {

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tableName = queryParams.get('tableName');
  const passwordqr = queryParams.get('password');
  const [name, setName] = useState(tableName);
  const [password, setPassword] = useState(passwordqr);
  useEffect(() => {
    handleSubmit({ preventDefault: () => {} });
  }, [name]);

  const handleEmailChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('password', password);

    try {
      const response = await axios.post(LoginTables, formData);

      if (response.data.success) {
        setName('');
        setPassword('');
        const tableId = response.data.tableId;
        setLoading(false);
        console.log('Login successful');
        localStorage.setItem('tableId', tableId);
        navigate('/Menu');
      } else {
        setLoading(false);
        setError('Invalid credentials');
        console.log('Login failed:', response.data.message); // Log the error message from the API
      }
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again.');
      console.error('Login error:', error); // Log the error for debugging
    }
  };

  useEffect(() => {
    setError('');
    localStorage.removeItem('tableId');
  }, []);

  return (
    <div>
      <Start/>
    </div>
  );
};

export default Login;
