import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { host } from "../util.js/host";
import axios from "axios";
import { Container, Typography, Box, TextField, Button, Grid, Avatar } from "@mui/material";
import { useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

function SingleBlog() {
  const { id } = useParams();
  const [post, setPost] = useState("");
  const [text, settext] = useState("");
  const [count, setcount] = useState("")
  const user = localStorage.getItem("userinfo");
  const token = JSON.parse(user).token;
  const commentby = JSON.parse(user).name;
  const fun = async () => {
    const { data } = await axios.get(`${host}/singleblog/${id}`, {
      headers: { "x-auth-token": token },
    });
    if (data) {
      console.log(data);
      setPost(data);
      setcount(data.comments.length)
    }
  };
  const like = async (e) => {
    e.preventDefault();
    const { data } = await axios.patch(
      `${host}/like/${id}`,
      {},
      { headers: { "x-auth-token": token } }
    );
    if (data) {
      setPost(data);
    }
  };
  const comment=async(e)=>{
    e.preventDefault()
    const {data} = await axios.patch(`${host}/comment/${id}`,{text,commentby},{headers:{"x-auth-token":token}})
    if(data){
      fun();
      settext("")
    }
  }
  useEffect(() => {
    fun();
  },[]);
  return (
    <Container sx={{ marginTop: 5, padding: 5 }}>
      <Box className="singletext">
        <Typography
          color="text.secondary"
          align="center"
          sx={{ marginBottom: 1, typography: { sm: "h2", xs: "h4" } }}
        >
          {post.tittle}
        </Typography>
      </Box>

      <Box align="center">
        <img src={post.img} className="singleimg" />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid xs display="flex" justifyContent="start" alignItems="center">
        <Typography sx={{ marginTop: 2 }} >
        <ThumbUpOffAltIcon sx={{ paddingTop: 1 }} onClick={like}/>
        {post.likes}
        <ChatBubbleOutlineIcon sx={{marginLeft:2,paddingTop:1}}/>
        {count}
      </Typography>
        </Grid>
        <Grid xs display="flex" justifyContent="end" alignItems="center">
          <Typography sx={{ marginTop: 2 }} variant="h6">posted by - {post.createdby}</Typography>
        </Grid>
      </Grid>
    </Box>
      

      <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2 }}>
        {post.content}
      </Typography>
      <TextField
        id="outlined-multiline-static"
        label="Comment"
        multiline
        fullWidth
        rows={3}
        placeholder="write your thought here..."
        sx={{ marginTop: 5 }}
        value={text}
        onChange={e=>settext(e.target.value)}
      />
      <Button variant="contained" endIcon={<SendIcon />} sx={{ marginTop: 1 }} onClick={comment}>
        Send
      </Button>

      
        {post.comments?.map((val,ind)=>{
          return (
            <Box sx={{marginTop:1}} className='shadow'>
            <Typography variant="h6" className='flex'><Avatar src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' width='25' className='rounded'/> {val.commentby}</Typography>
            <Typography variant="body2" sx={{marginLeft:1}}>{val.text}</Typography>
      </Box>
          )
        })}
    </Container>
  );
}

export default SingleBlog;
