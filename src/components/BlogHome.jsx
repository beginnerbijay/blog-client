import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Container, Grid } from '@mui/material';
import axios from 'axios';
import { host } from '../util.js/host';
import { useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom'

export default function BlogHome() {
  const [post, setPost] = useState([])
  const nav = useNavigate()
  React.useEffect(()=>{
    const validfun = async()=>{
      try{
    const user = localStorage.getItem('userinfo')
    const token = JSON.parse(user).token
    const {data} = await axios.get(host,{
      headers:{"x-auth-token":token},
    })
    if(data){
      setPost(data)
    }
  }catch(e){
    console.log(e)
  }
  }
  validfun()
  },[])
  const convertdate=(e)=>{
    const date = new Date(e)
    return (date.toDateString())
  }
  return (
    <>
    <Box className='img'>
    <Box><Typography variant="h1" color="#fff" align='center'>
          Blogging
        </Typography>
    <Typography variant="h4" color="#fff" align='center'>
         Publish Your Passion, In Your Way
        </Typography>
        </Box></Box>
    <Container>
    <Grid container spacing={1} sx={{marginTop:1}}>
    {post.map((posts,ind)=>{
      return (
        <Card sx={{ width: 450,margin:3 }} key={ind} onClick={()=>{nav(`/blog/${posts._id}`)}}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={posts.tittle}
        subheader={convertdate(posts.createdat)}
      />
      <CardMedia
        component="img"
        height="194"
        image={posts.img}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" maxHeight='5rem'>
          {posts.content}
        </Typography>
      </CardContent>
    </Card>
      )
    })}
    </Grid>
    </Container>
    </>
  );
}