import React, { useEffect, useState } from "react";
import ThirdMenu from "./ThirdMenu";
import "../../styles/Menu.css";
import axios from "axios";
import { secondList, insertItems,images } from "../../constants/API";
const SecondMenu = ({ idd }) => {
  const [third, setThird] = useState("1");
  const [elements, setElements] = useState([]);
  const id = idd;
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const handleNameChange = (e) => {
      setName(e.target.value);
  };

  

  const handleImageChange = (e) => {
      setImage(e.target.files[0]);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', idd);
    formData.append('name', name);
    formData.append('image', image);

    try {
        const response = await axios.post(insertItems, formData);
        console.log(response.data.message);
        setName('');
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
                   <img src={require('../../image/addImage.png')} alt="loading" style={{cursor:"pointer"}}/>
                  <div >
                  <form onSubmit={handleSubmit}>
            <label style={{color:"white"}}>Name:</label>
            <input type="text" name="name"  value={name} onChange={handleNameChange} />
            <br />
            <p style={{color:"white"}}>{name} {idd}</p>
            <br />
            
            <label style={{color:"white"}}>Image:</label>
            <input type="file" onChange={handleImageChange} />
            <br />
            <button type="submit">Upload</button>
        </form>
                    
                  </div>
                  
                
                </div>
      <div className="secondList">
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
            </h3>

          

          </div>
        ))}


      </div>
      <div className="updatesec">
        <form>

        </form>
      </div>
    </div>
      {third && <ThirdMenu data={third} />}
    </div>

  );
};

export default SecondMenu;
