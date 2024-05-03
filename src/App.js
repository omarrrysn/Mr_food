import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import HomeAdmin from "./Admin/Home/HomeAdmin";
import Menu from "./pages/Menu/Menu";
import PageNotFound from "./pages/Menu/PageNotFound";
import Order from "./Admin/Orders/Order";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuAdmin from "./Admin/Menu/MenuAdmin";
import OrderDetails from "./pages/Menu/OrderDetails";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Admin" element={<HomeAdmin/>}/>
          <Route path="/Orders" element={<Order/>}/>
          <Route path="/MenuAdmin" element={<MenuAdmin/>}/>
          <Route path="/OrderDetails" element={<OrderDetails/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
