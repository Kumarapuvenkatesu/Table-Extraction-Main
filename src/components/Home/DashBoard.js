import React, { useContext } from "react";
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

  return (
    <Box display={"flex"} justifyContent={"flex-start"} alignItems={"flex-end"} gap={4}>
      <SideHeader />
      <Box width={"100%"} height={"93vh"} m="1rem" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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
                sx={{ background: "#ddecfd", height: "145px", width: "350px" }}
              >
                <Stack sx={{ background: "#fff", padding: "10px", borderRadius: "14px" }} m={1}  >
                  {item.icon}
                </Stack>
                <Stack direction="column" m={2}>
                  <Typography variant="h5" sx={{ fontSize: "2.5rem", fontWeight: "700" }}>{item.number}</Typography>
                  <Typography className="text-font">{item.title}</Typography>
                </Stack>
              </Stack>
            ))}
          </Box>
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
        </Stack>
        <Stack component={"div"}>
          <Typography variant="h6" my={2} sx={{ color: "#999999" }}>Other Tools you May Like</Typography>
          <Box display={"flex"} gap={20} alignItems={"flex-end"} >
            {
              anotherTools.map((item, index) => (
                <Stack key={index} direction={"column"} justifyContent={"center"} alignItems={"center"} sx={{ cursor: "pointer" }}>
                  <Stack sx={{ background: "#ddecfd", padding: "16px", borderRadius: "14px", mb: "4px" }}>
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
      </Box>
    </Box>
  )
}