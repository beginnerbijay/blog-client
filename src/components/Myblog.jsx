import React from 'react'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {host} from '../util.js/host'
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Myblog() {
  const [post, setpost] = useState([])
  const [token, settoken] = useState('')
  const nav = useNavigate()
  const toasterror=()=>{
    toast.error('blog is deleted', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
   }
  const deletepost=async(e)=>{
    try{
      const {data} = await axios.delete(`${host}/delete/${e}`,{
      headers: { "x-auth-token": token },
    })
    if(data){
      toasterror()
    }}
    catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    const fun=async(req,res)=>{
      try{
      const user = localStorage.getItem("userinfo");
      const token = JSON.parse(user).token;
      settoken(token)
      const name = JSON.parse(user).name;
      const {data} = await axios.get(`${host}/myblog/${name}`,{
        headers: { "x-auth-token": token },
      })
      if(data){
        setpost(data)
      }
    }catch(e){
      console.log(e)
    }
    }
    fun()
  },[post])
  return (
    <Container sx={{marginTop:10,padding:5}}>
    {post.map((posts,ind)=>{
      return (
      <Card sx={{ display:"flex", maxHeight:250, alignItems:"center" }} key={ind} className='card'>
      <CardMedia
        component="img"
        height="100vh"
        width="40vw"
        sx={{padding:1}}
        image={posts.img}
        alt="green iguana"
        className='image'
      />
      <CardContent sx={{ maxHeight:200, overflow:"hidden"}}>
        <Typography gutterBottom variant="h5" component="div">
        {posts.tittle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {posts.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>nav(`/edit/${posts._id}`)} variant="contained" color="primary">Edit</Button>
        <Button size="small" onClick={()=>deletepost(posts._id)} variant="contained" color="error"><div>Delete</div></Button>
        <ToastContainer/>
      </CardActions>
    </Card>
      )
    })}
    </Container>
  )
}

export default Myblog