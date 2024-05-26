import React, { useEffect, useState } from 'react';
import LayoutAdmin from '../../../compounent/Admin/LayoutAdmin'; 
import { useLocation } from 'react-router-dom';
import PageNotFound from '../../../pages/Menu/PageNotFound';





const Order = () => {
 
	const location = useLocation();
  const tableId = location.state?.tableId;
  const tbl=tableId;
  const storedId=localStorage.getItem('id');
  const [idP, setIdP] = useState(storedId || 0);
  const[check,setCheck]=useState();
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
  }, []);
  

  return (
<div>
{check? (
      <LayoutAdmin>
      <div style={{height:"100px"}}></div>
  <h1 style={{color:"black",background:"white" ,width:"20px",height:"20px"}}>{tbl}</h1>
      
    </LayoutAdmin>
):
(
  <PageNotFound/>
)}
</div>
  );

  };
export default Order;
