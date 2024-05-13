import React, { useState , useEffect } from 'react'
import LayoutAdmin from '../../../compounent/Admin/LayoutAdmin';
import "./tables.css"
import { insertTables , selectTables} from '../../../constants/API'
import axios from 'axios';
const Tables = () => {
  const[table , setTable]=useState('');
  const[password , setPassword]=useState('');
  const [tables,setTables]=useState([]);
  const handleNameChange=(e)=>{
    setTable(e.target.value);
  };
  const handelPasswordChange=(e)=>{
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    formData.append('table', table);
    formData.append('password', password);
  
    try {
        const response = await axios.post(insertTables, formData);
        console.log(response.data.message);
        setTable('');
        setPassword('');

        axios
        .get(selectTables)
        .then((response) => {
          setTables(response.data);
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
        .get(selectTables)
        .then((response) => {
          setTables(response.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    
    }, []);

  return (
    <LayoutAdmin>

    <div  className="container">

   
    <div className='fix' style={{height:"100px"}}></div>
  <div className='form'>
    <div  style={{height:"100px"}}></div>
    <form style={{  justifyContent:"center",textAlign:"center"}}  onSubmit={handleSubmit}>
    <label >Name:</label>
          <input type="text" required name="name" value={table} onChange={handleNameChange}  />
         
          <br /> <br></br>
    <label >Password:</label>
          <input type="text" name="password" value={password} onChange={handelPasswordChange}   />
          

          <br /> <br></br>
             
       <br /> <br></br>

            

       <button style={{padding:"8px" , borderRadius:"10px"}} type='submit'>submit</button>


    </form>


  </div>
  
 
             

    <div  className='tabel-users'>
      <h1 style={{color:"white"}}>users </h1>
      <tabel className="borderedTable">
       
        <thead>
  <tr>
    <th>id</th>
    <th>Table</th>
    <th>password</th>
  </tr>
</thead>

<tbody>
{tables.map((u) => (
  <tr key={u.id}>
    <td>
      <p style={{ margin: 0, padding: '5px 10px', background: '#f0f0f0', borderRadius: '5px', display: 'inline-block', marginRight: '10px' }}>
        {u.id}
      </p>
    </td>
    <td>
      <p style={{ margin: 0, padding: '5px 10px', background: '#f0f0f0', borderRadius: '5px', display: 'inline-block', marginRight: '10px' }}>
        {u.tableName}
      </p>
    </td>
    <td>
      <p style={{ margin: 0, padding: '5px 10px', background: '#f0f0f0', borderRadius: '5px', display: 'inline-block', marginRight: '10px' }}>
        {u.password}
      </p>
    </td>
 
    </tr>
))}
    </tbody>
    
      </tabel>

    </div>
              

    </div>



  </LayoutAdmin>
  )
}

export default Tables