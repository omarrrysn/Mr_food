import React, { useEffect, useState } from 'react';
import './file.css'
import Header from '../mainstatistic/Header'; // Ensure the correct path to Header component
import Sidebar from '../mainstatistic/sidebar'; // Ensure the correct path to Sidebar component
import Home from '../mainstatistic/Home'; // Ensure the correct path to Home component
import PageNotFound from '../../../pages/Menu/PageNotFound';
function Main() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const getId = localStorage.getItem('id');
    const [id,setId]=useState(getId || 0);
    const [check,setCheck]=useState(false);
    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle);
    };

    const Open=()=>{
      if(id == 0){
setCheck(false);
      }
      else{
        setCheck(true);
      }
    }
    useEffect(()=>{
      Open();
    },[check])
  
    return (
      <div className='grid-container'>
        {check ? (
          <>
          <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Home />
          </>
        ): (
          <PageNotFound/>
        )}
        
      </div>
    );
  }
  
  export default Main;
