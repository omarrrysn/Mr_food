import React, { useEffect, useState } from "react";
import LayoutAdmin from '../../../compounent/Admin/LayoutAdmin';
import SecondMenu from "./SeconedMenu";
import "../../../styles/Menu.css";
import axios from "axios";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { insertMainMenu,mainMenu } from "../../../constants/API";
function MenuAdmin() {
  const [sec, setSec] = useState("1");
  const [data, setData] = useState([]);
  const [add,setAdd] = useState(false)
  const [name, setName] = useState('');
  const [reload,setReload]=useState(true);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post( insertMainMenu, {
        firstList: name
      });
      if (response.status === 200) {
        console.log('Data inserted successfully!');
        setAdd(false);
        setName('');
        // Reload data after successful insertion
        fetchData();
      } else {
        console.log('Failed to insert data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  const fetchData = () => {
    axios
      .get(mainMenu)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LayoutAdmin>
      <div style={{ height: 50 }}></div>
      <div className="firstList">
        {data.map((item) => (
          <div key={item.id}>
            <h2
              onClick={() => setSec(item.id)}
              style={{
                color: sec === item.id ? "red" : "black",
                cursor: "pointer",
              }}
            >
              {item.firstList}
            </h2>
          </div>
        ))}
        <div style={{width:"20px"}}></div>
        <div className="add">
        {add === false ? <AddCircleOutlineIcon style={{cursor:"pointer"}} onClick={() => setAdd(true)} /> :
         
         <form onSubmit={handleSubmit}>
         <input
         name="firstList"
           type="text"
           placeholder="Enter a list"
           value={name}
           onChange={(e) => setName(e.target.value)}
           
         />

<button style={{background:"transparent", border:"none",cursor:"pointer"}}onClick={() => setAdd(false)} type="submit"><AddCircleOutlineIcon /></button>

        
       </form>

         }

        </div>
      </div>
      {sec && <SecondMenu idd={sec} />}
    </LayoutAdmin>
  );
}

export default MenuAdmin;
