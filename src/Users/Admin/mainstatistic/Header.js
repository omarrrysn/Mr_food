import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './file.css'


function Header({OpenSidebar}) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/AllSubItems');
};

  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
    
        </div>
        <div className='header-right'>
          
        </div>
    </header>
  )
}

export default Header
