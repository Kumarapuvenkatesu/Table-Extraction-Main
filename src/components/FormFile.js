import React, { useState} from "react";
import axios from "axios";
import * as FileSaver from 'file-saver';

export default function App() {
 const[imgName,setImgName]=useState('')
 const[imgNum,setImgNum]=useState('')
  const[fileName,setFileName]=useState('') 
  const[pageNum,setPageNum]=useState('')



const handleSubmit=async(e)=>{
  e.preventDefault();

  console.log("data",{imgName,imgNum,fileName,pageNum}) 
  const isValid = imgName && imgNum && fileName && pageNum;
  if (!isValid) {
    alert('Please fill in all fields.');
    return;
  }

  const formData =new FormData();
  formData.append('imgName',imgName);
  formData.append('imgNum',imgNum);
  formData.append('fileName',fileName);
  formData.append('pageNum',pageNum)
 
  try {
   
    const response = await axios.post("http://172.17.151.141:3002/imgfileconversion", formData);

    console.log("eqwe",response)
    FileSaver.saveAs(new Blob([response.data], { type: 'text/csv' }), 'my_download_file_form.csv');
  } catch (error) {
    console.log(error)
  }
  
}



  return (
   <>
   <form onSubmit={handleSubmit} style={{marginLeft:"15em"}} className="container">
    <input type='text' onChange={(e)=>setImgName(e.target.value)} value={imgName} id="imgName" placeholder="ImgName"  /><br/>
    <input type="number"onChange={(e)=>setImgNum(e.target.value)} value={imgNum} id="imgNum" placeholder="ImgNum"/><br/>
    <input type='text' onChange={(e)=>setFileName(e.target.value)} value={fileName} id="fileName" placeholder="FileName"/><br/>
    <input type="number" onChange={(e)=>setPageNum(e.target.value)} value={pageNum} id="fileNum" placeholder="PageNum"/><br/> 
    <button type="submit">submit</button>
   </form>
   </>
  );
}