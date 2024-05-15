import React from "react";
import Layout from "../../compounent/layout/layout";
import "../../styles/Home.css";
import BackgroundImage1 from "../../constants/images";

import Circle from "../../constants/image/Circlefood.png";
import { useLocation } from "react-router-dom";
const Home = () => {
 
  return (
    <Layout>
      <div
        className="home"
        style={{ backgroundImage: `url(  ${BackgroundImage1})` }}
      >
        <div className="headerContainer">
          <div className="textWelcome">
           
            <h1>ENJOY  OUR  </h1>
            <h1>DELICIOUS MEALS</h1>
            <br></br> 
            <p>Taste the passion in every dish & </p> 
            <p>savor the moment with every bite</p>
          </div>
            <img src={Circle} alt="error"/>
          
        </div>
      </div>
    </Layout>
  );
};

export default Home;
