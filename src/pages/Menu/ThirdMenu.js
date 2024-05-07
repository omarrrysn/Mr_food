import React, { useEffect, useState } from "react";
import "../../styles/Menu.css";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { subItem , images } from "../../constants/API";



const ThirdMenu = ({ data }) => {


  const [elements, setElements] = useState([]);
  const [order , setOrder] = useState([]);
  const[Id,setId]=useState([]);
  const[name ,setName]=useState([]);
  const[open,setopen]=useState(false);
  const[price,setPrice]=useState([]);
  const [chef,setChef]=useState([]);
  const [notes,setNotes]=useState([]);
  const id = data;
  const handleAdd=(id, nm,pr,chf,num  )=>{
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
  const handleInsert = () => {
    const dataToSend = selectedIds.map((Id) => ({
      id: Id,
      chef: chef[Id],
      quantity: order[Id],
      price: price[Id],
      notes: notes[Id] || ''
    }));
  
    fetch('https://transportationaqo.000webhostapp.com/php/insertOrderDetails.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: dataToSend }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

 
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
    
    
  
  const selectedchef = Object.keys(order).filter((id) => order[id] > 0).map((id) => chef[id]);
  const selectedNames = Object.keys(order).filter((id) => order[id] > 0).map((id) => name[id]);
  const selectedprices = Object.keys(order).filter((id) => order[id] > 0).map((id) => price[id]);
  const selectedIds = Object.keys(order).filter((item) => order[item] > 0);
  const selectedQuantities = Object.values(order).filter((quantity) => quantity > 0);
  
  
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
        <h3>Menu</h3>
      </div>



{/* Order Details */}
      {open && (
        <div className="orderDetails" style={{display:"block"}}  >

          <div className="orderHeader">
        <h3>Selected Items:</h3>
        <div>

        <CloseIcon onClick={()=>setopen(false)}  style={{fontSize:"40px"}} />
        </div>
          </div>
        <div>
        
{/* table of Order Details */}
        <table className="borderedTable">
  <thead>
    <tr>
      <th>id</th>
      <th>Name</th>
      <th>Quantity</th>
      <th>price</th>
      <th>Notes</th>
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
          {selectedprices[index] * selectedQuantities[index]} $
        </p>
      </td>
      <td>
        <p style={{ margin: 0, padding: '5px 10px', background: '#f0f0f0', borderRadius: '5px', display: 'inline-block', marginRight: '10px' }}>
          {selectedchef[index ]} 
        </p>
      </td>
      <td>
      <input
        type="text"
        value={notes[Id] || ''}
        onChange={(e) => {
          const newNotes = { ...notes, [Id]: e.target.value };
          setNotes(newNotes);
        }}
        style={{border:"none",outline:"none", padding:"10px",fontSize:"20px"}}
      />
    </td>
      
    </tr>
  ))}
  <tr>
    <td colSpan="3" style={{ textAlign: 'right' }}>
    <h1 style={{display:"flex" , justifyContent:"center"}}>Total:</h1>  
    </td>
    <td>
      {selectedIds.reduce((acc, _, index) => acc + selectedprices[index] * selectedQuantities[index], 0)} $
    </td>
  </tr>
</tbody>

</table>
        <div>
          <button onClick={handleInsert} >Confirm </button>
          </div>
        
    </div>
        </div>
        
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
            <h4>{subItem.Name}</h4>



            <div className="order">
              <button
                className="button "
                onClick={() => handleAdd(subItem.id,subItem.Name,subItem.price,subItem.chefId ,order[subItem.id] ? order[subItem.id] - 1 : 0)}
              >
                -
              </button>
              <h1 style={{ color: "white" }}>  
              {order[subItem.id] || 0} 
              </h1>
              <button
                className="button "
                onClick={() => handleAdd(subItem.id,subItem.Name,subItem.price,subItem.chefId  , (order[subItem.id] || 0) + 1)}
              >
                +
              </button>

             

            </div>
            <h2>{subItem.price}$</h2>
            <h2>{subItem.chefId}</h2>
          </div>
        ))}



      </div>
     

{/* Button to Open the Order Details */}
        <div className="placeOrder">

              <button className="btn" onClick={()=> setopen(true)}  > placeOrder    </button>
          
        </div>

       

     
    </div>
  );
};

export default ThirdMenu;
