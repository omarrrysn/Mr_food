import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Menu from "./pages/Menu/Menu";
import PageNotFound from "./pages/Menu/PageNotFound";
import Order from "./Users/Admin/Orders/Order";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuAdmin from "./Users/Admin/Menu/MenuAdmin";
import Accounts from "./Users/Admin/Accounts/Accounts";
import Tables from "./Users/Admin/Tables/Tables";
import Login from "./Users/Login/Login";
import LoginUsers from "./Users/LoginUsers/Login";
import Chef from './Users/Chef/Chef'
import Cashier from "./Users/Cashier/Cashier";
import Manger from "./Users/Manger/Manger";
import CashierHistory from "./Users/Cashier/CashierHistory";
import ChefHistory from "./Users/Chef/ChefHistory";
import MangerHistory from "./Users/Manger/MangerHistory";
import MenuDis from "./pages/DisconnectedMenu/Menu";
function App() {
  return ( 
  
        
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home />} />   
          <Route path="/About" element={<About />} />
          <Route path='/Menu' element={<Menu />} />
          <Route path="/Tables" element={<Tables/>}/>
          <Route path="/Admin" element={<Order/>}/>
          <Route path="/MenuAdmin" element={<MenuAdmin/>}/>
          <Route path="/Accounts" element={<Accounts/>}/>
          <Route path="/CashierHistory" element={<CashierHistory/>}/>
          <Route path="/LoginUsers" element={<LoginUsers/>}/>
        <Route path="/Cashier" element={<Cashier/>}/>
        <Route path="/Chef" element={<Chef/>}/>
        <Route path="/ChefHistory" element={<ChefHistory/>}/>
        <Route path="/Manger" element={<Manger/>}/>
        <Route path="/MangerHistory" element={<MangerHistory/>}/>
        <Route path="/" element={<MenuDis/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      
  
  );
}

export default App;
