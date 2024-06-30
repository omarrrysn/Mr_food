import React, { useEffect, useState } from "react";
import "../../styles/Menu.css";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { subItem , images ,insertOrderDetails ,insertMainOrder, selectOrderId, updateTotaleprice, selectOrderDetails, updateCashier} from "../../constants/API";
import { Box, Divider, Drawer, Typography } from "@mui/material";
import { CircularProgress } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";



const ThirdMenu = ({ data,tbl,tm,dt }) => {


  const [elements, setElements] = useState([]);
  const [order , setOrder] = useState([]);
  const[Id,setId]=useState([]);
  const[name ,setName]=useState([]);
  const[open,setOpen]=useState(false);
  const[price,setPrice]=useState([]);
  const [chef,setChef]=useState([]);
  const [notes,setNotes]=useState([]);
  const id = data;
  const[orderDetails,setOrderDetaials]=useState([]);
  const [mainorder,setMainOrder]=useState(0);
  const tblId=tbl;
  const [orderLoading,setOrderLoading]=useState(false);
  const [totalOrderPrice,setTotalOrderPrice]=useState();
  const[number,setNumber]=useState(1);
 const [orderId,setOrderId]=useState();
 const [orderIdStatus,setOrderIdsatatus]=useState();
 const get=localStorage.getItem('Recorded' )
const[testt,setTestt]=useState(get);
const navigate=useNavigate();
const [isorder,setisOrder]=useState(false);
const [status , setStatus]=useState();
const [color,setcolor]=useState("white");
const [checkStatus,setStatusCheck]=useState(false); 
  const handleAdd=(mainId,id, nm,pr,chf,num  )=>{
    if (num > 0) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        [id]: num
      }));
      setName((n)=>({
        ...n,
        [id]:nm
      }));
      setPrice((p)=>({
        ...p,
        [id]:pr
      }));  
      setId((i)=>({
        ...i,
        [id]:id
      }));
      setChef((c)=>({
        ...c,
        [id]:chf
      }))

      if (mainId === "121") {
        setNumber(0.5);
      } else {
        setNumber(1);
      }
    } else {
      const { [id]: _, ...rest } = order;
      const {[id]: r, ...restId }= Id
      const {[id]: e, ...restName }= name
      const {[id]: p, ...restprice }= price
      const {[id]: c, ...restChef }= chef


      setOrder(rest);
     setId(restId);
     setName(restName);
     setPrice(restprice);
     setChef(restChef)

    }
  }
 
  // const selectedchef = Object.keys(order).filter((id) => order[id] > 0).map((id) => chef[id]);
  const selectedNames = Object.keys(order).filter((id) => order[id] > 0).map((id) => name[id]);
  const selectedprices = Object.keys(order).filter((id) => order[id] > 0).map((id) => price[id]);
  const selectedIds = Object.keys(order).filter((item) => order[item] > 0);
  const selectedQuantities = Object.values(order).filter((quantity) => quantity > 0);
  const totalPrice = selectedIds.reduce((acc, _, index) => acc + (selectedprices[index] * selectedQuantities[index]), 0);
  const handler = () =>{
    setOpen(true); 
    setMainOrder(mainorder + 1);
  }
// get the updated price to show it in the order detais 
  const getTotalPrice = async () => {
    const formData = new FormData();
    formData.append('tableid', tblId);
    formData.append('date', dt);
    formData.append('time', tm);
    try {
      const response = await axios.post(updateTotaleprice, formData);
      const { message, totalPrice2 } = response.data;
      console.log(message); // Log the message if needed
      console.log(totalPrice2); // Log the updated totalPrice
      setTotalOrderPrice(totalPrice2); // Set the totalPrice state variable
    } catch (error) {
      console.error('Error:123', error);
    }
  };

  const fetchOrderId = async () => {
    const formData = new FormData();
    formData.append('tableid', tblId);
    formData.append('date', dt);
    formData.append('time', tm);
    try {
        const response = await axios.post(selectOrderId, formData);

        if (response.data.status === 'success') {
            setOrderId(response.data.orderId);
            setOrderIdsatatus(response.data.recorded);
            // setStatus(response.data.statuss);
            
            
            console.log(orderId)
        } else {
            console.error('Error:', response.data.message);
        }
    } catch (error) {
        console.error('Axios error:', error);
    }
};

const changeColorStatus=(status)=>{
  if(status=="not ready"){
    return"red";
  }
  else if(status == "Cooking"){
    return"yellow";
  }
  else{
   return "green";
  }
}


