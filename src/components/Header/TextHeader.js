import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';

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

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${240}px)`, ml: `${240}px`,
      }}
    >
      <Toolbar>
        <Typography variant="h4" noWrap className="heading-tag" sx={{ marginLeft: "20px",fontWeight:"550" }}>
          {text}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}