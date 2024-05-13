import React, { useEffect, useState } from "react";
import Layout from "../../compounent/layout/layout";
import SecondMenu from "./SecondMenu";
import "../../styles/Menu.css";
import axios from "axios";
import { mainMenu } from "../../constants/API";
import { CircularProgress } from '@mui/material';
import { useLocation } from "react-router-dom";
import { Check } from "@mui/icons-material";
import PageNotFound from './PageNotFound';

function Menu() {
  const location=useLocation();
  const {tableId} = location.state || {};
  const tbl=tableId || 0;
  const [sec, setSec] = useState(null);
  const [data, setData] = useState([]);
const [reload,setReload]=useState(true);
const [hours, sethours]=useState();
const [date, setDate] = useState('');
const [check , setCheck]=useState();
const h=hours;
const d=date;


const handlecheck=()=>{ 
  if (tbl==0){
    setCheck(false);
  }
  else{
    setCheck(true);
  }
}
const handleTimeDate = () => {
  
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
      
      const currentDate = new Date().toLocaleDateString();
      setDate(currentDate);
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
    {sec && <SecondMenu idd={sec.id} tableid={tbl} time={h} date={d} />}
  </Layout>
) : (
  <PageNotFound />
)}



    
    </div>
  );
}

export default Menu;
