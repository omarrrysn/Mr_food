import React, { useState ,useEffect } from 'react'
import '../Accounts/accounts.css'
import LayoutAdmin from '../../../compounent/Admin/LayoutAdmin'
import axios from 'axios'
import { selectedRole ,insertUsers,selectedUsers } from '../../../constants/API'
const Accounts = () => {
const [name , setName]=useState('');
const [email , setEmail] = useState('');
const [password , setpassword]= useState('');
const [role , setRole]=useState();
const[data,setData]=useState([]);
const [users , setUsers] =useState([]);
const [openEdit,setOpenEdit]=useState(false);
const [editName,setEditName]=useState();
const [editpassword,setEditPassword]=useState();
const [EditRole, setEditRole]=useState();







const handleNameChange=(e)=>{
  setName(e.target.value);
};
const handelEmailChange = (e)=>{
  setEmail(e.target.value);
};
const handelPasswordChange = (e)=>{
  setpassword(e.target.value);
};
const handelRoleChange = (e)=>{
  setRole(e.target.value);
};


const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('role', role);

  try {
      const response = await axios.post(insertUsers, formData);
      console.log(response.data.message);
      setName('');
      setEmail('');
      setpassword('');
      
      axios
      .get(selectedUsers)
      .then((response) => {
        setUsers(response.data);
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
      .get(selectedUsers)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  
    axios
      .get(selectedRole)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching role data:", error);
      });
  }, []);

  return (
    <LayoutAdmin  >
      <div  className="container">

     
      <div className='fix' style={{height:"100px"}}></div>
    <div className='form'>
      <div  style={{height:"100px"}}></div>
      <form style={{  justifyContent:"center",textAlign:"center"}} onSubmit={handleSubmit}  >
      <label >Name:</label>
            <input type="text" required name="name" value={name} onChange={handleNameChange}  />
            <br /> <br></br>
      <label >Eamil:</label>
            <input type="email" required name="email"  value={email} onChange={handelEmailChange}  />
            <br /> <br></br>
      <label >Password:</label>
            <input type="text" name="password" value={password} required onChange={handelPasswordChange}  />
            <br /> <br></br>

            <label>Role:</label>


            <select name="menuList" style={{width:"110px"}} value={role} required onChange={handelRoleChange}>
            <option  value="">choose a Role</option>
              {data.map((r)=>(
                
                  <option  value={r.id}>{r.role}</option>
                  ))}
                  </select>
      
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
      <th>Name</th>
      <th>Email</th>
      <th>password</th>
      <th>role</th>
      <th>Edit</th>
    </tr>
  </thead>

  <tbody>
  {users.map((u) => (
    <tr key={u.id}>
      <td>
        <p style={{ margin: 0, padding: '5px 10px', background: '#f0f0f0', borderRadius: '5px', display: 'inline-block', marginRight: '10px' }}>
          {u.id}
        </p>
      </td>
      <td>
        <p style={{ margin: 0, padding: '5px 10px', background: '#f0f0f0', borderRadius: '5px', display: 'inline-block', marginRight: '10px' }}>
          {u.name}
        </p>
      </td>
      <td>
        <p style={{ margin: 0, padding: '5px 10px', background: '#f0f0f0', borderRadius: '5px', display: 'inline-block', marginRight: '10px' }}>
          {u.email}
        </p>
      </td>
      <td>
        <p style={{ margin: 0, padding: '5px 10px', background: '#f0f0f0', borderRadius: '5px', display: 'inline-block', marginRight: '10px' }}>
          {u.password}
        </p>
      </td>
      <td>
        <p style={{ margin: 0, padding: '5px 10px', background: '#f0f0f0', borderRadius: '5px', display: 'inline-block', marginRight: '10px' }}>
          {u.Role}
        </p>
      </td>
      <td>
        <button style={{padding:"8px",borderRadius:"30px"}}> Edit </button>
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

export default Accounts