import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Menu from "./pages/Menu/Menu";
import PageNotFound from "./pages/Menu/PageNotFound";
import Order from "./Users/Admin/Orders/Order";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuAdmin from "./Users/Admin/Menu/MenuAdmin";
import Accounts from "./Users/Admin/Accounts/Accounts";
import OrderDetails from './pages/Menu/OrderDetails';
import Tables from "./Users/Admin/Tables/Tables";
import Login from "./Users/Login/Login";

function App() {
  return (
    <div>
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />   
          <Route path="/About" element={<About />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Tables" element={<Tables/>}/>
          <Route path="/Admin" element={<Order/>}/>
          <Route path="/MenuAdmin" element={<MenuAdmin/>}/>
          <Route path="/Accounts" element={<Accounts/>}/>
          <Route path="/Orderr" element={<OrderDetails/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      
    </div>
  );
}

export default App;
