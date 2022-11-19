import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { Box, Container, FormControl, IconButton, InputLabel, OutlinedInput, TextareaAutosize, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { host } from '../util.js/host';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Create() {
  const [tittle, setTittle] = useState('');
  const [img, setImg] = useState('');
  const [content, setContent] = useState('');
  const [createdby, setCreatedby] = useState('');
  const [token, setToken] = useState('');
  const nav = useNavigate()
  const toasterror=()=>{
    toast.error('something is wrong', {
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
    toast.error('your blog is now online', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
   }
  const handler =async()=>{
    try{
      if(tittle && content && img && createdby){
        const {data} = await axios.post(`${host}/create`,{tittle,content,img,createdby},{headers:{"x-auth-token":token}})
        if(!data){
          toasterror()
        }else{
          toastsuccess()
          nav("/myblog")
        }
      }else{
        toasterror()
      }
    }catch(e){
      console.log(e)
    }
  }
useEffect(()=>{
  const user = localStorage.getItem("userinfo")
  const userinfo = JSON.parse(user)
  setCreatedby(userinfo.name)
  setToken(userinfo.token)
},[])
  return (
    <Container maxWidth="sm" sx={{display:'flex',
    justifyContent:'center'}}>
   <Box  sx={{
      backgroundColor:'#fff',
        display: 'flex',
        marginTop:'5rem',
        width:"100vw",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        '& > :not(style)': { m: 1 },
      }} className='box'>
      <Typography variant="h3" component="h2">Write A Blog</Typography>
      <FormControl sx={{width:'40vw',minWidth:"17rem"}}>
        <InputLabel htmlFor="component-outlined">Tittle</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={tittle}
          onChange={(e)=>setTittle(e.target.value)}
          label="Tittle"
        />
        </FormControl>
        <FormControl sx={{width:'40vw',minWidth:"17rem"}}>
        <InputLabel htmlFor="component-outlined">Image URL</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={img}
          placeholder='paste your imgage address'
          onChange={(e)=>setImg(e.target.value)}
          label="Image URL"
        />
        </FormControl>
        <FormControl sx={{width:'40vw',minWidth:"17rem"}}>
        <TextareaAutosize
        aria-label="empty textarea"
        placeholder='description'
  style={{ width: '40vw',height:150,padding:15,minWidth:"17rem"}}
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          label="description"
        />
        </FormControl>
      <Button variant="contained" sx={{Width:'40vw',minWidth:"17rem"}} onClick={handler}>Submit</Button>
      <ToastContainer/>
      </Box>
    </Container>
  )
}

export default Create