import React, { useState, useEffect } from 'react';
import "./Chef.css";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { chefOrder, updateOrderStatusChef } from '../../constants/API';
function Chef() {
  const location = useLocation();
  const { id, name } = location.state;
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${chefOrder}${id}`);
        if (!response.data || response.data.error) {
          throw new Error('Failed to fetch orders');
        }
        const modifiedOrders = response.data.reduce((acc, order) => {
          if (!acc[order.OrderId]) {
            acc[order.OrderId] = {
              orderId: order.OrderId,
              items: []
            };
          }
          acc[order.OrderId].items.push({
            itemName: order.itemName,
            quantity: order.quantity,
            note: order.note,
            status :order.status
          });
          return acc;
        }, {});
        setOrders(modifiedOrders);
        setError('');
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchOrders();
      const interval = setInterval(fetchOrders, 30000);
      return () => clearInterval(interval);
    }
  }, [id]); 

  const handleToggleOrderDetails = (orderId) => {
    setOrders(prevOrders => ({
      ...prevOrders,
      [orderId]: {
        ...prevOrders[orderId],
        showDetails: !prevOrders[orderId]?.showDetails
      }
    }));
  };



  const handleCookingStatusChange = async (orderId) => {
    try {
      await axios.post( updateOrderStatusChef, [
        { OrderId: orderId, status: 'Cooking' }
      ]);
      const updatedOrders = orders.map(order => {
        if (order.OrderId === orderId) {
          return { ...order, status: 'Cooking' };
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating cooking status:', error);
    }
  };
  

  
  const handleReadyStatusChange = async (orderId) => {
    try {
      await axios.post(updateOrderStatusChef, [
        { OrderId: orderId, status: 'Ready' }
      ]);
      const updatedOrders = orders.map(order => {
        if (order.OrderId === orderId) {
          return { ...order, status: 'Ready' };
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating ready status:', error);
    }
  };
  
  const handleTakenStatusChange = async (orderId) => {
    try {
      await axios.post(updateOrderStatusChef, [
        { OrderId: orderId, status: 'Taken' }
      ]);
      const updatedOrders = orders.map(order => {
        if (order.OrderId === orderId) {
          return { ...order, status: 'Taken' };
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating taken status:', error);
    }
  };
  
  
  
  return (
    <>
      <div className='Container'>
        <div className='ContainerIcon'>
          <h4>{name} <br/> The ID: {id} </h4>
        </div>
        <div className="line"></div>
        <p>Orders</p>
        <p className='p2'></p>
        <div className="line"></div>
      </div>
      <div className='OrderContainer'>
        <div className='Order'>
          {isLoading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            Object.values(orders).map((order, index) => (
              <div key={index} className="order">
                <div className='Order1'>
                  <p>Order ID: {order.orderId}</p>
                </div>
                <div className='Status'>
                    <div className='Status1'>
                        <p>Status</p>
                      </div>
                      <div className="checkbox-label">
                      <input
                          type="checkbox"
                          checked={(order.status === 'Cooking')}
                          onChange={() => handleCookingStatusChange(order.OrderId)} 
                        />
                        <p>Cooking</p>
                      </div>
                      <div className="checkbox-label">
                      <input
                          type="checkbox"
                           checked={(order.status === 'Ready')}
                          onChange={() => handleReadyStatusChange(order.OrderId)}
                        />
                        <p>Ready</p>
                      </div>
                      <div className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={(order.status === 'Taken')}
                        onChange={() => handleTakenStatusChange(order.OrderId)}
                       />
                        <p>Taken</p>
                      </div>
                </div>
                <div>
                  <button className='Details' onClick={() => handleToggleOrderDetails(order.orderId)}>
                    <p>{order.showDetails ? 'Hide Details' : 'Show Details'}</p>
                  </button>
                  {order.showDetails && (
                    <div className='OrderDetails'>
                      <table className='tableOrder'>
                        <thead>
                          <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Note</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {renderItems(order.items)}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

function renderItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return items.map((item, index) => (
    <tr key={index}>
      <td>{item.itemName}</td>
      <td>{item.quantity}</td>
      <td>{item.note}</td>
      <td>{item.status}</td>
    </tr>
  ));
}


export default Chef;