const handleOrderDetails = async (e) => {
   
    const formData = new FormData();
    formData.append('tableid', tblId);
    formData.append('date', dt);
    formData.append('time', tm);
  
  
    try {
      const response = await axios.post(selectOrderDetails, formData);
  
      const data = response.data;
      
      setOrderDetaials(data.orderDetails);
      setStatus(data.status);
      setisOrder(true);
      getTotalPrice();
  } catch (error) {
      console.error('Error:', error);
  }
  
       
      
  };

const handleStatus = () => {
if(orderDetails.length == 0){
  setStatusCheck(false);
}
else{
  setStatusCheck(true);
}
}

  const orderexist =()=>{
    if(selectedIds.length==0){
      setisOrder(false);

    }
    else{
      setisOrder(true);

    }
  }
  // const handleRecordedChange = async (orderId) => {
  //   try {
  //     const response = await axios.post(updateCashier, [
  //       { OrderId: orderId }
  //     ]);
  //     const status = response.data.status;
  //     if (status === 'success selection') {
  //       setStatus(response.data.statuss);
  //       setOrderIdsatatus(response.data.recorded);
  //       console.log("handle reco" , orderId)
  //     }
  //   } catch (error) {
  //     console.error('Error updating recorded status:', error);
  //   }
  // };





// Create the main order 
  const handleSubmit = async (e) => {
    handleStatus();
    orderexist();
    fetchOrderId();
    fetchOrderId();
handler();
if(mainorder+1==1){
  e.preventDefault();
  const tlt=0;
  const formData = new FormData();
  formData.append('tblId', tblId);
  formData.append('date', dt);
  formData.append('time', tm);
  formData.append('totalPrice',tlt);


  try {
      const response =await axios.post(insertMainOrder, formData);
      console.log(response.data.message);
     
  } catch (error) {
      console.error('Error:', error);
  }
}
     
    
};









// insert the Order details 
  const handleInsert = () => {
    handleStatus();
    orderexist();
    fetchOrderId();
      setOrderLoading(true);
      const formData = new FormData();
      formData.append('tableid', tblId);
      formData.append('time', tm);
      formData.append('date', dt);
      formData.append('total',totalPrice);
  
  
      const dataToSend = selectedIds.map((Id) => ({
        id: Id,
        chef: chef[Id],
        quantity: order[Id],
        price: price[Id] * order[Id],
        notes: notes[Id] || '',
      }));
  
      formData.append('data', JSON.stringify(dataToSend));
     
      axios.post(insertOrderDetails, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer your-auth-token-if-needed'
        }
      })
      .then(response => {
        console.log('success', response.data.message);
        alert("Order succesfully added");
        setChef([]);
        setOrder([]);
        setPrice([]);
        setNotes([]);
        handleOrderDetails();
        setOrderLoading(false);
        setisOrder(true);
        setisOrder(false);
        axios.post(updateTotaleprice, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer your-auth-token-if-needed'
          }
        })
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    
   
  };
