import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { statisticsSub } from '../../../constants/API';

const NotOrderedSubItems = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Unwanted
  useEffect(() => {
    axios.get(statisticsSub)
      .then(response => {
        console.log('Response data:', response.data);
        if (response.data.error) {
          setError(response.data.error);
        } else {
          const notOrderedSubitemsArray = Object.values(response.data.notOrderedSubitems);
          const numRows = Math.ceil(notOrderedSubitemsArray.length / 4);
          const columns = Array.from({ length: numRows }, (_, rowIndex) => {
            const rowItems = [];
            for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
              const itemIndex = rowIndex + columnIndex * numRows;
              if (itemIndex < notOrderedSubitemsArray.length) {
                rowItems.push({ name: notOrderedSubitemsArray[itemIndex].Name, number: itemIndex + 1 });
              } else {
                rowItems.push(null); // Fill with null for empty cells
              }
            }
            return rowItems;
          });
          setItems(columns);
        }
      })
      .catch(error => {
        console.error('Error fetching subitem count:', error);
        setError('Failed to fetch subitem count');
      });
  }, []);
  const handleBack = () => {
    navigate('/Admin');
};

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(items) || items.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="TableStatisticContainer">
      <button onClick={handleBack}>Back</button>
      <div className="TableStatistic">
      <h1 style={{marginLeft:"28%"}}>All Items unwanted Restaurant</h1>

        <table>
          <tbody>
            {items.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((item, columnIndex) => (
                  <td key={columnIndex}>
                    {item ? (
                      <>
                        <span>{item.number}</span>. <span>{item.name}</span>
                      </>
                    ) : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotOrderedSubItems;
