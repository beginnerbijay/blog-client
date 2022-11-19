import React,{useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import { Box, Container, FormControl, InputLabel, OutlinedInput, TextareaAutosize, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { host } from '../util.js/host';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditBlog() {
    const {id} = useParams()
    const [tittle, setTittle] = useState('');
  const [img, setImg] = useState('');
  const [content, setContent] = useState('');
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
      const {data} = await axios.patch(`${host}/edit/${id}`,{tittle,content,img},{headers:{"x-auth-token":token}})
      if(!data){
        toasterror()
      }else{
        toastsuccess()
        nav("/myblog")
      }
    }catch(e){
      console.log(e)
    }
  }
  useEffect(() => {
    const fun = async () => {
      const user = localStorage.getItem("userinfo");
      const token = JSON.parse(user).token;
      setToken(token)
      const { data } = await axios.get(`${host}/singleblog/${id}`, {
        headers: { "x-auth-token": token },
      });
      if (data) {
        setImg(data.img);
        setContent(data.content);
        setTittle(data.tittle);
      }
    };
    fun();
  }, []);
  return (
    <Container maxWidth="sm" sx={{display:'flex',
    justifyContent:'center'}}>
   <Box  sx={{
      backgroundColor:'#fff',
        display: 'flex',
        marginTop:'5rem',
        width:'100vw',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        '& > :not(style)': { m: 1 },
      }} className='box'>
      <Typography variant="h3" component="h2">Edit The Blog</Typography>
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
      <Button variant="contained" sx={{width:'40vw',minWidth:"17rem"}} onClick={handler}>Submit</Button>
      <ToastContainer/>
      </Box>
    </Container>
  )
}

export default EditBlog