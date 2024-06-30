import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { statisticsSub } from '../../../constants/API';

const AllSubItems = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      axios.get(statisticsSub)
        .then(response => {
          console.log('Response data:', response.data);
          if (response.data.error) {
            setError(response.data.error);
          } else {
            const allSubitemsArray = Object.values(response.data.allSubitems);
            const numRows = Math.ceil(allSubitemsArray.length / 4);
            const columns = Array.from({ length: numRows }, (_, rowIndex) => {
              const rowItems = [];
              for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
                const itemIndex = rowIndex + columnIndex * numRows;
                if (itemIndex < allSubitemsArray.length) {
                  rowItems.push({ name: allSubitemsArray[itemIndex].Name, number: itemIndex + 1 });
                } else {
                  rowItems.push(null); 
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
            <h1>All Items in Restaurant</h1>
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

export default AllSubItems;
