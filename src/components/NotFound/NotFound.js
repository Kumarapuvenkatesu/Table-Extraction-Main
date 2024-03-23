import React from "react";
import { Box, Stack,Typography } from "@mui/material";
import SideHeader from "../Header/SideHeader";

export default function NotFound(){
    return(
        <Box display={"flex"} justifyContent={"center"} alignItems={"flex-end"}>
     <SideHeader/>
     <Box component={"main"}  >
           <Stack className="fileupload-row text-center">
            <Typography variant="h3" >NotFound</Typography>
            <Typography paragraphed>There is no content</Typography>
            </Stack>
            </Box>
        </Box>
    )
}