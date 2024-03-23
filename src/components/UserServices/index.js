import axios from "axios";

const Domain="http://172.17.151.141:3002"

export const loginUrl=async(email,password)=>{
    const ApiUrl=Domain+"/login";
    //const ApiUrl="http://localhost:3001/login"
    try {
        const response=await axios.post(ApiUrl,{email,password})
        console.log(response)
    } catch (error) {
        console.log(error)
        
    }
}