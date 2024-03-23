
import React, { useState,useEffect } from "react";
import axios from "axios";
import * as FileSaver from 'file-saver';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Stack, Box, Button, Typography, TextField,IconButton,AppBar,Toolbar} from "@mui/material";
import { useThemeContext } from "../ThemeContext/ThemeContext";
import { Close } from "@mui/icons-material";
import SideHeader from "../Header/SideHeader";
import PDF from "../../assets/images/pdf.png";
import PDFConverting from "../../assets/images/pdf-word-convert.png"

export default function AllFiles() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviews, setFilePreviews] = useState([]);
  const data = useThemeContext()

 

  const onFileChange = (e) => {

    const files = e.target.files;
    console.log("files", files)
    // setSelectedFile(files[0]); 
    // toast.success("File uploaded",{
    //   autoClose: 1000
    // });
    // displayImagePreviews(files)
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (
          ( file.type === "application/pdf")
        ) {
          setSelectedFile(file); 
          toast.success("File uploaded",{
            autoClose: 1000
          });
          displayImagePreviews(file)
        } else {
            alert("Not Accepted This Type ");
        //   toast.warning(
        //     "Please Upload (PNG or ZIP or PPTX) files up to 1MB each",
        //   );
       
        }
      }
    }
    
  };

  const [open, setOpen] = React.useState(false);
    const [downloadStatus, setDownloadStatus] = useState(false);
    const [response, setResponse] = useState([]);
 
  const onSubmit = async (e) => {
    e.preventDefault();
 setOpen(true);
//  setDownloadStatus(!downloadStatus)
 

  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragFiles = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    console.log("drag files", files)
    // setSelectedFile(files);
    //       toast.success("File uploaded");
    //       displayImagePreviews(files)
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (
          (
            file.type === "application/pdf") 
         
          //   &&
          // (file.size <= 1024 * 1024)
        ) {
          setSelectedFile(file);
          toast.success("File uploaded");
          displayImagePreviews(file)
        } else {
          toast.warning(
            "Please drag PDF files up to 1MB each",
          );
        }
      }
    }
  };

  const handleFileUpload = () => {
    document.getElementById("fileInput").click();
  }

  const displayImagePreviews = (files) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setFilePreviews(event.target.result);
    };
    // reader.readAsDataURL(files[0]);
    if (files && files.length > 0) {
      const file = files[0];
      reader.readAsDataURL(file);
    }
  };

  const CloseButton=()=>{
    setSelectedFile(null)
  }

  const downloadData=async()=>{
    // const blob = await response.blob();
    // FileSaver.saveAs(blob, "my_download_file.txt");
    setDownloadStatus(!downloadStatus)
    setOpen(false)
    // toast.success("File downloaded and data extracted successfully", {
    //     autoClose: 1000
    // });
    setSelectedFile(null)

  }

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"flex-end"}>   
      <SideHeader/>     
      <ToastContainer  position="bottom-right"/>     
      <Box component="form" onSubmit={onSubmit} className={data.theme?"head":"body"}  >
        <Stack className="fileupload-row" >
             <Typography p={1} variant="h5" sx={{color:data.theme?"head":"#1b386e"}}>Convert PDF Files to Word Files</Typography>
        </Stack> 

            {/* <Stack className="dropzone1"
              onClick={handleFileUpload}
              onDrop={handleDragFiles}
              onDragOver={handleDragOver}
              justifyContent={"center"}
              >
              <TextField
                id="fileInput"
                type="file"
                onChange={onFileChange}
                accept="application/pdf"
                style={{ display: "none" }}
      
              />
              <Stack display={"flex"} alignItems={"center"}>
                <img src={PDF} alt="logo"  />
                <Typography variant="body1" mt={3}>
                  Please drag and drop PDF File here to convert Word File
                </Typography>
             
            </Stack>
        </Stack>
        <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
          <Typography variant="h6">OR</Typography> 
          <Typography paragraph>Please upload the PDF file which you want to convert Word File</Typography>
        {
selectedFile ?
(
  <Stack spacing={2} sx={{ display: "flex", alignItems: "center",justifyContent:"center"}} >
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-around"} className="name-background">
  <Typography paragraph mb={0} mr={2}>{selectedFile?.name}</Typography>
  <IconButton onClick={CloseButton}>
              <Close />
            </IconButton>
  </Stack>
  <Button type="submit" variant="contained"  sx={{ width: "300px" }}  className="download-button"    >{ "Convert to Word" }</Button></Stack>
):<Button variant="contained" sx={{ width: "300px"  }}  className="download-button" htmlFor="fileInput" onClick={handleFileUpload}>Upload</Button>
        }
     
      </Stack> */}

{downloadStatus ? (
                    <Stack direction="column" justifyContent="center" alignItems="center" mt={20}>
                        <Typography variant="h6" sx={{ color: "#68e043" }}>PDF to Word Converted successfully</Typography>
                        <Typography paragraph>Please download the Word File</Typography>
                        <Button variant="contained" sx={{ width: "300px" }} className="download-button" onClick={downloadData}>Download</Button>
                    </Stack>
                ) : (
                    <>
                        {!open ? (
                            <Stack>
                                <Stack
                                    className="dropzone1"
                                    onClick={handleFileUpload}
                                    onDrop={handleDragFiles}
                                    onDragOver={handleDragOver}
                                    justifyContent={"center"}
                                >
                                    <TextField
                                        id="fileInput"
                                        type="file"
                                        onChange={onFileChange}
                                        accept="image/*,.zip, .pptx"
                                        style={{ display: "none" }}
                                        multiple
                                    />
                                    <Stack display="flex" alignItems="center">
                                        <img src={PDF} alt="logo"  />
                                        <Typography variant="body1" className="sub-title" mt={3}>
                                        Please drag and drop PDF File here to convert Word File
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="center">
                                    <Typography variant="h6">OR</Typography>
                                    <Typography paragraph>Please upload the images or PPT files which have tables</Typography>
                                    {selectedFile ? (
                                        <Stack spacing={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Stack direction="row" alignItems="center" justifyContent="space-around" className="name-background">
                                                <Typography paragraph mb={0} mr={2}>{selectedFile?.name}</Typography>
                                                <IconButton onClick={CloseButton}>
                                                    <Close />
                                                </IconButton>
                                            </Stack>
                                            <Button type="submit" variant="contained"  sx={{ width: "300px" }}  className="download-button"    >{ "Convert to Word" }</Button>
                                        </Stack>
                                    ) : (
                                        <Button variant="contained" sx={{ width: "300px" }} className="download-button" htmlFor="fileInput" onClick={handleFileUpload}>Upload</Button>
                                    )}
                                </Stack>
                            </Stack>
                        ) : (
                          <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                          <img src={PDFConverting} style={{"margin":"7rem"}}/>
                        <Typography paragraph> Converting in Progress</Typography>
                      </Stack>
                        )}
                    </>
                )}
      </Box>
    </Box>
    
  );
}






























