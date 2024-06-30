import React from 'react'
import { IoIosRestaurant  } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdLocalDining } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import { MdFastfood } from "react-icons/md";
import './file.css'


import { useNavigate } from 'react-router-dom';

function Sidebar({openSidebarToggle, OpenSidebar}) {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
      navigate(path);
    }

    // const navigate = useNavigate()
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <MdFastfood   className='icon_header'/> MrFood
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}></span>
        </div>

        <ul className='sidebar-list'>
        <li className='sidebar-list-item' onClick={() => handleNavigation('/MenuAdmin')}>
            <a  >
                    <MdOutlineMenuBook className='icon'/> Menu
                </a>
            </li>
            <li className='sidebar-list-item' onClick={() => handleNavigation('/Accounts')}>
            <a  >
                    <MdOutlineAccountCircle className='icon'/> Account 
                </a>
            </li>
            <li className='sidebar-list-item' onClick={() => handleNavigation('/Tables')}>
            <a  >
                    <MdLocalDining className='icon'/> Table
                </a>
            </li>
            <li className='sidebar-list-item' onClick={() => handleNavigation('/AllSubItems')}>
                <a  >
                    <IoIosRestaurant className='icon'/> All Items
                </a>
            </li>
            <li className='sidebar-list-item' onClick={() => handleNavigation('/OrderedSubItems')}>
            <a  >

                    <IoIosRestaurant className='icon'/> Required items
                </a>
            </li>
            <li className='sidebar-list-item'>
            <a  onClick={() => handleNavigation('/NotOrderedSubItems')}>

                    <IoIosRestaurant className='icon'/> Unwanted Items
                </a>
            </li>
            <li className='sidebar-list-item'>
            <a  onClick={() => handleNavigation('/LoginUsers')}>

                    <IoIosRestaurant className='icon'/>Logout
                </a>
            </li>



        </ul>
    </aside>
  )
}

export default Sidebar