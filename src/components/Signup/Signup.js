import * as React from 'react';
import { Button, Typography, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from '../Header/Header';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function SignUp() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      // const response = await axios.post("http://localhost:3001/signup", { email, password, name })
      const response = await axios.post("http://172.17.151.141:3002/signup", { email, password, name })
      console.log(response);
      toast.success(response.data.status)
    }
  };

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <ToastContainer />
        <Box
          sx={{
            marginTop: 18,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  value={name}
                  label="Username"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Link variant="span" to={"/forget"}>
              Forgot password?
            </Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className='button'
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Link to="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}