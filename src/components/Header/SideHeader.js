import React, { useState, useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { Typography, Stack, Toolbar, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { NavLink } from 'react-router-dom';
import ThemeMode from './ThemeMode';
import TextHeader from './TextHeader';
import Logo from "../../assets/images/logo.png";
import Dashboard from "../../assets/images/dashboard.png";
import TableExtractor from "../../assets/images/table-extractor.png";
import MathConvertor from "../../assets/images/math-converter.png";
import PdfToWord from "../../assets/images/pdf-to-word.png";
import ReceivedFile from "../../assets/images/received-files.png";
import { useThemeContext } from "../ThemeContext/ThemeContext";


const drawerWidth = 240;

export default function SideHeader() {
  const [open, setOpen] = useState(true);
  const [tools, setTools] = useState(true);
  const [assets, setAssets] = useState(true);
  const [activeItem, setActiveItem] = useState("");
  const data = useThemeContext()

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAutomatic = () => {
    setTools(!tools);
  }

  const handleAssets = () => {
    setAssets(!assets);
  }

  return (
    <>
      <TextHeader />
      <Drawer
        className={data.theme ? "side-text-color" : "normal-text-color"}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#eaf2fc',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ cursor: "Pointer" }}>
          <img src={Logo} alt="Tech Tools" />
        </Toolbar>
        <Stack sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%"
        }}>
          <List >
            <List component="li" disablePadding sx={{ my: "12px" }}>
              <ListItemButton component={NavLink} to="/"  >
                {/* <ListItemIcon> */}
                <img src={Dashboard} alt='Dashboard' />
                <ListItemText primary="Dashboard" />
                {/* </ListItemIcon> */}
              </ListItemButton>
            </List>
            <List component="li" disablePadding sx={{ my: "15px" }}>
              <ListItemButton onClick={handleClick} >
                <Typography paragraph mb={0}>AI Tools</Typography>
                {open ? <ExpandMore /> : <ExpandLess />}
              </ListItemButton>
              <Collapse in={open} >
                <List component="li" disablePadding>
                  <ListItemButton component={NavLink} to="/table-extraction"  >
                    <img src={TableExtractor} alt="Table Extraction" />
                    <ListItemText primary="Table Extracter" />
                  </ListItemButton>
                  <ListItemButton component={NavLink} to="/math-convertor" >
                    <img src={MathConvertor} alt="Math Convertor" />
                    <ListItemText primary="Math Convertor" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
            <List component="li" disablePadding sx={{ my: "15px" }}>
              <ListItemButton onClick={handleAutomatic}>
                <Typography paragraph mb={0}>Automatic Tools</Typography>
                {tools ? <ExpandMore /> : <ExpandLess />}
              </ListItemButton>
              <Collapse in={tools} >
                <List component="li" disablePadding>
                  <ListItemButton component={NavLink} to="/pdf-to-word"  >
                    <img src={PdfToWord} alt='pdf-to-word' />
                    <ListItemText primary="PDF to Word" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
            <List component="li" disablePadding sx={{ my: "15px" }}>
              <ListItemButton onClick={handleAssets}>
                <Typography paragraph mb={0}>Assets</Typography>
                {assets ? <ExpandMore /> : <ExpandLess />}
              </ListItemButton>
              <Collapse in={assets} >
                <List component="li" disablePadding>
                  <ListItemButton component={NavLink} to="/received-files" >
                    <img src={ReceivedFile} alt='ReceivedFiles' />
                    <ListItemText primary="Received Files" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </List>
          <ThemeMode />
        </Stack>
      </Drawer>
    </>
  )
}