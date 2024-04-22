import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export default function TextHeader() {
  const [text, setText] = useState('');
  const { pathname } = useLocation();
  // console.log("venky",pathname);
  useEffect(() => {
    switch (pathname) {
      case '/':
        setText("Dashboard");
        break;
      case '/table-extraction':
        setText("Table Extracter");
        break;
      case '/math-convertor':
        setText("Math Convertor");
        break;
      case '/pdf-to-word':
        setText("PDF to Word");
        break;
      case '/received-files':
        setText("Received Files");
        break;
      default:
        setText("Extractor");
    }
  }, [pathname]);
  const isScreenLarge = useMediaQuery('(min-width:1024px)') ;
 
  return (
    <AppBar
      className="heal header-text"
      position="fixed"
      // sx={{
      //   width: `calc(100% - ${240}px)`,
      //   ml: `${240}px`,
      //   // width:{isScreenLarge},
      //   // ml:{isScreenLarge}
      // }}
    >
      <Toolbar>
        <Typography variant="h5" noWrap className="heading-tag" sx={{ marginLeft: "20px", fontWeight: "550", }}>
          {text}{isScreenLarge ?null :<MenuIcon/>}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}