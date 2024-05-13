import React, { useEffect, useState } from "react";
import "../../../styles/Menu.css";
import axios from "axios";
import { subItem , insertSubItems,images ,deleteThird } from "../../../constants/API";
import { CircularProgress } from '@mui/material';


const ThirdMenu = ({ data }) => {
  const [elements, setElements] = useState([]);
  const [name,setName]=useState('');
  const [price,setPrice]=useState('');
  const [image,setImage]=useState(null);
  const id = data;
  const [reload,setReload]=useState(false);
  const [message,setMessage]=useState('');
const [dltReload , setdltReload] = useState(false);
 const [dlt ,setDelete]=useState('');
  


  const handleNameChange = (e) => {
    setName(e.target.value);
};
const handlePriceChange = (e) => {
  setPrice(e.target.value);
};


const handleImageChange = (e) => {
    setImage(e.target.files[0]);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('id', data);
  formData.append('name', name);
  formData.append('image', image);
  formData.append('price', price)
  try {
      const response = await axios.post(insertSubItems , formData);
      console.log(response.data.message);
      setName('');
      setImage(null);
      setReload(false);
      setPrice('');
      axios
        .get(  ` ${subItem} ${id}`        )
        .then((response) => {
          setElements(response.data);
        })
        .catch((error) => {
          console.error("Error fetching elements:", error);
        });
  } catch (error) {
      console.error('Error:', error);
  }
};

const handleDelete = () => {
  axios.get(`${deleteThird}${dlt}`)
    .then((response) => {
      setMessage(response.data);
      setdltReload(false);
      console.log(message);
    })
    .catch(error => console.error('Error:', error));
    axios
    .get(`${subItem} ${id}`)
    .then((response) => {
      setElements(response.data);
    })
    .catch((error) => {
      console.error("Error fetching elements:", error);
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


  return (
    <div>
          
      <div
        style={{
          background: "#F4F5A6",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h3>Menu</h3>
      </div>

      <div  className="addThird">
                  <div >
                  <form onSubmit={handleSubmit}>
            <label style={{color:"white"}}>Name:</label>
            <input required  type="text" name="name"  value={name} onChange={handleNameChange} />
            <br />
            <br />

            <label style={{color:"white"}}>Price:</label>
            <input required  type="number" name="price"  value={price} onChange={handlePriceChange} />
            <br />

            <p style={{color:"white"}}>{name} {id}</p>
            <br />
            
            <label style={{color:"white"}}>Image:</label>
            <input required  type="file"  accept="image/*" onChange={handleImageChange}/>
            <br />
            <button type="submit" onClick={()=>setReload(true)} >Upload</button>
            {reload && (
        <div className="reload">
<h2 >Loding...  
<CircularProgress style={{marginLeft:"15px"}}  className="reload-icon" />

</h2>
        </div>

      )}
        </form>
                    
                  </div>
                  
                
                </div>
      <div className="thirdItems">
        {elements.map((subItem) => (
          <div key={subItem.id}>
            <img
              src={
                images + subItem.Image
              }
              alt={subItem.Name}
            />

            <h4>{subItem.Name} id: {subItem.id}</h4>
            <h4>{subItem.price}$</h4>

            <button style={{padding:"8px" ,borderRadius:"10px"}} onClick={() => { setDelete(subItem.id); handleDelete();setdltReload(true) }} > Delete </button>
            
          </div>
        ))}
      </div>

      {dltReload && (
<div className="reload">
<h2 style={{marginLeft:"50%" }} >Deleting...  
<CircularProgress style={{marginLeft:"15px"}}  className="reload-icon" />

</h2>
</div>

)}


      <div style={{height:"50px"}}></div>
    </div>
  );
};

export default ThirdMenu;
