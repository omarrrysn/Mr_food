import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './casher.css';
import axios from 'axios';
import { orderHistory , updateCasher } from '../../constants/API';

  

function CasherHistory() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);




  useEffect(() => {
    const login = async () => {
      setIsLoading(true);
      try {
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Login failed:', error);
        setError('Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    login();
  }, []);

  useEffect(() => {
    let isMounted = true;
  
    const fetchOrders = async () => {
      try {
        const response = await axios.get(orderHistory);
  
        if (isMounted) {
          // console.log('Response data:', response.data);
          if (response.data && Array.isArray(response.data)) {
            const formattedOrders = response.data.map(order => ({
              OrderId: order.OrderId,
              tableid: order.tableid,
              date: order.date,
              time: order.time,
              status: order.status,
              totalPrice: order.totalPrice,
              recorded: order.recorded,
              quantity: order.quantity,
              note: order.note,
              itemName: order.itemName,
              items: order.items
            }));
            
            setOrders(formattedOrders);
            setError('');
          } else {
            console.error('Invalid data format:', response.data);
            setError('Invalid data format');
          }
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        if (isMounted) {
          setError('Failed to fetch orders. Please try again.');
        }
      }
    };
  
    const longPoll = async () => {
      try {
        await fetchOrders(); 
  
        while (isMounted) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 seconds before making the next request
          await fetchOrders(); 
        }
      } catch (error) {
        console.error('Long poll error:', error);
      }
    };
  
    longPoll(); 
  
    return () => {
      isMounted = false; 
    };
  }, []);
  
  const changecolor = (recorded) => {
    if (recorded === 'Recorded') {
      return 'green' ; 
    } else {
      return 'red' ; 
    }
  }
  
  const handleRecordedChange = async (orderId) => {
    try {
      await axios.post(updateCasher, [
        { OrderId: orderId, recorded: 'Recorded' }
      ]);
      const updatedOrders = orders.map(order => {
        if (order.OrderId === orderId) {
          return { ...order, recorded: 'Recorded' };
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating recorded status:', error);
    }
  };
  
  const handleNotRecordedChange = async (orderId) => {
    try {
      await axios.post(updateCasher, [
        { OrderId: orderId, recorded: 'Not Recorded' }
      ]);
      const updatedOrders = orders.map(order => {
        if (order.OrderId === orderId) {
          return { ...order, recorded: 'Not Recorded' };
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating recorded status:', error);
    }
  };

  const navigate = useNavigate();


  const handleNavigateHistory = () =>{
    navigate(`/Cashier`);
  }

  

  return (
    <>
      <div className='ContainerCashier'>
        <div className='ContainerIconCashier'>
          <h1>Cashier</h1>  
          <button onClick={handleNavigateHistory} >Back</button>
          
        </div>
        <div className='lineCashier'></div>
        <p>Orders</p>
        <p className='p2'></p>
        <div className='lineCashier'></div>
      </div>
      <div className='OrderContainerCashier'>
      
      
                {isLoading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          orders
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map(order => (
            <div key={order.OrderId} className="OrderCashier">
              <div className='OrderTableCashier'>
                <table>
                  <tbody>
                    <tr>
                      <td>Order ID:</td>
                      <td>{order.OrderId}</td>
                    </tr>
                    <tr>
                      <td>Table ID:</td>
                      <td>{order.tableid}</td>
                    </tr>
                    <tr>
                      <td>Date:</td>
                      <td>{order.date}</td>
                    </tr>
                    <tr>
                      <td>Time:</td>
                      <td>{order.time}</td>
                    </tr>

                    <tr>
                      <td>Status: </td>
                      <td>{order.status}</td>
                    </tr>
                    <tr>
                    <td>Quantity:</td>
                    <td>{order.items.length}</td> 
                  </tr>
                  
                  <tr >
                    <td >Item Name: </td>
                    <td >
                      
                    {order.items.map(item => (
                      <tr key={item.itemName}>
                        <td style={{margin:"50px"}}>Item Name:</td>
                        <td>{item.itemName}</td>
                        <td>Quantity:</td>
                        <td >{item.quantity}</td>
                      </tr>
                    ))}
                 
                    </td>
                  </tr>
                  <tr>
                      <td style={{fontWeight: "bold" , fontSize: "25px"}}>Total Price:</td>
                      <td style={{ fontWeight: "bold", fontSize: "25px", color: changecolor(order.recorded) }}>{order.totalPrice}$ , {order.totalPrice   * 90000 + "" + " LB"} </td>
                    </tr>
                    <tr>
                      <td style={{fontWeight: "bold"}}>Recorded: </td>
                      <td style={{ fontWeight: "bold", fontSize: "25px", color: changecolor(order.recorded) }}>{order.recorded}</td>
                    </tr>
                  </tbody>
                </table>
               
              </div>

              <div className='StatusCashier'>
                <div className='StatusCashier1'>
                  <p>Status</p>

                </div>
                <div className="checkbox-labelCashier">
                <input
                type="checkbox"
                checked={(order.recorded === 'Not Recorded')}
                onChange={() => handleNotRecordedChange(order.OrderId)}
              />
                  <p>Not Recorded</p>
                </div>
                <div className="checkbox-labelCashier">
                <input
                    type="checkbox"
                    checked={(order.recorded === 'Recorded')}
                    onChange={() => handleRecordedChange(order.OrderId)}
                  />
                  <p>Recorded</p>
                </div>
                
              </div>
            </div>
          ))
        )}
       </div>
    </>
  );
}

export default CasherHistory;