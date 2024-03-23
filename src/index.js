import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContext } from "../src/components/ThemeContext/ThemeContext";
//import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();


const CustomeThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(false)
  const toggleTheme = () => {
    setTheme((pt) => !pt)
  }
  const themeMode = createTheme({
    palette: {
      mode: theme ? 'dark' : 'light',
      primary: {
        main: '#ffffff',
        
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
  <CustomeThemeProvider >
    <CssBaseline />
    <App />
  </CustomeThemeProvider>
);