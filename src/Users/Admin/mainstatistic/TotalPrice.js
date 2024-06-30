import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { statisticsCount } from '../../../constants/API';

const TotalPrice = () => {
  const [totalPrice, setTotalPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(statisticsCount)
      .then(response => {
        console.log('Response data:', response.data);
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setTotalPrice(response.data.total_price); // Assuming the response contains 'total_price'
        }
      })
      .catch(error => {
        console.error('Error fetching total price:', error);
        setError('Failed to fetch total price');
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (totalPrice === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{totalPrice}$</h2>
    </div>
  );
};

export default TotalPrice;
