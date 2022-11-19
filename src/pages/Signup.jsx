import * as React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { host } from "../util.js/host";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate()
  const toasterror=()=>{
    toast.error('Registration invalid', {
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
    toast.error('Registration successfull', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
   } 
  const handler =async(e)=>{
    try{e.preventDefault()
      if(name && email && password)
      {
    const {data} = await axios.post(`${host}/user/signup`,{name,email,password})
    console.log(data)
    if(data.token){
      toastsuccess()
      nav('/login')
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
        backgroundColor: "#6d9ac4",
        display: "flex",
        height: '100vh',
        alignItems: "center",
        justifyContent: "center",
        "& > :not(style)": { m: 0 },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          display: "flex",
          height: (theme) => theme.spacing(50),
          width: (theme) => theme.spacing(35),
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          "& > :not(style)": { m: 1 },
        }}
        className="box"
      >
        <Typography variant="h3" component="h2">
          Sign Up
        </Typography>
        <FormControl>
          <InputLabel htmlFor="component-outlined">Name</InputLabel>
          <OutlinedInput
            id="component-outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="component-outlined">Email</InputLabel>
          <OutlinedInput
            id="component-outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="component-outlined">Password</InputLabel>
          <OutlinedInput
            id="component-outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />
        </FormControl>
        <Button variant="contained" sx={{ minWidth: "220px" }} onClick={handler}>
          Submit
        </Button>
        <ToastContainer/>
        <Box sx={{ display: "flex" }}>
          <Typography variant="subtitle1" component="h2">
            Alraedy have an account?
          </Typography>
          <NavLink to="/login">
            <Typography variant="subtitle1" component="h2">
              Log In
            </Typography>
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
}
