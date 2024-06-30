import React, { useState, useEffect } from 'react';
import "./Chef.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { orderChefHistory, updateChef } from '../../constants/API';

const GreenRedSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: 'green',
    '&:hover': {
      backgroundColor: 'rgba(0, 128, 0, 0.08)',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: 'green',
  },
  '& .MuiSwitch-switchBase': {
    color: 'red',
    '&:hover': {
      backgroundColor: 'rgba(255, 0, 0, 0.08)',
    },
  },
  '& .MuiSwitch-switchBase + .MuiSwitch-track': {
    backgroundColor: 'red',
  },
}));

function ChefHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    // const chefId = localStorage.getItem('id');
    const chefId =41;
    if (chefId) {
      setId(chefId);
    } else {
      navigate('/Login'); 
    }
  }, [navigate]);

  const fetchOrders = async (chefId) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`${orderChefHistory}${chefId}`);
      if (!response.data || response.data.error) {
        throw new Error('Failed to fetch orders');
      }
      const modifiedOrders = response.data.reduce((acc, order) => {
        if (!acc[order.OrderId]) {
          acc[order.OrderId] = {
            orderId: order.OrderId,
            items: [],
            status: order.status,
          };
        }
        acc[order.OrderId].items.push({
          itemName: order.itemName,
          quantity: order.quantity,
          note: order.note,
          status: order.status,
        });
        return acc;
      }, {});
      setOrders(Object.values(modifiedOrders));
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('No orders are Taken');
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.post(updateChef, {
        OrderId: orderId,
        status: status,
        chefId:id
      });
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.orderId === orderId ? { ...order, items: order.items.map(item => ({ ...item, status })) } : order
        )
      );
    } catch (error) {
      console.error(`Error updating ${status} status for orderId ${orderId}:`, error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrders(id);
    }

    return () => {
      // Cleanup function
    };
  }, [id]);

  const logout = () => {
    window.localStorage.clear();
    navigate('/LoginUsers');
  };

  const BackChef = () => {
    navigate('/Chef');
  };

  return (
    <>
      <div className='ContainerChef'>
        <div className='ContainerIconChef'>
          <h1>Chef</h1>  
          <button onClick={logout}>Log Out</button>
          <button className='BuutonHistory' onClick={BackChef}>Back </button>
        </div>
        <div className="lineChef"></div>
        <p>Orders</p>
        <p className='p2'></p>
        <div className="lineChef"></div>
      </div>
      <div className='OrderContainerChef'>
        <div className='OrderCheff'>
          {isLoading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            orders
            .sort((a, b) => a.orderId - b.orderId)
            .map((order, index) => (
              <div key={index} className="orderchef">
                <div className='OrderCheff1'>
                  <p>Order ID: {order.orderId}</p>
                </div>
                <div className='StatusChef'>
                  <div className='StatusCheff1'>
                    <p>Status: {order.items[0]?.status}</p>
                  </div>
                  <div className="switch-labelChef">
                    <FormControlLabel
                      control={
                        <GreenRedSwitch
                          checked={order.items[0]?.status === 'Cooking'}
                          onChange={() => updateOrderStatus(order.orderId, order.items[0]?.status === 'Cooking' ? 'Cooking' : 'Cooking')}
                        />
                      }
                      label="Cooking"
                    />
                  </div>
                  <div className="switch-labelChef">
                    <FormControlLabel
                      control={
                        <GreenRedSwitch
                          checked={order.items[0]?.status === 'Ready'}
                          onChange={() => updateOrderStatus(order.orderId, order.items[0]?.status === 'Ready' ? 'Ready' : 'Ready')}
                        />
                      }
                      label="Ready"
                    />
                  </div>
                  <div className="switch-labelChef">
                    <FormControlLabel
                      control={
                        <GreenRedSwitch
                          checked={order.items[0]?.status === 'Taken'}
                          onChange={() => updateOrderStatus(order.orderId, order.items[0]?.status === 'Taken' ? 'Taken' : 'Taken')}
                        />
                      }
                      label="Taken"
                    />
                  </div>
                </div>
                <div>
                  <button className='DetailsChef'>Show Details</button>
                  <div className='OrderDetailsChef'>
                    <table className='tableOrderChef'>
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>Quantity</th>
                          <th>Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderItems(order.items)}
                      </tbody>
                    </table>
                  </div>
                </div>
                <br></br>
                <br></br>
                <div style={{width:"100%", height:"20px",background:"black",borderRadius:"20px"}}></div>
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
    </tr>
  ));
}

export default ChefHistory;
