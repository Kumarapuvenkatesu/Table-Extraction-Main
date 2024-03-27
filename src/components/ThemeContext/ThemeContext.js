import React,{ createContext,useContext,useState } from "react";

export const ThemeContext = createContext({theme:false,toggleTheme:()=>{}}); 

export const useThemeContext = () => useContext(ThemeContext)

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [selectedFileEl, setSelectedFileEl] = useState([]);

  return (
    <DataContext.Provider value={{selectedFileEl, setSelectedFileEl}}>
      {children}
    </DataContext.Provider>
  );
};