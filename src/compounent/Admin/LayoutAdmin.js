import React from "react";

import HeaderAdmin from "./HeaderAdmin";

function LayoutAdmin({ children }) {
  return (
    <div>
      <HeaderAdmin/>
      {children}     
    </div>
  );
}

export default LayoutAdmin;
