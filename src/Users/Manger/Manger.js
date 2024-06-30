import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Manger.css';
import axios from 'axios';
import { OrderCashier, orderHistory, orderManger, updateCashier } from '../../constants/API';
import PageNotFound from '../../pages/Menu/PageNotFound';
function Cashier() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const storedId=localStorage.getItem('id');
  const [idP, setIdP] = useState(storedId || 45);
  const[check,setCheck]=useState();

  const [orderIdd,setOrderId]=useState([]);
  const navigate = useNavigate();
  const [orderDetails,setOrderDetails]=useState([]);

  const handlecheck=()=>{ 
    if (idP===0){
      setCheck(false);
    }
    else{
      setCheck(true);
    }
  }



  useEffect(() => {
    handlecheck();
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

  


  const fetchOrders = async () => {
    

    try {
        const response = await axios.get(`${orderManger}${idP}`);
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
    } catch (error) {
        console.error('Error fetching orders:', error);
    
    }
};
  
  
  useEffect(() => {
    fetchOrders();
}, [idP,orders]);




  const changecolor = (recorded) => {
    if (recorded === 'Recorded') {
      return 'green' ; 
    } else {
      return 'red' ; 
    }
  }
  const changeColorStatus =(status) => {
    if (status === 'Cooking') {
      return 'red'
    }else if(status === "Ready"){
      return 'green'
    }else{
      return 'blue'
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



  const handleNavigateHistory = () =>{
    navigate(`/MangerHistory`);
  }
  const logoutCasher = () => {
    window.localStorage.clear();
    navigate('/LoginUsers');
  };


  return (
    <div>
      {check ? (
        <>
        <div className='ContainerCasher'>
          <div className='ContainerIconCasher'>
            <h1>Manager</h1>  
            <button onClick={logoutCasher}  >Log Out</button>
            <button className='ButtonLogOutCasher' onClick={handleNavigateHistory}>History</button>
            
          </div>
          <div className='lineCasher'></div>
          <p>Orders</p>
          <p className='p2'></p>
          <div className='lineCasher'></div>
        </div>
        <div className='OrderContainerCasher'>
        
        <div className='OrderCasher1'>
              
            </div>
                  {isLoading ? (
            <h1 style={{color:"white"}}>Loading orders...</h1>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            orders
            .filter(order => order.recorded !== 'Recorded' )
            .sort((a, b) => a.OrderId - b.OrderId)
            .map(order => (
              <div key={order.OrderId} className="OrderCasher">
                <div className='OrderTableCasher'>
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
                        <td style={{color:changeColorStatus(order.status),  fontWeight: "bold", fontSize: "25px", }}>{order.status}</td>
                      </tr>
                      <tr>
                      <td>Quantity:</td>
                      <td>{order.items.length}</td> 
                    </tr>
                    
                    <tr >
                      <td >Item Name: </td>
                      <td >
                        
                      {order.items
                      .sort((a, b) => b.id - a.id)
                      .map((item, index) => (
                          <tr key={index}>
                            <td style={{ margin: "50px" }}>Item Name:</td>
                            <td>{item.itemName}</td>
                            <td>Quantity:</td>
                            <td>{item.quantity}</td>
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
  
                <div className='StatusCasher'>
                  <div className='StatusCasher1'>
                    <p>Status</p>
  
                  </div>
                  <div className="checkbox-labelCasher">
                  <input
                  type="checkbox"
                  checked={(order.recorded === 'Not Recorded')}
                  onChange={() => handleNotRecordedChange(order.OrderId)}
                />
                    <p>Not Recorded</p>
                  </div>
                  <div className="checkbox-labelCasher">
                  <input
                      type="checkbox"
                      checked={(order.recorded === 'Recorded')}
                      onChange={() =>{handleRecordedChange(order.OrderId); handleRecordedChange(order.OrderId)}}
                    />
                    <p>Recorded</p>
                  </div>
                </div>
              </div>
            ))
          )}
         </div>
      </>
      ):(
        <PageNotFound/>
      )}
    </div>
  );
}

export default Cashier;
