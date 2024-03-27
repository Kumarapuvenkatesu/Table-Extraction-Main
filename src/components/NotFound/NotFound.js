import React from "react";
import { Box, Stack,Typography } from "@mui/material";
import Header from "../Header/Header";

export default function NotFound(){
    return(
        <Box height={"100vh"}>
         <Header/> 
     {/* <SideHeader/> */}
     <Box component={"div"}  >
           <Stack className="fileupload-row text-center">
            <Typography variant="h3" >NotFound</Typography>
            <Typography paragraphed>There is no content</Typography>
            </Stack>
            </Box>
        </Box>
    )
}