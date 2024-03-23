import React,{useState} from 'react';
import { Box,Stack,Typography,IconButton,Button,Menu,MenuItem, List } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { DarkMode, LightMode} from '@mui/icons-material';
import { useThemeContext } from "../ThemeContext/ThemeContext";
import LogoutIcon from '@mui/icons-material/Logout';
import Person from "../../assets/images/my-profile.png";

export default function  ThemeMode(){
    const data = useThemeContext();
    const [anchorEl, setAnchorEl] = useState(null);

    const open = anchorEl !== null;

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null)
    }

    

    return(
        <Box sx={{  pb: 3 }}>
        <Stack direction={"row"} gap={2} justifyContent={"space-between"} alignItems={"center"} >
          
          <IconButton size="large"    disableRipple>
              {/* < PersonIcon sx={{ fontSize: "32px" }} /> */}
              <img src={Person} alt='person'/>
              <Typography pt={1}> My Profile</Typography>
          </IconButton>
          <IconButton size="large" onClick={handleMenu} disableRipple>
          <MoreHorizIcon/>
           
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
                {/* <MenuItem >
                  <LogoutIcon /> <Button color='info'>Sign Out</Button>
                </MenuItem> */}
                

              </Menu>
              
              
        </Stack>
       
      </Box>
    )
}