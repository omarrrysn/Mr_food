import React, { useEffect, useState } from "react";
import ThirdMenu from "./ThirdMenu";
import "../../styles/Menu.css";
import axios from "axios";
import { secondList , images } from "../../constants/API";
const SecondMenu = ({ idd , tableid ,time , date}) => {
  const [third, setThird] = useState(120);
  const [elements, setElements] = useState([]);
  const id = idd;

  useEffect(() => {
    axios
      .get(
        `${secondList}${id}`
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
      <div className="secondList">
    
        {elements.map((item) => (
          <div className="secItems" key={item.id}>
            
            <img
              src={ images + item.image}
              alt={item.name}
              loading="lazy"
              style={{
                border:
                  third === item
                    ? "5px solid goldenrod"
                    : "4px solid rgba(0, 0, 0, 0.448)  ",
                cursor: "pointer",
              }}
              onClick={() => setThird(item.id)}
            />
            <h3
              style={{
                color: third === item.id ? "goldenrod" : "#F4F5A6",
                cursor: "pointer",
              }}
            >
              {item.name}
            </h3>
          </div>
        ))}
      </div>
      {third && <ThirdMenu data={third} tbl={tableid} tm={time} dt={date}/>}
    </div>
  );
};

export default SecondMenu;
