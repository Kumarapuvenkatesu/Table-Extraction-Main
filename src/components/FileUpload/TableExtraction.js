
// import React, { useState,useEffect } from "react";
// import axios from "axios";
// import * as FileSaver from 'file-saver';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import fileimage from "../../assets/file-type.png";
// import Header from "../Header/Header";
// import Cookies from "js-cookie";
// import { Stack, Box, Button, Typography, TextField,IconButton,AppBar,Toolbar} from "@mui/material";
// import { useThemeContext } from "../ThemeContext/ThemeContext";
// import { Close } from "@mui/icons-material";
// import SideHeader from "../Header/SideHeader";
// import TableExtract from "../../assets/images/img-fromate.png"





// export default function TableExtraction() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [filePreviews, setFilePreviews] = useState([]);


//   const data = useThemeContext()

//   // useEffect(() => {
//   //   const jwtToken = Cookies.get("token");
//   //   if (jwtToken === undefined) {
//   //     window.location.href = "/login"
//   //   }
//   // }, [undefined])

//   const onFileChange = (e) => {

//     const files = e.target.files;
//     console.log("files", files)
//     if (files) {
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         if (
//           (file.type === "application/x-zip-compressed" ||
//             file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
//             /image\/(jpeg|png)/.test(file.type))
//             // file.type === "image/jpeg" || file.type === "image/png")
//             &&
//           (file.size <= 1024 * 1024)
//         ) {
//           setSelectedFile(file); 
//           toast.success("File uploaded",{
//             autoClose: 1000
//           });
//           displayImagePreviews(file)
//         } else {
//             alert("Not Accepted this Type ");
//         //   toast.warning(
//         //     "Please Upload (PNG or ZIP or PPTX) files up to 1MB each",
//         //   );
       
//         }
//       }
//     }

//   };
//   const [open, setOpen] = React.useState(false);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setOpen(true)

//     if (selectedFile) {
//       switch (selectedFile.type) {
//         case "image/png"||"image/jpg":
//           try {
//             const formData = new FormData();
//             formData.append("image", selectedFile);

//             const response = await fetch("http://172.17.151.141:3002/tableExtraction", {
//               method: "POST",
//               body: formData,
//             });

//           //  console.log("1212", response)

//             if (!response.ok) {
//               throw new Error("Server error");
//             }

//             const blob = await response.blob();
//             FileSaver.saveAs(blob, "my_download_file.csv");
//             setOpen(false)
//             toast.success("Files uploaded and data extracted successfully");
//             setSelectedFile(null)
//           } catch (error) {
//             toast.error("An error occurred. Please try again.");
//             setOpen(false)
//           }
//           break;

//         case "application/x-zip-compressed":
//           try {
//             const formData = new FormData();
//             formData.append("image", selectedFile);

//             const response = await axios.post("http://172.17.151.141:3002/allImgTabExt", formData, {
//               responseType: 'blob'
//             });

//             const blob = new Blob([response.data], { type: 'application/zip' });
//             const url = window.URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', 'my_download_file.zip');

//             link.click();
//             toast.success("Files uploaded and data extracted successfully");
//             setSelectedFile(null)

//           } catch (error) {
//             toast.error("Error during download:", error);
//             setOpen(false)
           
//           }
//           break;

//         case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
//           try {
//             const formData = new FormData();
//             formData.append("image", selectedFile);

//             const response = await axios.post("http://172.17.151.141:3002/pptFileExtraction", formData, {
//               responseType: 'blob'
//             });

//             const blob = new Blob([response.data], { type: 'application/zip' });
//             const url = window.URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', 'my_powerpoint_file.zip');

//             link.click();
//             toast.success("Files uploaded and data extracted successfully");
//             setSelectedFile(null)
//           } catch (error) {
//             toast.error("Error during download:", error);
//             setOpen(false)
//           }
//           break;

//         default:
//           toast.error("Not Accepted this type of files");
//           setOpen(false)
//       }
//     }
//     setDownloadStatus(null)

//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDragFiles = (event) => {
//     event.preventDefault();
//     const files = event.dataTransfer.files;
//     console.log("drag files", files)
//     if (files) {
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         if (
//           (file.type === "application/x-zip-compressed" ||
//             file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
//             // file.type === "image/png"||"image/jpg") 
//             /image\/(jpeg|png)/.test(file.type))
//             &&
//           (file.size <= 1024 * 1024)
//         ) {
//           setSelectedFile(file);
//           toast.success("File uploaded");
//           displayImagePreviews(file)
//         } else {
//           toast.warning(
//             "Please drop (PNG or ZIP or PPTX) files up to 1MB each",
//           );
//         }
//       }
//     }
//   };

//   const handleFileUpload = () => {
//     document.getElementById("fileInput").click();
//   }


//   const displayImagePreviews = (file) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setFilePreviews(event.target.result);
//     };
//     reader.readAsDataURL(file);
//   };


//   const [downloadStatus, setDownloadStatus] = useState(null);

//   const handleDownloadClick = () => {
//     setDownloadStatus('downloading...');}
  

//     const CloseButton=()=>{
//       setSelectedFile(null)
//     }

//   return (
//     <Box display={"flex"} justifyContent={"center"} alignItems={"flex-end"}>
//       <SideHeader/>    
//       <ToastContainer  position="bottom-right"/>
//       <Box component="form" onSubmit={onSubmit} className={data.theme?"head":"body"}  >
//         <Stack className="fileupload-row" >
//              <Typography p={1} variant="h3" sx={{color:data.theme?"head":"#1b386e"}}>Extract Tabular Data from images</Typography>
//             <Stack className="dropzone1"
//               onClick={handleFileUpload}
//               onDrop={handleDragFiles}
//               onDragOver={handleDragOver}
//               justifyContent={"center"}
//              >
//               <TextField
//                 id="fileInput"
//                 type="file"
//                 onChange={onFileChange}
//                 accept="image/*,.zip, .pptx"
//                 style={{ display: "none" }}
//                 multiple
//               />
//               <Stack display={"flex"} alignItems={"center"} justifyContent={"center"} >
//                 {/* <Typography variant="h5">Drop images that have tables, or select ZIP/PPTX files.</Typography> */}
//                 <img src={TableExtract} alt="logo" width={"400px"} />
//                 <Typography variant="body1" className="sub-title">
//                   Select multiple  PNG, ZIP, or PPTX files, up to 1 MB each
//                 </Typography>
//               </Stack>
             
//             </Stack>
//         </Stack>
//         <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
//           <Typography variant="h6">OR</Typography> 
//           <Typography paragraph>Please upload the images or PPT files which has tables</Typography>
//         {
// selectedFile ?
// (
//   <Stack spacing={2} sx={{ display: "flex", alignItems: "center",justifyContent:"center" }}>
//     <Stack direction={"row"} alignItems={"center"} justifyContent={"space-around"} className="name-background">
//   <Typography paragraph mb={0} mr={2}>{selectedFile?.name}</Typography>
//   <IconButton onClick={CloseButton}>
//               <Close />
//             </IconButton>
//   </Stack>
//   <Button type="submit" variant="contained"  sx={{ width: "300px" }}  className="download-button"    onClick={handleDownloadClick}>{selectedFile.type === "image/png" ? downloadStatus?"downloading...":"Convert to CSV" : downloadStatus?"downloading...":"Download To Zip"}</Button>
//   </Stack>
// ):<Button variant="contained" sx={{ width: "300px"  }}  className="download-button" htmlFor="fileInput" onClick={handleFileUpload}>Upload</Button>
//         }
//       </Stack>
//       </Box>
//     </Box>
//   );
// }



import React, { useState, useEffect } from "react";
import axios from "axios";
import * as FileSaver from 'file-saver';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fileimage from "../../assets/file-type.png";
import Header from "../Header/Header";
import Cookies from "js-cookie";
import { Stack, Box, Button, Typography, TextField, IconButton, AppBar, Toolbar } from "@mui/material";
import { useThemeContext } from "../ThemeContext/ThemeContext";
import { Close } from "@mui/icons-material";
import SideHeader from "../Header/SideHeader";
import IMG1 from "../../assets/Category_3.png"
import TableExtract from "../../assets/images/img-fromate.png";
import TableConverting from "../../assets/images/img-table-convert.png"

export default function MathCovertor() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreviews, setFilePreviews] = useState([]);
    const data = useThemeContext()
    // useEffect(() => {
    //   const jwtToken = Cookies.get("token");
    //   if (jwtToken === undefined) {
    //     window.location.href = "/login"
    //   }
    // }, [undefined])

    const onFileChange = (e) => {
        const files = e.target.files;
        console.log("files", files)
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (
                    (file.type === "application/x-zip-compressed" ||
                        file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
                        /image\/(jpeg|png|jpg|jpg)/.test(file.type))
                    // file.type === "image/jpeg" || file.type === "image/png")
                    &&
                    (file.size <= 1024 * 1024)
                ) {
                    setSelectedFile(file);
                    toast.success("File uploaded", {
                        autoClose: 1000
                    });
                    displayImagePreviews(file)
                } else {
                    alert("Not Accepted this Type ");
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
        setOpen(true)
        if (selectedFile) {
            switch (selectedFile.type) {
                // case "image/jpg" || "image/png" || "image/jpeg":
                case "image/jpg":
                case "image/png":
                case "image/jpeg":
                    try {
                        const formData = new FormData();
                        formData.append("image", selectedFile);
                        const response = await fetch("http://172.17.151.141:3002/tableExtraction", {
                            method: "POST",
                            body: formData,
                        });
                        // console.log("response", response)
                        setResponse(response)
                        if (response.status === 200) {
                            setDownloadStatus(!downloadStatus)
                        }
                        if (!response.ok) {
                            throw new Error("Server error");
                        }
                        //     const blob = await response.blob();
                        //    FileSaver.saveAs(blob, "my_download_file.txt");
                        //     setOpen(false)
                        //     toast.success("Files uploaded and data extracted successfully");
                        //     setSelectedFile(null)
                    } catch (error) {
                        toast.error("An error occurred. Please try again.");
                        setOpen(false)
                    }
                    break;
                case "application/x-zip-compressed":
                    try {
                        const formData = new FormData();
                        formData.append("image", selectedFile);
                        const response = await axios.post("http://172.17.151.141:3002/allImgTabExt", formData
                            , {
                                responseType: 'blob'
                            });
                        // console.log("resp", response.data.type)
                        setResponse(response)
                        if (response.status === 200) {
                            setDownloadStatus(!downloadStatus)
                        }
                        // const blob = new Blob([response.data], { type: 'application/zip' });
                        // const url = window.URL.createObjectURL(blob);
                        // const link = document.createElement('a');
                        // link.href = url;
                        // link.setAttribute('download', 'my_download_file.zip');
                        // link.click();
                        // setOpen(false)
                        // toast.success("Files uploaded and data extracted successfully");
                        // setSelectedFile(null)
                    } catch (error) {
                        toast.error("Error during download:", error);
                        setOpen(false)
                    }
                    break;
                case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                    try {
                        const formData = new FormData();
                        formData.append("image", selectedFile);
                        const response = await axios.post("http://172.17.151.141:3002/pptFileExtraction", formData, {
                            responseType: 'blob'
                        });
                        console.log("resp", response.data.type)
                        setResponse(response)
                        if (response.status === 200) {
                            setDownloadStatus(!downloadStatus)
                        }
                        // const blob = new Blob([response.data], { type: 'application/zip' });
                        // const url = window.URL.createObjectURL(blob);
                        // const link = document.createElement('a');
                        // link.href = url;
                        // link.setAttribute('download', 'my_powerpoint_file.zip');
                        // link.click();
                        // toast.success("Files uploaded and data extracted successfully");
                        // setSelectedFile(null)
                    } catch (error) {
                        toast.error("Error during download:", error);
                        setOpen(false)
                    }
                    break;
                default:
                    toast.error("Not Accepted this type of files");
                    setOpen(false)
                // setDownloadStatus(true)
            }
        }
        // setDownloadStatus(null)
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragFiles = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        console.log("drag files", files)
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (
                    (file.type === "application/x-zip-compressed" ||
                        file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
                        // file.type === "image/png"||"image/jpg") 
                        /image\/(jpeg|png|jpg|jpg)/.test(file.type))
                    &&
                    (file.size <= 1024 * 1024)
                ) {
                    setSelectedFile(file);
                    toast.success("File uploaded");
                    displayImagePreviews(file)
                } else {
                    toast.warning(
                        "Please drop (PNG or ZIP or PPTX) files up to 1MB each",
                    );
                }
            }
        }
    };

    const handleFileUpload = () => {
        document.getElementById("fileInput").click();
    }

    const displayImagePreviews = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            setFilePreviews(event.target.result);
        };
        reader.readAsDataURL(file);
    };

    const CloseButton = () => {
        setSelectedFile(null)
    }

    const downloadData = async () => {
        if (response.type === "cors") {
            const blob = await response.blob();
            FileSaver.saveAs(blob, "my_download_file.txt");
            setDownloadStatus(!downloadStatus)
            setOpen(false)
            toast.success("File downloaded and data extracted successfully");
            setSelectedFile(null)
        } else if (response.data.type === "application/zip") {
            const blob = new Blob([response.data], { type: 'application/zip' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'my_download_file.zip');
            link.click();
            setDownloadStatus(!downloadStatus)
            setOpen(false)
            toast.success("Files uploaded and data extracted successfully");
            setSelectedFile(null)
        }
        // else if(response.data.type==="application/json"){
        //       const blob = new Blob([response.data], { type: 'application/zip' });
        //                 const url = window.URL.createObjectURL(blob);
        //                 const link = document.createElement('a');
        //                 link.href = url;
        //                 link.setAttribute('download', 'my_powerpoint_file.zip');
        //                 link.click();
        //                 toast.success("Files uploaded and data extracted successfully");
        //                 setSelectedFile(null)
        // }
    }

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"flex-end"}>
            <SideHeader />
            <ToastContainer position="bottom-right" />
            <Box component="form" onSubmit={onSubmit} className={data.theme ? "head" : "body"}  >
                <Stack className="fileupload-row" >
                    <Typography p={1} variant="h5" sx={{ color: data.theme ? "head" : "#1b386e" }}>Extract Tabular Data from images and PPT files</Typography>
                </Stack>
                {downloadStatus ? (
                    <Stack direction="column" justifyContent="center" alignItems="center" mt={20}>
                        <Typography variant="h6" sx={{ color: "#68e043" }}>Extracting tables processed successfully</Typography>
                        <Typography paragraph>Please download the CSV File</Typography>
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
                                        <img src={TableExtract} alt="logo" width="400px" />
                                        <Typography variant="body1" className="sub-title" mt={3}>
                                            Select multiple PNG, ZIP, or PPTX files, up to 1 MB each
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
                                            <Button type="submit" variant="contained" sx={{ width: "300px" }} className="download-button">{selectedFile.type === "image/png" || selectedFile.type === "image/jpeg" || selectedFile.type === "image/jpg" ? "Convert to CSV" : "Download To Zip"}</Button>
                                        </Stack>
                                    ) : (
                                        <Button variant="contained" sx={{ width: "300px" }} className="download-button" htmlFor="fileInput" onClick={handleFileUpload}>Upload</Button>
                                    )}
                                </Stack>
                            </Stack>
                        ) : (
                            <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                                <img src={TableConverting} style={{"margin":"7rem"}}/>
                              <Typography paragraph> Extracting table in Progress</Typography>
                            </Stack>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}




























