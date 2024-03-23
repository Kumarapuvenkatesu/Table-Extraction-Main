
import React, { useState,useEffect } from "react";
import axios from "axios";
import * as FileSaver from 'file-saver';
import image1 from "../../assets/Category_1.png";
import image2 from "../../assets/Category_2.png";
import image3 from "../../assets/Category_3.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { Dialog, Stack ,IconButton, Typography, Button} from "@mui/material";
import { Close } from "@mui/icons-material";
import Header from "../Header/Header";
import IMG1 from "../../assets/jpg-png.png";
import INFO from "../../assets/info-ico.png";
import PPT1 from "../../assets/ppt-png-img.png"




export default function SingleFile() {

    const categories=[
    {
        id:1,
        name:"1",
        img:image1
    },
    {
        id:2,
        name:"2",
        img:image2
    },
    {
        id:3,
        name:"3",
        img:image3
    }
  ]

  const [profileImg, setProfileImg] = useState(null);
  const [profileImgEl3, setProfileImgEl3] = useState(null);
  const[open,setOpen]=useState(false);
  const [user,setUser]=useState(null)



  // useEffect(() => {
  //   const jwtToken = Cookies.get("token");
  //   if (jwtToken === undefined) {
  //     window.location.href = "/login"
  //   }
  // }, [undefined])


  const onFileChange1 = (categoryId,e) => {
    console.log(e.target.files)
   switch (e.target.id) {
    case 'fileInput1':
      setProfileImgEl3(categoryId);
      setProfileImg(e.target.files[0]);
      break;
    case 'fileInput2':
      setProfileImgEl3(categoryId);
      setProfileImg(e.target.files[0]);
      break;
    case 'fileInput3':
      setProfileImgEl3(categoryId);
      setProfileImg(e.target.files[0]);
      break;
    default:
      console.warn(`Unexpected input id: ${e.target.id}`);
  }
    toast.success("file uploaded",{
      position: "top-right",
      autoClose: 1000});
  };

  const submitButton1=(profileImgEl3)=>{
    setUser(profileImgEl3)
    setOpen(true);
  }
  

const CloseButton=()=>{
  setOpen(false)
}


  

  const handleSubmit = async (e,user) => {
    e.preventDefault();
    console.log("category",user)

    try {
      toast.info("File Downloading");

      const formData = new FormData();
      formData.append('image', profileImg);

      const response = await axios.post(`http://172.17.151.141:3002/tableExtractionCat${user}`, formData);

      const filename = `my_download_file_category_${user}.csv`;
      FileSaver.saveAs(new Blob([response.data], { type: 'text/csv' }), filename);
      toast.success(`File Downloaded (${filename})`);
      setProfileImg(null);
    } catch (error) {
      console.error("Error during download:", error);
      toast.error(`Error during download in Category${user}`);
    
    }
  };

  



  const handleFileUpload = (categoryId) => {
    document.getElementById(`fileInput${categoryId}`).click();
  }

  const handleDragOver=(e)=>{
    e.preventDefault()
  }

  const handleDragFiles=(e,categoryId)=>{
    e.preventDefault();
    alert("This way not accepted")
//     const files=e.dataTransfer.files;
// console.log("1122",files)

  }

  




  return (
    <>
    <Header/>
  
  <ToastContainer position="bottom-right" autoClose="1000" theme="dark"/>
  <Stack  className="table-inside-elements user">
      <Stack direction={"row"}  justifyContent={"center"}  >
        <img src={IMG1} alt="png" />
          <h3 className="main-heading">Extract tabular data from images and PPT files</h3>
        {/* <img src={PPT} alt="ppt"/> */}
        <img src={PPT1} alt="ppt"/>
      </Stack >
  <Stack direction={"row"}mb={2} className="info-position">
    <img src={INFO} alt="info" />
    <p className="head-paragraph">Choose the table category type you want to extract, for your reference see the sample table images provided in each category</p>
  </Stack>

      <div className="categories-view " style={{margin:"auto"}} >
      {/* <div className="categories-view "  > */}

      {categories &&
            categories.map((category,index)=>(

                <div className=" category-gap" key={index} style={{height:"468px" ,width:"400px"}}>
        <h3 className="table-heading">Table Category {category.name}</h3>
            <p>Please Choose file to extract <br/>JPG,PNG Images or PPT files which has tables</p>
          <form  
           onSubmit={(e)=>handleSubmit(e,category.id)}
             className="form-height file-upload-position"
            >

              <div 
              onClick={()=>handleFileUpload(category.id)}
              onDrop={handleDragFiles}
               onDragOver={handleDragOver}
           
           className="dropzone"
              >
            
           <h2 className="table-heading">Choose File</h2>
              <input type="file" onChange={(e)=>onFileChange1(category.id,e)} accept="image/*" id={`fileInput${category.id}`} className="input-file-type" />
           
            </div>
           
            {(profileImgEl3===category.id)
              &&
              <div className="file-name">
                <p style={{margin:"0px"}}>  {profileImg?.name}</p>
                <p onClick={()=>submitButton1(profileImgEl3)}  className="download-button" style={{margin:"0px",cursor:"pointer"}}>
                  Extract Table
                </p>
              {/* <button type="submit" className="download-button" >
              Download
            </button> */}
            </div>
            }


<Dialog open={open}  >

        <Stack width="400px" textAlign={"center"}>

          <Stack direction={"row"} justifyContent={"flex-end"}>
        
            <IconButton onClick={CloseButton}>
              <Close />
            </IconButton>
          
          </Stack>
          <Typography paragraph color="success">Extracting Tables Procced successfully</Typography>
          <Stack  direction={"column"} alignItems={"center"} m={2}>
          <Typography paragraph> Please download the CSV file</Typography>
        <Button type="submit" className="download-button" onClick={(e)=>handleSubmit(e,user)}>
               Download
             </Button> 
             </Stack>
        </Stack>
      </Dialog>
            
          </form>
          <div className="img-view" style={{margin:"0px"}}>
            <h4>Sample Table for Reference</h4>
            <img src={category.img} alt="category1" className="img-width" />
          </div>
        </div>
            ))
        }

      </div>
      </Stack>
    </ >
  );
}
