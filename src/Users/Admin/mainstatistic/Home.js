import { useState, useEffect } from 'react'; // Remove duplicate import of React
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { CircularProgressbar } from 'react-circular-progressbar';
import OrderCount from "../mainstatistic/OrderCount";
import SubItemCount from "../mainstatistic/SubItemCount";
import MenuItemCount from "../mainstatistic/MenuItems";
import TotalPrice from "../mainstatistic/TotalPrice";
import Chart from "../mainstatistic/Chart"
import CirclePer from "../mainstatistic/CirclePer"
import './file.css'
import { IoFastFood } from "react-icons/io5";

function Home() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  
     

  return (
    <main className={`main-container ${show ? 'fade-in' : ''}`}>
        <div className='main-title'>
            <h1>Review</h1>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>PRODUCTS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1><SubItemCount /></h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CATEGORIES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1><MenuItemCount/></h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>ORDER</h3>
                    <IoFastFood className='card_icon'/>
                </div>
                <h1 style={{}}><OrderCount /></h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Total Price</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1><TotalPrice /></h1>
            </div>
            
           
        </div>
        

        <div className='charts'>

          <Chart />
          
        </div>
            <div className='card' style={{marginTop:"600px", backgroundColor:"transparent"}}>
                <div className='card-inner' style={{marginLeft:"30%"}} >
                    <CirclePer />
                </div>
                    <h1 style={{marginLeft:"30%" , fontWeight:"800", color:"white", fontSize:"60px"}}>BestSeller</h1>
                <h1></h1>
            </div>
    </main>
  )
}

export default Home