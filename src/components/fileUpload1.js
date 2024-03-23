
import React, { useState } from "react";
import axios from "axios";
import * as FileSaver from 'file-saver';
import image1 from "../assets/Category_1.png";
import image2 from "../assets/Category_2.png";
import image3 from "../assets/Category_3.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function SingleFile() {
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgEl, setProfileImgEl] = useState(false);
  const [profileImgEl2, setProfileImgEl2] = useState(false);
  const [profileImgEl3, setProfileImgEl3] = useState(false);


  const onFileChange1 = (e) => {
    console.log(e.target.files[0])
    setProfileImg(e.target.files[0]);
   switch (e.target.id) {
    case 'fileInput1':
      setProfileImgEl(true);
      break;
    case 'fileInput2':
      setProfileImgEl2(true);
      break;
    case 'fileInput3':
      setProfileImgEl3(true);
      break;
    default:
      console.warn(`Unexpected input id: ${e.target.id}`);
  }
    toast.success("file uploaded",{
      position: "top-right",
      autoClose: 1000});
    console.log("id" , e.target.id)
  };


  



  const onSubmit1 = async (e) => {
    e.preventDefault();
   
    
    try {
      toast.info("file Downloading");
      const formData = new FormData();
      formData.append('image', profileImg);
      

      const response = await axios.post("http://172.17.151.141:3002/tableExtractionCat1", formData);

      console.log("123456", response)
      FileSaver.saveAs(new Blob([response.data], { type: 'text/csv' }), 'my_download_file_category_1.csv');
      toast.success("file Downloaded");
      setProfileImgEl(false)
       setProfileImg(null);

    } catch (error) {
      console.error("Error during download:", error);
      toast.error("Error during download in Category1");
    }
  };

  const onSubmit2 = async (e) => {
    e.preventDefault();

    try {
      toast.info("file Downloading");

      const formData = new FormData();
      formData.append('image', profileImg);

      const response = await axios.post("http://172.17.151.141:3002/tableExtractionCat2", formData);

      console.log("123456", response)
      FileSaver.saveAs(new Blob([response.data], { type: 'text/csv' }), 'my_download_file_category_2.csv');
      toast.success("file Downloaded");
      setProfileImgEl2(false)
       setProfileImg(null)
    } catch (error) {
      console.error("Error during download:", error);
      toast.error("Error during download in Category2");
    }
  };

  const onSubmit3 = async (e) => {
    e.preventDefault();


    try {
      toast.info("file Downloading");

      const formData = new FormData();
      formData.append('image', profileImg);

      const response = await axios.post("http://172.17.151.141:3002/tableExtractionCat3", formData);

      console.log("123456", response)
   
      FileSaver.saveAs(new Blob([response.data], { type: 'text/csv' }), 'my_download_file_category_3.csv');
      toast.success("file Downloaded");
      setProfileImgEl3(false)
      setProfileImg(null)
    
    } catch (error) {
      console.error("Error during download:", error);
      toast.error("Error during download in Category3");

    }
  };


  






  return (
    <>
  <ToastContainer position="bottom-right" autoClose="1000" theme="dark"/>
      <div className="categories-view" >
        
        <div className="category1-background category-gap" >
      
          <form 
            onSubmit={onSubmit1 } 
          // onSubmit={(e)=>handleSubmit(1)}
            className="form-gap">
            <h3>Category1</h3>
            <div >
              <input type="file" onChange={onFileChange1} accept="image/*" id="fileInput1" />
            </div>
            <button type="submit" disabled={!profileImgEl}>
              Download
            </button>
          </form>
          <div className="img-view">
            <h4>Sample Image</h4>
            <img src={image1} alt="category1" className="img-width" />
          </div>
        </div>





        <div className="category2-background category-gap" >
          <form 
          onSubmit={onSubmit2 }
          // onSubmit={(e)=>handleSubmit(2)}
            className="form-gap">
            <h3>Category2</h3>
            <div >
              <input type="file" onChange={onFileChange1} accept="image/*" id="fileInput2" />
            </div>
            <button type="submit" disabled={!profileImgEl2}>
              Download
            </button>
          </form>
          <div className="img-view">
            <h4>Sample Image</h4>
            <img src={image2} alt="category2" className="img-width" />
          </div>
        </div>


        <div className="category3-background category-gap" >
          <form 
          onSubmit={onSubmit3 }
          // onSubmit={(e)=>handleSubmit(3)}
            className="form-gap">
            <h3>Category3</h3>
            <div >
              <input type="file" onChange={onFileChange1} accept="image/*" id="fileInput3" />
            </div>
            <button type="submit" disabled={!profileImgEl3}>
              Download
            </button>
          </form>
          <div className="img-view">
            <h4>Sample Image</h4>
            <img src={image3} alt="category3" className="img-width" />
          </div>
        </div>
      </div>
    </>
  );
}









