import React from "react";
import { Box, Typography, AppBar, Toolbar } from "@mui/material";
import SideHeader from "../Header/SideHeader";

export default function ReceivedFiles() {
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"flex-end"}>
            <SideHeader />
            <Box className="fileupload-row">
                <Typography variant="h4" style={{ color: "#1b386e" }}>Received Files</Typography>
            </Box>
        </Box>
    )
}