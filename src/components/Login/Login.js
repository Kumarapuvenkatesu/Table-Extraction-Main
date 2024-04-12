import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as React from 'react';
import { Button, Typography, Box, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUrl } from "../UserServices";
import axios from 'axios';
import Header from '../Header/Header';
// import  Scren from '../../assets/01-Screen.png'

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  const response = await loginUrl(email, password)
      // const response = await axios.post("http://10.93.24.151:3003/login", { email, password });
      const response =await axios.post("http://localhost:3001/login",{email,password});
      console.log("response loginpage extract", response);
      if (response.data.status === "success") {
        // console.log("its true")
        localStorage.setItem("LoginDetails", JSON.stringify(response.data));
        Cookies.set("token", response.data.token1, { expires: 1 })
        if (response.data.role) {
          navigate("/")
          console.log("user shows")
        }
      }
      else {
        toast.error(response.data)
      }
    } catch (error) {
      toast.error(error)
    }
  };
  // useEffect(() => {
  //   const jwtToken = Cookies.get('token');
  //   if (jwtToken !== undefined) {
  //     window.location.href = '/fileupload';
  //   }
  // }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            // marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center"
          }}
        >
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography variant="h4" textAlign={'center'}>
              Login
            </Typography>
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              autoComplete="off"
              type={"email"}
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Link variant="span" to="/forget">
              Forgot password?
            </Link>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, }} className='download-button'  >
              Login
            </Button>
            {/* <Link  variant="span" to="/signup">
        You Don't have an account? Sign Up
      </Link> */}
          </Box>
        </Box>
      </Container>
    </>
  );
}