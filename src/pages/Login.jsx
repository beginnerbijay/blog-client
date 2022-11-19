import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { host } from '../util.js/host';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const [name, setName] = useState('');
  const [password, setpassword] = useState('');
  const nav = useNavigate()
  const toasterror=()=>{
    toast.error('Login invalid', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
   } 
  const toastsuccess=()=>{
    toast.error('Login successfull', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
   }
  const hander =async(e)=>{
    try{e.preventDefault()
      if(name && password){
    const {data} = await axios.post(`${host}/user/login`,{name,password})
    if(data.token){
      localStorage.setItem("userinfo", JSON.stringify(data))
      toastsuccess()
      nav('/')
    }else{
      toasterror()
    }}else{
      toasterror()
    }
  }catch(e){
    console.log(e)
  }
  }
  return (
    <Box
      sx={{
        backgroundColor:'#6d9ac4',
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent:'center',
        '& > :not(style)': { m: 0 },
      }}
    ><Box  sx={{
      backgroundColor:'#fff',
        display: 'flex',
        height: (theme) => theme.spacing(45),
        width:(theme) => theme.spacing(35),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        '& > :not(style)': { m: 1 },
      }} className='box'>
      <Typography variant="h3" component="h2">Log In</Typography>
      <FormControl>
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          label="Name"
        />
        </FormControl>
        <FormControl>
        <InputLabel htmlFor="component-outlined">Password</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
          label="Password"
        />
        </FormControl>
      <Button variant="contained" sx={{minWidth:'220px'}} onClick={hander}>Submit</Button>
      <ToastContainer/>
      <Box sx={{display:"flex"}}><Typography variant="subtitle1" component="h2">Don't have an account?</Typography>
      <NavLink to='/signup'><Typography variant="subtitle1" component="h2">SIGN UP</Typography></NavLink>
      </Box>
      </Box>
    </Box>
  );
}