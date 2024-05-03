import React, { useEffect, useState } from "react";
import Layout from "../../compounent/layout/layout";
import SecondMenu from "./SecondMenu";
import "../../styles/Menu.css";
import axios from "axios";
import { mainMenu } from "../../constants/API";
function Menu() {
  const [sec, setSec] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
      axios
        .get(mainMenu)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }, []);

  return (
    <Layout>
      <div style={{ height: 50 }}></div>
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
      {sec && <SecondMenu idd={sec.id} />}
    </Layout>
  );
}

export default Menu;