useEffect(()=>{

},[orderDetails])
  



  useEffect(() => {
    fetchOrderId();
    
if(orderIdStatus == 'Recorded'){
  alert("Your Order has ended if you want a new order please scan again the QR code on your Table")
  navigate('/');
}
if(orderDetails.length>0){
  handleOrderDetails(); 
}

      axios
      .get(
        ` ${subItem} ${id}`
      )
      .then((response) => {
        setElements(response.data);
     

      })
      .catch((error) => {
        console.error("Error fetching elements:", error);
      });
    }, [id,orderIdStatus,orderId,status,orderDetails]);
    
  
  
  return (
    <div>


{/* Menu Header */}
      <div
        style={{
          background: "#F4F5A6",
          alignItems: "center",
          textAlign: "center",
        }}
       
      >
        <h3 style={{color:"black"}}>Menu</h3> 
      </div>


{/* Order Details */}
{open && (
        <Drawer
          anchor="bottom"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: "100%",
              height:"100%",
              backgroundColor: "#21211f",
            },
          }}
          
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography color={"goldenrod"} variant={"h6"} component={"div"} sx={{ flexGrow: 1.5 }} style={{display:"flex",justifyContent:"space-between"}}>
              Order Details: {orderLoading && (
                <div>
                  Loading... <CircularProgress style={{marginLeft:"15px"}}  className="reload-icon" />

                </div>
              )}
              <CloseIcon onClick={()=>setOpen(false)}  style={{fontSize:"40px"}} />
            </Typography>
            <Divider />
                  {isorder && (
                    <>
                      <div className="orderDetails" style={{display:"block"}}  >

<div className="orderHeader" style={{display:"flex" , justifyContent:"center",padding:"5px"}}>
<h3>Selected Items: {selectedIds.length}</h3>
</div>
<div>

{/* table of Order Details */}
<table  className="borderedTableMenu">
<thead>
<tr>
<th>Name</th>
<th>Quantity</th>
<th>price</th>
<th style={{textAlign:"center"}}>Notes</th>
</tr>
</thead>
<tbody>
{selectedIds.map((Id, index) => (
<tr key={index}>

<td>
<p >
{selectedNames[index]}
</p>
</td>
<td>
<p >
{selectedQuantities[index]}
</p>
</td>
<td>
<p >
{selectedprices[index] * selectedQuantities[index]} $
</p>
</td>

<td >
<input
type="text"
value={notes[Id] || ''}
onChange={(e) => {
const newNotes = { ...notes, [Id]: e.target.value };
setNotes(newNotes);
}}
style={{border:"none",outline:"none", padding:"auto",fontSize:"15px",width:"100%"}}
/>
</td>
 
</tr>
))}
<tr>
<td colSpan="3" style={{ textAlign: 'right' }}>
<h1 style={{display:"flex" , justifyContent:"center"}}>Total:</h1>  
</td>
<td>
<h1 style={{textAlign:"center"}}>{totalPrice } $</h1> 
</td>
</tr>
</tbody>

</table>
<br></br>
<div style={{padding:"10px"}}>
<button onClick={handleInsert}  style={{background:"rgb(236, 37, 37)",borderRadius:"20px" , padding:"10px"}}  >Confirm </button>
</div>

</div>
</div>
                    
                    
                    </>
                  )}
                
{/* Order Details */}
<Divider />
<Typography color={"goldenrod"} variant={"h6"} component={"div"} sx={{ flexGrow: 1.5 }}>
            Your Order Details: 
            </Typography>
<Divider />
    <div className="secTable">
    <table className="borderedTableMenu">
    <thead>
    <tr>
    <th>Name</th>
    <th>Quantity</th>
    <th>price</th>
    <th style={{textAlign:"center"}}>Notes</th>
    </tr>
    </thead>
    <tbody>
  {orderDetails.map((o,index)=>(
    <tr key={index}>
    
    <td>
    <p >
    {o.name}
    </p>
    </td>
    <td>
    <p >
    {o.quantity}
    </p>
    </td>
    <td>
    <p > 
    {o.price * o.quantity} $
    </p>
    </td>
    
    <td>
   <p>
    {o.note}
   </p>
    </td>
    
    </tr>
    
    ))}
    <tr>
      <td colSpan="3" style={{ textAlign: 'right',textAlign:"center" }}>
         <h1>
          Total Price
          </h1> 
          </td>
      <td><h1>{totalOrderPrice}$</h1>
      </td>
    </tr>
 
    </tbody>
    </table>
    <div style={{height:"20px"}}></div>

    {checkStatus && (

    <div style={{display:"flex", justifyContent:"center"}}>
      

      <div style={{width:"180px" , height:"40px", background:changeColorStatus(status) ,borderRadius:"20px",textAlign:"center"}}>
       <h2 style={{textAlign:"center"}}>{status}</h2> 
        </div>
      
      
    </div>
    )}
    </div>




          </Box>
        </Drawer>
      )}





{/* GET SubItems Details */}
      <div className="thirdItems">
        {elements.map((subItem) => (
          <div key={subItem.id}>
            <img
              src={
                images + subItem.Image
              }
              alt={subItem.Name}
            />
            <h2>{subItem.Name}</h2>



            <div className="order">
            <button
                className="button"
                onClick={() => handleAdd(subItem.menuitemId, subItem.id, subItem.Name, subItem.price, subItem.chefId, order[subItem.id] ? order[subItem.id] - number : 0)}
              >
                -
              </button>
              <h1 style={{ color: "white" }}>  
              {order[subItem.id] || 0} 
              </h1>
              <button
                className="button"
                onClick={() => handleAdd(subItem.menuitemId,subItem.id, subItem.Name, subItem.price, subItem.chefId, (order[subItem.id] || 0) + number)}
              >
                +
              </button>


             

            </div>
            <h2>{subItem.price}$</h2>
            
          </div>
        ))}



      </div>
     

{/* Button to Open the Order Details */}
        <div className="placeOrder">

              <button className="btn"  onClick={handleSubmit}  > placeOrder </button>
           
        </div>

       

     
    </div>
  );
};

export default ThirdMenu;