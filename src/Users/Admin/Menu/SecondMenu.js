import React, { useEffect, useState } from "react";
import ThirdMenu from "./ThirdMenu";
import "../../../styles/Menu.css";
import axios from "axios";
import { secondList, insertItems,images,selectchef , deleteSecond} from "../../../constants/API";
import { CircularProgress } from '@mui/material';

const SecondMenu = ({ idd }) => {
  const [third, setThird] = useState("1");
  const [elements, setElements] = useState([]);
  const id = idd;
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [chef ,setChef]= useState('');
  const [data,setdata]=useState([]);
  const [reload ,setReload]=useState(false);
 const [dlt ,setDelete]=useState('');
 const [edit,setEdit]=useState(false);
const [message,setMessage]=useState('');
const [dltReload , setdltReload] = useState(false);
const [editItem, setEditItem] = useState(null);
  const handleNameChange = (e) => {
      setName(e.target.value);
  };

  

  const handleImageChange = (e) => {
      setImage(e.target.files[0]);
  };

  const handelRoleChange=(e)=>{
    setChef(e.target.value);
  }

  
  const handleDelete = () => {
    axios.get(`${deleteSecond}${dlt}`)
      .then((response) => {
        setMessage(response.data);
        setdltReload(false);
        console.log(message);
      })
      .catch(error => console.error('Error:', error));
      axios
      .get(`${secondList} ${id}`)
      .then((response) => {
        setElements(response.data);
      })
      .catch((error) => {
        console.error("Error fetching elements:", error);
      });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', idd);
    formData.append('name', name);
    formData.append('image', image);
    formData.append('chef',chef);


    try {
        const response = await axios.post(insertItems, formData);
        console.log(response.data.message);
        setName('');
        setChef('');
        setReload(false);
        setImage(null);
      
        // Refresh elements after successful insertion
        axios
          .get(`${secondList} ${id}`)
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




  useEffect(() => {

    axios
    .get(selectchef)
    .then((response) => {
      setdata(response.data);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });

    axios
      .get(
        ` ${secondList}  ${id}`
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

    <div className="sec">
    <div  className="addsec">
                   <img src={require('../../../constants/image/addImage.png')} alt="loading" style={{cursor:"pointer"}}/>
                  <div >
                  <form onSubmit={handleSubmit}>
            <label style={{color:"white"}}>Name:</label>
            <input type="text" name="name"  value={name} onChange={handleNameChange}  required/>
            <br />
            <p style={{color:"white"}}>{idd}</p>
            <br />
            <label style={{color:"white"}}>chef:</label>
            <select  name="menuList" required  style={{width:"110px"}} value={chef}  onChange={handelRoleChange}>
            <option   value="">Choose a chef</option>

              {data.map((r)=>(
                
                  <option   value={r.id}>{r.name}</option>
                  ))}
                  </select>
            <br />
            

            <br />
            
            <label style={{color:"white"}}>Image:</label>
            <input required  type="file"accept="image/*"   onChange={handleImageChange} />
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
      <div className="secondList ad2">
        {elements.map((item) => (
          <div className="secItems" key={item.id}>
            
            <img
              src={images + item.image}
              alt={item.name}
              loading="lazy"
              style={{
                border:
                  third === item.id
                    ? "5px solid goldenrod"
                    : "4px solid rgba(0, 0, 0, 0.448)  ",
                cursor: "pointer",
              }}
              onClick={() => setThird(item.id)}
              />
              
            <h3
              style={{
                color: third === item ? "goldenrod" : "#F4F5A6",
                cursor: "pointer",
              }}
            >
              {item.name} {item.id}
              <br></br>
              <br></br>
              <button style={{padding:"8px" ,borderRadius:"10px"}} 
              onClick={() => { setDelete(item.id); handleDelete();setdltReload(true) }} > Delete </button>
              <br></br>
              <br></br>
              {/* <button
        style={{ padding: "8px", borderRadius: "10px" }}
        onClick={() => { setEditItem(item); setEdit(true); }}
      >
        Edit
      </button> */}
            </h3>
            {/* {edit && editItem.id === item.id && (
      <form onSubmit={(e) => {
          e.preventDefault();
          
          }}>
              <br></br>
        <br></br>
        <input
          type="text"
          value={editItem.name}
          onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
        />
        
          <br></br>
        <br></br>
        <input
          type="file"
          onChange={(e) => setEditItem({ ...editItem, image: e.target.files[0] })}
        />
       
        <br></br>
        <br></br>
        <button type="submit"   >Save</button>
      </form>
    )} */}


          

          </div>
        ))}


      </div>
      
    </div>
        {dltReload && (
<div className="reload">
<h2 style={{marginLeft:"50%" }} >Deleting...  
<CircularProgress style={{marginLeft:"15px"}}  className="reload-icon" />

</h2>
</div>

)}
      {third && <ThirdMenu data={third} />}
    </div>

  );
};

export default SecondMenu;
