import React, { useEffect, useState } from "react";
import "../../styles/Menu.css";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { subItem , images } from "../../constants/API";
import { Link } from "@mui/material";
import OrderDetails from "./OrderDetails";
const ThirdMenu = ({ data }) => {

  const [elements, setElements] = useState([]);
  const [order , setOrder] = useState([]);
  const[Id,setId]=useState([]);
  const[name ,setName]=useState([]);
  const[open,setopen]=useState(false);
  const[price,setPrice]=useState([]);
  const id = data;
  
  const handleAdd=(id, nm,pr,num  )=>{
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
    } else {
      const { [id]: _, ...rest } = order;
      const {[id]: r, ...restId }= Id
      const {[id]: e, ...restName }= name
      const {[id]: p, ...restprice }= price


      setOrder(rest);
     setId(restId);
     setName(restName);
     setPrice(restprice);

    }
  }




  useEffect(() => {
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
  }, [id]);


  
  const selectedNames = Object.keys(order).filter((id) => order[id] > 0).map((id) => name[id]);
  const selectedprices = Object.keys(order).filter((id) => order[id] > 0).map((id) => price[id]);
  const selectedIds = Object.keys(order).filter((item) => order[item] > 0);
  const selectedQuantities = Object.values(order).filter((quantity) => quantity > 0);

  
  return (
    <div>



      <div
        style={{
          background: "#F4F5A6",
          alignItems: "center",
          textAlign: "center",
        }}
        id="orderDetails"
      >
        <h3>Menu</h3>
      </div>

      {open && (
        <div className="orderDetails" style={{display:"block"}}  >

          <div className="orderHeader">
        <h3>Selected Items:</h3>
        <div>

        <CloseIcon onClick={()=>setopen(false)}  style={{fontSize:"40px"}} />
        </div>
          </div>
        <div>
        

        <table class="borderedTable">
  <thead>
    <tr>
      <th>id</th>
      <th>Name</th>
      <th>Quantity</th>
      <th>price</th>
    </tr>
  </thead>
  <tbody>
    {selectedIds.map((Id, index) => (
      <tr key={index}>
        <td>
          <p style={{ margin: 0, padding: '5px 10px', background: '#f0f0f0', borderRadius: '5px', display: 'inline-block', marginRight: '10px' }}>
            {Id}
          </p>
        </td>
        <td>
        <p style={{ margin: 0, padding: '5px 10px', background: '#f0f0f0', borderRadius: '5px', display: 'inline-block', marginRight: '10px' }}>
            {selectedNames[index]}
          </p>
          </td> 
        <td>
          <p style={{ margin: 0, padding: '5px 10px', background: '#f0f0f0', borderRadius: '5px', display: 'inline-block', marginRight: '10px' }}>
            {selectedQuantities[index]}
          </p>
        </td>
        <td>
          <p style={{ margin: 0, padding: '5px 10px', background: '#f0f0f0', borderRadius: '5px', display: 'inline-block', marginRight: '10px' }}>
            {selectedprices[index]*selectedQuantities[index]}
          </p>
        </td>
      </tr>
    ))}
  </tbody>
</table>
        
    </div>
        </div>
        
      )}





      <div className="thirdItems">
        {elements.map((subItem) => (
          <div key={subItem.id}>
            <img
              src={
                images + subItem.Image
              }
              alt={subItem.Name}
            />
            <h4>{subItem.Name}</h4>



            <div className="order">
              <button
                className="button form"
                onClick={() => handleAdd(subItem.id,subItem.Name,subItem.price ,order[subItem.id] ? order[subItem.id] - 1 : 0)}
              >
                -
              </button>
              <h1 style={{ color: "white" }} className="form">
              {order[subItem.id] || 0} 
              </h1>
              <button
                className="button form"
                onClick={() => handleAdd(subItem.id,subItem.Name,subItem.price , (order[subItem.id] || 0) + 1)}
              >
                +
              </button>

             

            </div>
            <h2>{subItem.price}$</h2>
          </div>
        ))}



      </div>
     
        <div className="placeOrder">

              <button onClick={()=> setopen(true)}  > placeOrder    </button>
          
        </div>
    </div>
  );
};

export default ThirdMenu;
