import React, { useState, useEffect } from 'react';
import "../Chef/Chef.css";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { chefOrder,UpdateChef } from '../../constants/API';

function Chef() {
  const location = useLocation();
  const { id, name } = location.state;
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${chefOrder} ${id}`);
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
          status : order.status
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

  useEffect(() => {
    if (id) {
      fetchOrders();
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
 
  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.post(UpdateChef, {
        OrderId: orderId,
        status: status,
      });
      console.log({status}, {orderId});
    } catch (error) {
      console.error(`Error updating ${status} status for orderId ${orderId}:`, error);
    }
  };
  
  return (
    <>
      <div className='ContainerChef'>
        <div className='ContainerIconChef'>
          <h4>{name} <br/> The ID: {id} </h4>
        </div>
        <div className="lineChef"></div>
        <p>Orders</p>
        <p className='p2'></p>
        <div className="lineChef"></div>
      </div>
      <div className='OrderContainerChef'>
        <div className='Order'>
          {isLoading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            Object.values(orders).map((order, index) => (
              <div key={index} className="orderChef">
                <div className='OrderChef1'>
                  <p>Order ID: {order.orderId}</p>
                </div>
                <div className='StatusChef'>
                    <div className='StatusChef1'>
                        <p>Status {order.status}</p>
                      </div>
                      <div className="checkbox-labelChef">
                      <input
                          type="checkbox"
                          onChange={() => updateOrderStatus(order.orderId, 'Cooking')} 
                        />
                        <p>Cooking</p>
                      </div>
                      <div className="checkbox-labelChef">
                      <input
                          type="checkbox"
                          onChange={() => updateOrderStatus(order.orderId, 'Ready')}
                        />
                        <p>Ready</p>
                      </div>
                      <div className="checkbox-labelChef">
                      <input
                        type="checkbox"
                        onChange={() => updateOrderStatus(order.orderId, 'Taken')}
                       />
                        <p>Taken</p>
                      </div>
                </div>
                <div>
                  <button className='DetailsChef' onClick={() => handleToggleOrderDetails(order.orderId)}>
                    <p>{order.showDetails ? 'Hide Details' : 'Show Details'}</p>
                  </button>
                  {order.showDetails && (
                    <div className='OrderDetailsChef'>
                      <table className='tableOrderChef'>
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
