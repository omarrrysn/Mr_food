import React from "react";
import Layout from "../../compounent/layout/layout";
import "../../styles/Home.css";
import circle from '../../image/Circlefood.png'
import background from '../../image/Blackbackground.jpg'
const Home = () => {
  return (
    <Layout>
      <div
        className="home"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="headerContainer">
          <div className="textWelcome">
            <h1>ENJOY  OUR  </h1>
            <h1>DELICIOUS MEALS</h1> 
            <p>Taste the passion in every dish & </p> 
            <p>savor the moment with every bite</p>
          </div>
            <img src={circle} alt="error"/>
          
        </div>
      </div>
    </Layout>
  );
};

export default Home;
