import { Stack, TextField, Typography, Box, Button, Container, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router-dom";
// import Header from "../Header/Header";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import { Visibility, VisibilityOff } from "@mui/icons-material";
import Header from "../Header/Header";



export default function Forget() {
  const [forgetEl, setForgetEl] = useState('');
  const [value, setValue] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/forgot", { email: forgetEl });
      if (response.data.success) {
        setValue(true)
      } else {
        console.log(response.data);
        toast.error(response.data)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmited = async (e) => {
    e.preventDefault();
    if (password.length > 0) {
      const response = await axios.put("http://localhost:3001/updatePassword", { email: forgetEl, newPassword: password })

      if (response.data.success) {
        toast.success("Password Changed Successfully")
      }


    } else {
      toast.error("password wrong")
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }


  return (
    <Stack>
      <Header/>
      <Container component="main" maxWidth="xs" >
        <ToastContainer />

        {
          value ?
            (
            <Box component='form' onSubmit={handleSubmited} sx={{ mt: 16 }}>

              <TextField
                margin="normal"
                fullWidth
                value={forgetEl}
              />

              <FormControl sx={{ m: 1, ml: 0, mr: 0 }} variant="outlined" fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility color="info" /> : <VisibilityOff color='warning' />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              {/* <TextField
                      fullWidth
                    sx={{mt:4}}
                      label="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                    /> */}
              <Button variant="contained" type="submit" fullWidth sx={{ mt: 4 }} >Set Password</Button>
            </Box>)
            : (
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 16 }} >
                <Typography variant="h3" textAlign={"center"}>Forget</Typography>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Forget"
                  type="email"
                  value={forgetEl}
                  onChange={(event) => setForgetEl(event.target.value)}
                />


                <Button variant="contained" type="submit" fullWidth className="button" sx={{ mt: 3, mb: 2 }}>Forget</Button>
              </Box>)
        }

        <Link to={"/login"} >LOGIN</Link>
      </Container>
    </Stack>
  )
}
