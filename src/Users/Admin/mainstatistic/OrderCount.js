import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { statisticsCount } from '../../../constants/API';

const OrderCount = () => {
  const [orderCount, setOrderCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(statisticsCount)
      .then(response => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setOrderCount(response.data.order_count); // Assuming the response contains 'order_count'
        }
      })
      .catch(error => {
        console.error('Error fetching order count:', error);
        setError('Failed to fetch order count');
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (orderCount === null) {
    return <div>Loading...</div>;
  }

  return (
    <div >
      <h2>{orderCount}</h2>
    </div>
  );
};

export default OrderCount;
