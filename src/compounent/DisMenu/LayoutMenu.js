import React from "react";
import HeaderMenu from "./HeaderMenu";
import Footer from "../Footer";

function LayoutMenu({ children }) {
  return (
    <div>
      <HeaderMenu />
      {children}
      <Footer />
    </div>
  );
}

export default LayoutMenu;
