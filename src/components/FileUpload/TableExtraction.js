import React, { useState, useEffect } from "react";
import axios from "axios";
import * as FileSaver from 'file-saver';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Stack, Box, Button, Typography, TextField, IconButton } from "@mui/material";
import { useThemeContext } from "../ThemeContext/ThemeContext";
import { Close } from "@mui/icons-material";
import SideHeader from "../Header/SideHeader";
import TableExtract from "../../assets/images/img-fromate.png";
import TableConverting from "../../assets/images/img-table-convert.png";
import Cookies from "js-cookie";

export default function MathCovertor() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreviews, setFilePreviews] = useState([]);
    const [open, setOpen] = useState(false);
    const [downloadStatus, setDownloadStatus] = useState(false);
    const [response, setResponse] = useState([]);
    const [tableHead, setTableHead] = useState();
    const [imageSrc, setImageSrc] = useState(null);
    const data = useThemeContext()

    const onFileChange = (e) => {
        const files = e.target.files;
        // console.log("files", files)
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if 
                    (file.type === "application/x-zip-compressed" ||
                        file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
                        /image\/(jpeg|png|jpg|jpg)/.test(file.type))
                    // &&
                    // (file.size <= 1024 * 1024)
                 {
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
                        // const response = await fetch("http://172.17.151.141:3002/tableExtraction", {
                        //     method: "POST",
                        //     body: formData,
                        // });
                        const response = await axios.post('http://10.91.10.142:3002/tableExtraction', formData);
                        console.log("1112", response)
                        const splitLine = response.data.split("\n")
                        var header = null
                        var body = []
                        splitLine.forEach((sc, i) => {
                            if (i != 0 && i != 1) {
                                console.log(sc.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g));
                                var newsc = sc.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
                                if (newsc !== null) {
                                    newsc.shift();
                                    body.push(newsc);
                                }
                            }
                            if (i == 1) {
                                header = sc.split(",");
                                console.log("header",header);
                            }
                        });
                        header.shift()
                        setTableHead(header)
                        setImageSrc(body)
                        setResponse(response)
                        if (response.status === 200) {
                            setDownloadStatus(!downloadStatus)
                        }
                    } catch (error) {
                        console.log(error);
                        toast.error("An error occurred. Please try again.");
                        setOpen(false)
                    }
                    break;
                case "application/x-zip-compressed":
                    try {
                        const formData = new FormData();
                        formData.append("image", selectedFile);
                        const response = await axios.post("http://10.91.10.142:3002/allImgTabExt", formData
                            , {
                                responseType: 'blob'
                            });
                            console.log("resp", response.data.type)
                        setResponse(response)
                        if (response.status === 200) {
                            setDownloadStatus(!downloadStatus)
                        }
                    } catch (error) {
                        toast.error("Error during download:", error);
                        setOpen(false)
                    }
                    break;
                case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                    try {
                        const formData = new FormData();
                        formData.append("image", selectedFile);
                        const response = await axios.post("http://10.91.10.142:3002/pptFileExtraction", formData, {
                            responseType: 'blob'
                        });
                        console.log("data",response);
                        console.log("resp", response.data.type)
                        setResponse(response)
                        if (response.status === 200) {
                            setDownloadStatus(!downloadStatus)
                        }
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
                if 
                    (file.type === "application/x-zip-compressed" ||
                        file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
                        /image\/(jpeg|png|jpg|jpg)/.test(file.type))
                    // &&
                    // (file.size <= 1024 * 1024)
                 {
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

    const downloadData =  () => {
        switch (response.type || response.data.type) {
            case 'application/zip':
              const blobZip = new Blob([response.data], { type: 'application/zip' });
              const urlZip = window.URL.createObjectURL(blobZip);
              const linkZip = document.createElement('a');
              linkZip.href = urlZip;
              linkZip.setAttribute('download', 'my_download_file.zip');
              linkZip.click();
              break;
              case 'application/json':
                const blobPpt = new Blob([response.data], { type: 'application/zip' });
                const urlPpt = window.URL.createObjectURL(blobPpt);
                const linkPpt = document.createElement('a');
                linkPpt.href = urlPpt;
                linkPpt.setAttribute('download', 'my_download_file.zip');
                linkPpt.click();
                break;
            default:
                const blob = new Blob([response.data], { type: 'text/csv' });
                FileSaver.saveAs(blob, 'my_download_file.csv');
                setImageSrc(null)
          }setDownloadStatus(!downloadStatus);
          setOpen(false);
          toast.success("File downloaded and data extracted successfully", { autoClose: 1000 });
          setSelectedFile(null);
    }

    useEffect(() => {
        const jwtToken = Cookies.get("token");
        if (jwtToken === undefined) {
          window.location.href = "#/login"
        }
      }, [undefined])

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"flex-end"}>
            <SideHeader />
            <ToastContainer position="bottom-right" />
            <Box component="form" onSubmit={onSubmit} className={data.theme ? "head" : "body"}  >
                <Stack className="fileupload-row" >
                    <Typography p={1} variant="h5" sx={{ color: data.theme ? "head" : "#1b386e" }}>Extract Tabular Data from images and PPT files</Typography>
                </Stack>
                {downloadStatus ? (
                    <Stack direction="column" justifyContent="center" alignItems="center" mt={4}>
                        {
                            imageSrc !== null &&
                            <Stack direction={"row"} my={1} gap={2} >
                                <Stack sx={{ background: "#d1d1d1", px: "30px", py: "22px" }} justifyContent={"center"} alignItems={"center"}>
                                    <img src={filePreviews} alt={'Preview'} width={"300px"} />
                                </Stack>
                                <Stack sx={{ background: "#d1d1d1",p:"10px" }}>
                                    <table border={1} style={{ borderCollapse: "collapse" }}>
                                        <thead>
                                            <tr>
                                                {
                                                    tableHead?.length &&
                                                    tableHead.map((thData, i) => {
                                                        return (
                                                            <th key={i}>{thData}</th>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                imageSrc?.length &&
                                                imageSrc.map(isrc => {
                                                    return (
                                                        <tr >
                                                            {
                                                                isrc.map(isrcdata => (<td>{isrcdata}</td>))
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </Stack>
                            </Stack>
                        }
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
                                <img src={TableConverting} style={{ "margin": "7rem" }} />
                                <Typography paragraph> Extracting table in Progress</Typography>
                            </Stack>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}