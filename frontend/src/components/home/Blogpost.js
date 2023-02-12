import { Avatar, Button, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './blogpost.css';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReactTimeAgo from "react-time-ago";
import ReactHtmlParser from "html-react-parser";
import { useSelector } from 'react-redux';
import { selectUser } from '../../feature/userSlice';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import Comment from './Comment';



function LastSeen({ date }) {
    return (
      <div>
        <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
      </div>
    );
  }

function Blogpost({blog, setpg}) {

  const user=useSelector(selectUser)
  const [alreadyliked, setAlreadyLiked]=useState(false);
  const [comment, setComment]=useState(false)
  const [input, setInput]=useState("")
  const [showComment,setShowComment]=useState(false)
  const [Id, setId]= useState("")
  const Uid=user?.uid;
 /*  const [Uid, setUid]=useState(user?.uid) */
console.log("uid",Uid)
 console.log('blog',user?.uid);

 useEffect(()=>{
  blog?.All_bloglikes?.map((p)=>{
    console.log("blog",user?.uid)
    if(p?.user?.uid===Uid){

      setAlreadyLiked(true);
      setId(p?._id)
    }
   
  })
},[])

  const handleBlogDelete=async(id)=>{
    if(window.confirm('Are u sure you want to delete this post?')){
      const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    const body = {
        id:id,
       
    }
    await axios.post('/api/blogs/delete',body,config).then((res)=>{
      
        console.log(res.data)
        alert('data deleted');
        
        window.location.href = '/'
    }).catch((e)=>{
        console.log(e);
    })
    }

  }




  const handleBlogLike = async(id) =>{

    {
  
      const config = {
        headers: {
          "Content-Type":"application/json"
        }
      }
  
      const body = {
        //questionName: question,
        blogId: id,
        user:user
      }
    
      await axios.post('/api/bloglikes',body,config).then((res)=>{
        console.log(res.data);
       // setIsLike(!islike);
        alert(res.data.message);
        window.location.href ="/";
      }).catch((e)=>{
        console.log(e);
        alert('error in adding like')
      })
    }
  }

  const handleComment = async(bid) =>{

    {
  
      const config = {
        headers: {
          "Content-Type":"application/json"
        }
      }
  
      const body = {
        
        comment:input,
        blogId: bid,
        user:user
      }
    
      await axios.post('/api/blogcomments',body,config).then((res)=>{
        console.log(res.data);
       // setIsLike(!islike);
        alert(res.data.message);
        
        window.location.href ="/";

      }).catch((e)=>{
        console.log(e);
        alert('error in adding comment')
      })
    }
  }

/* 
  const handleBlogUnLike=async()=>{
    {
      
      //setId("");
      const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    const body = {
        id:Id,
       
    }
    await axios.post('/api/bloglikes/delete',body,config).then((res)=>{
        setAlreadyLiked(false);
        console.log(res.data)
        //alert('data deleted');
        setId("")
       window.location.href = '/'
    }).catch((e)=>{
        console.log(e);
    })
    }

  } */




  return (
    
    <div className='blog_post'>
        <div className="blog_head">
            <div className="user">
                <Avatar src={blog?.user?.photo}/>
                <h5>{blog?.user?.userName}</h5>
            </div>
            <div className="timestamp">
                <small><LastSeen date={blog?.createdAt} /></small>
            </div>
        </div>
        <div className="blog_body">
        <div className="image">
            <img src={blog?.imgUrl} alt="" />
        </div>
        <div className="post_content">
            <p>{ReactHtmlParser(blog?.blogContent)}</p>
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quisquam laborum eligendi voluptatum eveniet hic ipsum numquam suscipit? Fugit blanditiis officiis, labore temporibus pariatur quos consequatur repellat perspiciatis. Accusamus ratione illo a hic cum, corporis placeat rerum ad cumque quidem dolores vel delectus eos laborum eum fugiat necessitatibus dolor facere.</p> */}
        </div>
        </div>

        <div className="footer_comp">

        <div className="blog_footer">
            <div className="like">
                
                {!alreadyliked && <FavoriteBorderIcon onClick={()=>{handleBlogLike(blog?._id)}}/>}      
            {alreadyliked && <FavoriteBorderIcon /* onClick={()=>{handleBlogUnLike()}} */ style={{color:"#ff8f8f"}}/>} 
            <small>{blog?.All_bloglikes?.length}</small>
            </div>

            <div className="comment">
                
                <ChatBubbleOutlineIcon onClick={()=>{setComment(!comment); setShowComment(!showComment)}}/>
                <small>{blog?.All_blogcomments?.length}</small>
                {comment && <div className="comm">
                <Input type="text" onChange = {(e)=> setInput(e.target.value)} style={{color:"white",}}/>
                 <Button style={{background:"#271637", color:"white", marginLeft:"10px",}} onClick={()=>{handleComment(blog?._id)}}>Post</Button>
                </div>
                }

                {showComment && <div className="showComments">
                  {blog?.All_blogcomments?.map((com)=>(<Comment com={com}/>))}
                </div> }
                
            </div>
            </div>
            <div className="delete_blog">
              {
                blog?.user?.uid===user?.uid && <DeleteOutlineIcon onClick={()=>{handleBlogDelete(blog?._id)}}/>
              }
                
                </div>
        </div>
    </div>
  )
}

export default Blogpost