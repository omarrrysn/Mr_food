import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {} from "@mui/icons-material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Link, useLocation } from "react-router-dom";
import images from "../../constants/images";
import "../../styles/Header.css";

const HeaderMenu = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location=useLocation();
  const {tableId} = location.state || {};
  const tbl=tableId || 0;
  const [id,setId]=useState(0);
 
  const HanlerDrawerTogglle = () => {
    setMobileOpen(!mobileOpen);
  };
  // Menu Drawer
  const drawer = (
    <Box onClick={HanlerDrawerTogglle} sx={{ textAlign: "center"}}>
      <Typography
        color={"goldenrod"}
        variant={"h6"}
        component={"div"}
        sx={{ flexGrow: 1.5 }}
      >
        <FastfoodIcon />
        My Restaurent
      </Typography>
      <Divider />

      <ul className="mobile-navigation">
        <li>
          <Link to={"/Home"}>Home</Link>
        </li>
        <li>
          <Link to={"/About"}>About</Link>
        </li>
        <li>
          <Link to={"/Menu"}>Menu</Link>
        </li>
        <li>
                  <Link to={"/Login"}>logout</Link>
                </li>
      </ul>
    </Box>
  );
 useEffect(() => {
  setId(tbl);

}
 
 
 )
  return (
    <>
      <Box>
        <AppBar
          component={"nav"}
          sx={{ bgcolor:'black' }}
        >
          <Toolbar>
            <img src={images.Logo}  loading="lazy" alt="loding" style={{ width: 70, height: 70 }} />
            <Typography
              color={"goldenrod"}
              variant={"h6"}
              component={"div"}
              sx={{ flexGrow: 0.8 }}
            >
              <a className="title"> Mr.Food</a>
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: -5, display: { sm: "none" } }}
              onClick={HanlerDrawerTogglle}
            >
              {/* <MenuIcon /> */}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box component="nav" >
   
        </Box>
        <Box>
          <Toolbar />
        </Box>
      </Box>
    </>
  );
};

export default HeaderMenu;
