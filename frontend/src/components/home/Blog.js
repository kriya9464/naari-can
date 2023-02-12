import React, { useEffect, useState } from 'react';
import './blog.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Blogpost from './Blogpost';
import axios from 'axios';

function Blog({pg, setPg}) {

  const [blogs,setBlogs]=useState([])
  useEffect(()=>{
    axios.get('/api/blogs').then((res)=>{
      console.log(res.data);
      setBlogs(res.data.reverse())
      //console.log('question',posts);
    }).catch((e)=>{
      console.log(e);
    });
  },[]);

  return (
    <div className='blogs'>
     {/*  <div className="backward">
        <ArrowBackIosNewIcon />
      </div> */}
      <div className="central">
      <div className="posts">
        {
          blogs.map((blog, index)=>(<Blogpost key={index} blog={blog} setpg={setPg}/>))
        }
       
      </div>
     {/*  <div className="post">
       <Blogpost />
      </div>
      <div className="post">
       <Blogpost />
      </div>
      <div className="post">
       <Blogpost />
      </div> */}
      </div>
      <div className="slider">
        <ArrowForwardIosIcon onClick={()=>setPg('page2')} style={{overflow:"hidden", marginRight:"20px"}}/>
      </div>
    </div>
  )
}

export default Blog