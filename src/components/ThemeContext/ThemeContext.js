import React,{ createContext,useContext } from "react";

export const ThemeContext = createContext({theme:false,toggleTheme:()=>{}}); 

export const useThemeContext = () => useContext(ThemeContext)