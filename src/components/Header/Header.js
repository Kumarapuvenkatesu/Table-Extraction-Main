
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { AppBar, Toolbar, IconButton, Button, Typography, Menu, MenuItem,  Stack } from '@mui/material';
import { DarkMode, Email, LightMode, Phone } from '@mui/icons-material';
import { useThemeContext } from "../ThemeContext/ThemeContext";
import LogoutIcon from '@mui/icons-material/Logout';
import IMG from "../../assets/straive-logo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';




const Header = () => {


  const data = useThemeContext()
  const jwtToken = Cookies.get("token");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl !== null;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null)
  }

  const removeToken = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  }


 


  const role = (JSON.parse(localStorage.getItem("LoginDetails"))?.name);


  return (
    <AppBar  className='main-header1' position="stastic"  >
      <Toolbar direction={"column"}>
        <Stack direction={"row"} sx={{ flexGrow: 1 }}>

          <img src={IMG} alt="logo" style={{ height: "30px", marginTop: "1rem" }} />
      
          <Typography sx={{ color: "#fff" }} mt={1} variant='h4' >
            | Extract Tables
          </Typography>
        </Stack>
        {
          jwtToken === undefined ?

            <Stack direction="row" spacing={4} mr={5} >
              <Stack>
                <Button onClick={data.toggleTheme}>
                  {
                    data.theme ? <DarkMode color='warning' /> : <LightMode color='warning' />
                  }
                </Button>
              </Stack>
              <Stack component="a" spacing={1} href="mailto:contact@straive.com" direction={"row"} justifyContent={"center"} alignItems={"center"} >
                <Email color="warning" /><Typography color={"#fff"}>contact@straive.com</Typography>
              </Stack>
              <Stack component="a" spacing={1} href="tel:+1522999888" direction={"row"} justifyContent={"center"} alignItems={"center"} >
                <Phone color="warning" /><Typography color={"#fff"}>+1 522 999 888</Typography>
              </Stack>


            </Stack>
            :
            <Stack >
              <IconButton size="large" onClick={handleMenu} style={{ color: "#fff" }}  disableRipple>

                <Typography style={{ color: "#fff" }}>Welcome,{role}</Typography>
                < AccountCircleIcon sx={{ fontSize: "32px" }} />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose} >
                <MenuItem color='primary' onClick={data.toggleTheme}>
                  Theme
                  <Button >
                    {
                      data.theme ?
                       <LightMode color="success" /> : <DarkMode color='info' />
                    }

                  </Button>
                </MenuItem>
                <MenuItem onClick={removeToken}>
                  <LogoutIcon /> <Button >Sign Out</Button>
                </MenuItem>
                

              </Menu>
            </Stack>
        }

      </Toolbar>
    </AppBar>
  );
};

export default Header;



