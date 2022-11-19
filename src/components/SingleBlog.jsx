import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { host } from "../util.js/host";
import axios from "axios";
import { Container, Typography, Box } from "@mui/material";
import { useState } from "react";

function SingleBlog() {
  const { id } = useParams();
  const [post, setPost] = useState('')

  useEffect(() => {
    const fun = async () => {
      const user = localStorage.getItem("userinfo");
      const token = JSON.parse(user).token;
      const { data } = await axios.get(`${host}/singleblog/${id}`, {
        headers: { "x-auth-token": token },
      });
      if (data) {
        setPost(data);
      }
    };
    fun();
  }, []);
  return (
    <Container sx={{marginTop:5,padding:5}}>
    <Box className='singletext'><Typography color="text.secondary" align='center' sx={{marginBottom:1,typography: { sm: 'h2', xs: 'h4' } }} >{post.tittle}</Typography></Box>
        
        <Box align='center'><img src={post.img} className='singleimg'/></Box>
        <Typography variant="body1" color="text.secondary" sx={{marginTop:5}} >{post.content}</Typography>
    </Container>
  )
}

export default SingleBlog;
