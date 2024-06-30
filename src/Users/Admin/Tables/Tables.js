import React, { useState, useEffect } from 'react';
import "./tables.css";
import axios from 'axios';
import QRCodeTable from './QRCodeTable';import { insertTables, selectManger, selectTables } from '../../../constants/API';
import LayoutAdmin from '../../../compounent/Admin/LayoutAdmin';
import { QrCodeTable } from '../../../constants/API';
import PageNotFound from '../../../pages/Menu/PageNotFound';
import QRCode from 'qrcode.react';

const Tables = () => {
  const [table, setTable] = useState('');
  const [password, setPassword] = useState('');
  const [tables, setTables] = useState([]);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState('');
  const [accounts, setAccounts] = useState([]);
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
  const fetchAccounts = async () => {
    try {
      const response = await axios.get(QrCodeTable);
      console.log("Qr",response.data);
      setAccounts(response.data); // Assuming response.data is an array of account objects
    } catch (error) {
      console.error('Error fetching accounts Qr :', error);
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleNameChange = (e) => {
    setTable(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: table,
      password: password,
      mangerId: role
    };

    try {
      const response = await axios.post(insertTables, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data.message);
      setTable('');
      setPassword('');
      setRole('');

      // Fetch tables again after submitting
      fetchTables();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchTables = async () => {
    try {
      const response = await axios.get(selectTables);
      setTables(response.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(selectManger);
      console.log('Roles fetched:', response.data); 
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  useEffect(() => {
    handlecheck();
    fetchTables();
    fetchRoles();
    fetchAccounts(); // Fetch accounts when component mounts
  }, []);

  return (
   <div>
    {check ? (
       <LayoutAdmin>
       <div className="containerTable">
         <div className="fix"></div>
         <div className="form-containerTable">
           <div className="formTable">
             <form onSubmit={handleSubmit}>
               <label>Name:</label>
               <input type="text" required name="name" value={table} onChange={handleNameChange} />
               <label>Password:</label>
               <input type="text" name="password" value={password} onChange={handlePasswordChange} />
               <label>Role:</label>
               <select name="menuList" value={role} required onChange={handleRoleChange}>
                 <option value="">Choose a Manager</option>
                 {roles.map((r) => (
                   <option key={r.id} value={r.id}>{r.name}</option>
                 ))}
               </select>
               <button type="submit">Submit</button>
             </form>
           </div>
         </div>
 
         <div className="table-container">
           <h1 style={{ color: "white",marginLeft:"100px" }}>Users</h1>
           <table className="borderedTable">
             <thead>
               <tr>
                 <th>Id</th>
                 <th>Table</th>
                 <th>Password</th>
                 <th>Manager</th>
                 <th>QR Code</th>
               </tr>
             </thead>
             <tbody>
               {tables.map((u) => (
                 <tr key={u.id}>
                   <td>
                     <p>{u.id}</p>
                   </td>
                   <td>
                     <p>{u.tableName}</p>
                   </td>
                   <td>
                     <p>{u.password}</p>
                   </td>
                   <td>
                     <p>{u.mangerName}</p>
                   </td>
                   <td>
                   <QRCode 
                    value={(`${u.URL}/Login?tableName=${encodeURIComponent(u.tableName)}&password=${encodeURIComponent(u.password)}`)} 
                />
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     </LayoutAdmin>
    ):(
      <PageNotFound/>
    )}
   </div>
  );
};

export default Tables;
