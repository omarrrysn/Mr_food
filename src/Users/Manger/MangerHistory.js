import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Manger.css';
import axios from 'axios';
import { orderHistory, orderManger, updateCashier } from '../../constants/API';

function MangerHistory() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const id = localStorage.getItem('id');
  //  const id = 45;

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
        if (!id) {
          return;
        }
    
        const response = await axios.get(`${orderHistory}${id}`);
    
        if (response.data.error) {
          console.error('Error from server:', response.data.error);
          setError('Error fetching orders. Please try again.');
        } else if (Array.isArray(response.data)) {
          const formattedOrders = response.data.map(order => ({
            OrderId: order.OrderId,
            tableName: order.tableName,
            date: order.date,
            time: order.time,
            status: order.status,
            totalPrice: order.totalPrice,
            recorded: order.recorded,
            items: order.items
          }));
          setOrders(formattedOrders);
          setError('');
        } else {
          console.error('Invalid data format:', response.data);
          setError('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders. Please try again.');
      }
    };
    

    const longPoll = async () => {
      try {
        await fetchOrders();
      } catch (error) {
        console.error('Long poll error:', error);
      }
    };

    longPoll(); 

    return () => {
      isMounted = false; 
    };
  }, [id]);
  
  const changecolor = (recorded) => {
    if (recorded === 'Recorded') {
      return 'green' ; 
    } else {
      return 'red' ; 
    }
  }
  
  const handleRecordedChange = async (orderId) => {
    try {
      await axios.post(updateCashier, [
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
      await axios.post(updateCashier, [
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

  const handleNavigate = (orderId) => {
    navigate(`/Menu`, { state: { orderId } });
  console.log( "The order Id" +   orderId);

  };
  const handleNavigateHistory = () =>{
    navigate(`/Manger`);
  }

  const handlePageNotFound = () => {
    if (!id || isNaN(id) || parseInt(id) === 0) {
      navigate(`/PageNotFound`);
    }
  }
  useEffect(() => {
    handlePageNotFound();
  }, []); 

  return (
    <>
      <div className='ContainerManger'>
        <div className='ContainerIconManger'>
          <h1>Manger </h1>  
          <button onClick={handleNavigateHistory} >Back</button>
          
        </div>
        <div className='lineManger'></div>
        <p>Orders History</p>
        <p className='p2'></p>
        <div className='lineManger'></div>
      </div>
      <div className='OrderContainerManger'>
      
      <div className='OrderManger1'>
            <p> Order ID:  </p>
          </div>
                {isLoading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          orders
          .sort((a, b) => b.OrderId - a.OrderId)
          // .filter(o => o.recorded === '' )
          .map(order => (
            <div key={order.OrderId} className="OrderManger">
              <div className='OrderTableManger'>
                <table>
                  <tbody>
                    <tr>
                      <td>Order ID:</td>
                      <td>{order.OrderId}</td>
                    </tr>
                    <tr>
                      <td>Table ID:</td>
                      <td>{order.tableName}</td>
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

              <div className='StatusManger'>
                <div className='StatusMangerM1'>
                  <p>Status</p>

                </div>
                <div className="checkbox-labelManger">
                <input
                type="checkbox"
                checked={(order.recorded === 'Not Recorded')}
                onChange={() => handleNotRecordedChange(order.OrderId)}
              />
                  <p>Not Recorded</p>
                </div>
                <div className="checkbox-labelManger">
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

export default MangerHistory;
