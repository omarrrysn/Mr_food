import React, { useEffect, useState } from "react";
import Layout from "../../compounent/layout/layout";
import SecondMenu from "./SecondMenu";
import "../../styles/Menu.css";
import axios from "axios";
import { mainMenu } from "../../constants/API";
import { CircularProgress } from '@mui/material';
import PageNotFound from './PageNotFound';

function Menu() {
  const storedTableId = localStorage.getItem('tableId');
  const [tableId1, setTableId] = useState(storedTableId || 0);
  const [sec, setSec] = useState(null);
  const [data, setData] = useState([]);
const [reload,setReload]=useState(true);
const [hours, sethours]=useState();
const [date, setDate] = useState('');
const [check , setCheck]=useState();
const h=hours;
const d=date;


const handlecheck=()=>{ 
  if (tableId1==0){
    setCheck(false);
  }
  else{
    setCheck(true);
  }
}


const handleTimeDate = () => {
    const dateObj = new Date();
  const hour = (new Date().getHours() % 12) || 12;
const minutes = new Date().getMinutes();
const amPm = new Date().getHours() < 12 ? 'AM' : 'PM';
let tm = ``;

if (minutes.toString().length < 2) {
  tm += `${hour}:0${minutes} ${amPm}`;
} else {
  tm += `${hour}:${minutes} ${amPm}` ;
}

sethours(tm);
const month = (dateObj.getMonth() + 1).toString();// Months are 0-based
const day = dateObj.getDate().toString().padStart(2, '0');
const year = dateObj.getFullYear();
const formattedDate = `${month}/${day}/${year}`;

// Set the formatted date
setDate(formattedDate);
  };
  useEffect(() => {
    handlecheck();
      axios
      .get(mainMenu)
      .then((response) => {
        setReload(false);
        handleTimeDate();
        setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }, []);

  return (
    <div>
{check ? (
  <Layout>
    <div style={{ height: 50 }}></div>
    {reload && (
      <div className="reload">
        <h2 style={{ marginLeft: "20px" }}>
          Loading...
          <CircularProgress style={{ marginLeft: "15px" }} className="reload-icon" />
        </h2>
      </div>
    )}
    <div className="firstList">
      {data.map((item) => (
        <div key={item.id}>
          <h2
            onClick={() => setSec(item)}
            style={{
              color: sec === item ? "red" : "black",
              cursor: "pointer",
            }}
          >
            {item.firstList}
          </h2>
        </div>
      ))}
    </div>
    
    {sec && <SecondMenu idd={sec.id} tableid={tableId1} time={h} date={d} />}
  </Layout>
) : (
  <PageNotFound />
)}


    
    </div>
  );
}

export default Menu;
