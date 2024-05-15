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
import images from "../constants/images";
import "../styles/Header.css";

const Header = () => {
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
                  <Link to={"/"}>logout</Link>
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

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
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
                  <Link  to={"/"}>Logout</Link>
                </li>
              </ul>
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: -5, display: { sm: "none" } }}
              onClick={HanlerDrawerTogglle}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box component="nav" >
          <Drawer
            className="mfokho"
            variant="temporary"
            open={mobileOpen}
            onClose={HanlerDrawerTogglle}
            anchor="right" // Position the drawer at the right
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px", // Set the width of the drawer
                backgroundColor: "#1A1A19", // Set the background color to black
              },
            }}
          >
           

            {drawer}
           
          </Drawer>
        </Box>
        <Box>
          <Toolbar />
        </Box>
      </Box>
    </>
  );
};

export default Header;
