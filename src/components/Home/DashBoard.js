import React, { useContext,useEffect } from "react";
import { Box, Stack, Typography, TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from "@mui/material";
import SideHeader from "../Header/SideHeader";
import Assest from "../../assets/images/asset-dcouments.png";
import PdfToWordImage from "../../assets/images/pdf-to-word-imgs.png";
import ImageTable from "../../assets/images/image-to-table.png";
import Graph from "../../assets/images/graph-generator.png";
import EPUB from "../../assets/images/epub.png";
import Alt from "../../assets/images/alt-tag.png";
import HTML from "../../assets/images/html.png";
import WebPage from "../../assets/images/web-page.png";
import CSS from "../../assets/images/css.png";
import dash from "../../assets/04.png";
import { DataContext } from "../ThemeContext/ThemeContext";
import Cookies from "js-cookie";

export default function DashBoard() {
  const data1 = useContext(DataContext);
  const data = [
    { number: 90, title: 'My Asset Documents', icon: <img src={Assest} alt="assest" /> },
    { number: 60, title: 'Image to Table Extracted', icon: <img src={ImageTable} alt="Table" /> },
    { number: 30, title: 'PDF to Word Documents', icon: <img src={PdfToWordImage} alt="word" /> },
  ];
  const anotherTools = [
    {
      icon: <img src={Graph} alt="graph" />,
      Text: "Graph Generator"
    },
    {
      icon: <img src={EPUB} alt="epub" />,
      Text: "EPUB Generator"
    },
    {
      icon: <img src={Alt} alt="alt" />,
      Text: "Alt Tag Generator"
    },
    {
      icon: <img src={HTML} alt="html" />,
      Text: "HTML Generator"
    },
    {
      icon: <img src={WebPage} alt="webpage" />,
      Text: "Web Page Generator"
    },
    {
      icon: <img src={CSS} alt="generator" />,
      Text: "CSS Generator"
    }
  ]
  useEffect(() => {
    const jwtToken = Cookies.get("token");
    if (jwtToken === undefined) {
      window.location.href = "#/login"
    }
  }, [undefined])

  return (
    <Box     className="dashboard-view">
      <SideHeader />
      <Box width={"100%"} height={"100vh"}  sx={{ display: "flex", flexDirection: "column",marginRight:"32px" }}>
        <Stack component={"div"} mt="5rem">
          {/* <img src={dash} alt="dash"/> */}
          <Box display="flex" justifyContent="space-between" alignContent="center" >
            {data.map((item, index) => (
              <Stack
                key={index}
                // mt="5rem"
                top={20}
                direction="row"
                justifyContent={"center"}
                alignItems="center"
                sx={{  height: "145px", width: "350px" }}
              >
                <Stack sx={{ background: "#006aff", padding: "20px" }} m={1}  >
                  {item.icon}
                </Stack>
                <Stack direction="column" m={2}>
                  <Typography variant="h5" sx={{ fontSize: "2.5rem", fontWeight: "700" }}>{item.number}</Typography>
                  <Typography className="text-font">{item.title}</Typography>
                </Stack>
              </Stack>
            ))}
          </Box>
          <Stack component={"div"}>
          <Typography variant="h6" my={2} sx={{ color: "#999999" }}>Other Tools you May Like</Typography>
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"flex-end"} >
            {
              anotherTools.map((item, index) => (
                <Stack key={index} direction={"column"} justifyContent={"center"} alignItems={"center"} sx={{ cursor: "pointer" }}>
                  <Stack sx={{  padding: "16px", borderRadius: "14px", mb: "4px" }}>
                    {item.icon}
                  </Stack>
                  <Stack >
                    <Typography paragraph sx={{fontSize:"1.1rem"}} >{item.Text}</Typography>
                  </Stack>
                </Stack>
              ))
            }
          </Box>
        </Stack>
        </Stack>
        <Box>
            <Stack>
              <Typography variant="h5" style={{ borderBottom: "1px solid grey", padding: "10px" }} >Recent Files</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>File Name</TableCell>
                      <TableCell>File Type</TableCell>
                      <TableCell>Date and Time</TableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                    <TableRow>
                      <TableCell>{data1.selectedFileEl.name}</TableCell>
                      <TableCell>{data1.selectedFileEl.type}</TableCell>
                      <TableCell>{data1.selectedFileEl!==null && `${new Date().toDateString()}, ${new Date().toLocaleTimeString()}`}</TableCell>
                    </TableRow>
                  </TableBody> */}
                </Table>
              </TableContainer>
            </Stack>
          </Box>
      </Box>
    </Box>
  )
}