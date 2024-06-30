import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { statisticsCount } from '../../../constants/API';

const MenuItemCount = () => {
  const [menuItemcount, setMenuItemCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(statisticsCount)
      .then(response => {
        console.log('Response data:', response.data);
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setMenuItemCount(response.data.menuitem_count); // Assuming the response contains 'menuitem_count'
        }
      })
      .catch(error => {
        console.error('Error fetching menu item count:', error);
        setError('Failed to fetch menu item count');
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (menuItemcount === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{menuItemcount}</h2>
    </div>
  );
};

export default MenuItemCount;
