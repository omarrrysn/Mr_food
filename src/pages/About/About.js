import React from "react";
import Layout from "../../compounent/layout/layout";
import images from "../../constants/images";
import "../About/about.css";

const About = () => {
  return (
    <div>

    <Layout>
      <br></br>
      <div className="ContainerAbout">
        <div
          className="divAbout"
          style={{ backgroundImage: `url(${images.AboutImage})` }}
        >
          {" "}
        </div>
        <div className="contentAbout">
          <h1>About Us</h1>
          <div className="divSpan">
            <span>________</span>
          </div>
          <div>
            <p className="pOne">
              Mr.Food.. <br></br> ,,,
            </p>
          </div>
          <div className="ptwo">
            <p>
              We blend passion, flavor, and community to create unforgettable
              <br></br>
              dining experiences. Our menu features a diverse range of dishes{" "}
              <br></br>
              inspired by both local ingredients and global culinary <br></br>
              traditions.
            </p>
          </div>
        </div>
      </div>
    </Layout>
    </div>

  );
};

export default About;
