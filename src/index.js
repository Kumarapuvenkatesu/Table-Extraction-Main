import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContext,DataContextProvider } from "../src/components/ThemeContext/ThemeContext";


const CustomeThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(false)
  const toggleTheme = () => {
    setTheme((pt) => !pt)
  }

  const themeMode = createTheme({
    palette: {
      mode: theme ? 'dark' : 'light',
      primary: {
        main: '#f20505',
        
      },
      secondary: {
        main: '#E5E5E5',
        contrastText: '#f20505',
      },

      // ,
      // text: {
      //   secondary: 'red'
      // },
      // components: {
      //   MuiList: {
      //     styleOverrides: {
      //       root: {
      //         padding: 0
      //       }
      //     }
      //   },
      //   MuiInputLabel: {
      //     styleOverrides: {
      //       root: {
      //         color: "inherit !important",
      //       },
      //     },
      //   },
      //   MuiInputBase: {
      //     styleOverrides: {
      //       root: {
      //         backgroundColor: !theme ? '#fff' : ''
      //       }
      //     }
      //   },

      // }

    },
    typography: {
      fontFamily: 'Titillium Web, Arial, sans-serif',
      // fontWeightRegular: 400,
      fontWeightBold: 700,
      fontSize: 18,
      
    },

  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }} >
      <ThemeProvider theme={themeMode}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DataContextProvider>
  <CustomeThemeProvider >
    <CssBaseline />
    <App />
  </CustomeThemeProvider>
  </DataContextProvider>
);