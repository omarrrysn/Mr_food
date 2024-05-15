import React from 'react';
import LayoutAdmin from '../../../compounent/Admin/LayoutAdmin'; 
import { useLocation } from 'react-router-dom';






const Order = () => {
 
	const location = useLocation();
  const tableId = location.state?.tableId;
  const tbl=tableId;





  return (
    <LayoutAdmin>
      <div style={{height:"100px"}}></div>
  <h1 style={{color:"black",background:"white" ,width:"20px",height:"20px"}}>{tbl}</h1>
      
    </LayoutAdmin>
  );

  };
export default Order;
