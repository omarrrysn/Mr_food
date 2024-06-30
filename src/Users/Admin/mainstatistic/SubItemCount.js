import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { statisticsCount } from '../../../constants/API';

const SubItemCount = () => {
  const [subitemCount, setSubItemCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(statisticsCount)
      .then(response => {
        console.log('Response data:', response.data);
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setSubItemCount(response.data.subitem_count); // Assuming the response contains 'subitem_count'
        }
      })
      .catch(error => {
        console.error('Error fetching subitem count:', error);
        setError('Failed to fetch subitem count');
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (subitemCount === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2> {subitemCount}</h2>
    </div>
  );
};

export default SubItemCount;
