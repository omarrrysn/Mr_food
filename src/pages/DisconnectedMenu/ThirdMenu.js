import React, { useEffect, useState } from "react";
import "../../styles/Menu.css";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { subItem , images ,insertOrderDetails ,insertMainOrder, selectOrderId, updateTotaleprice, selectOrderDetails} from "../../constants/API";
import { Box, Divider, Drawer, Typography } from "@mui/material";
import { CircularProgress } from '@mui/material';



const ThirdMenu = ({ data,tbl,tm,dt }) => {
  const [elements, setElements] = useState([]);
  const id = data;

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
{/* Menu Header */}
      <div
        style={{
          background: "#F4F5A6",
          alignItems: "center",
          textAlign: "center",
        }}
       
      >
        <h3 style={{color:"black"}}>Menu</h3>
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
            <h2>{subItem.Name}</h2>
            <h2>{subItem.price}$</h2>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdMenu;