import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import {Routes,Route, useNavigate} from 'react-router-dom'
import BlogHome from '../components/BlogHome'
import Create from '../components/Create'
import EditBlog from '../components/EditBlog'
import Myblog from '../components/Myblog'
import Navbar from '../components/Navbar'
import SingleBlog from '../components/SingleBlog'
import { host } from '../util.js/host'

function Home() {
  const nav = useNavigate()
  useEffect(() => {
    const validfun = async()=>{
      try{
    const user = localStorage.getItem('userinfo')
    const token = JSON.parse(user).token
    const valid = await axios.get(host,{
      headers:{"x-auth-token":token},
    })
    if(!valid){
      nav("/login")
    }
  }catch(e){
    console.log(e)
    nav("/login")
  }
  }
  validfun()
  }, [])
  
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path='/' element={<BlogHome/>} />
    <Route path='/myblog' element={<Myblog/>}/>
    <Route path='/create' element={<Create/>}/>
    <Route path='/blog/:id' element={<SingleBlog/>}/>
    <Route path='/edit/:id' element={<EditBlog/>}/>
    </Routes>
    </>
  )
}

export default Home