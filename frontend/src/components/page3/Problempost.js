import { Avatar, Button, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './problempost.css';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReactHtmlParser from "html-react-parser";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { selectUser } from '../../feature/userSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ReactTimeAgo from "react-time-ago";
import Comment from './Comment';




function LastSeen({ date }) {
    return (
      <div>
        <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
      </div>
    );
  }

function Problempost({problem, setPg}) {

    const user=useSelector(selectUser)
    const [comment, setComment]=useState(false)
    const [input, setInput]=useState("")
    const [showComment,setShowComment]=useState(false)

    const handleProblemDelete=async(id)=>{
        if(window.confirm('Are u sure you want to delete this post?')){
          const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }
        const body = {
            id:id,
           
        }
        await axios.post('/api/problems/delete',body,config).then((res)=>{
          
            console.log(res.data)
            alert('data deleted');
            
            window.location.href = '/'
        }).catch((e)=>{
            console.log(e);
        })
        }
    
      }


      const [alreadyliked, setAlreadyLiked]=useState(false);
      const [Id, setId]= useState("")
    
    
    useEffect(()=>{
      problem?.All_problemlikes?.map((p)=>{
        console.log(user?.uid)
        if(p?.user?.uid===user?.uid){
          setAlreadyLiked(true);
          setId(p?._id)
        }
       
      })
    },[])
    
    
      const handleProblemLike = async(id) =>{
    
        {
      
          const config = {
            headers: {
              "Content-Type":"application/json"
            }
          }
      
          const body = {
            //questionName: question,
            problemId: id,
            user:user
          }
        
          await axios.post('/api/problemlikes',body,config).then((res)=>{
            console.log(res.data);
           // setIsLike(!islike);
            alert(res.data.message);
            window.location.href ="/";
            setPg("page3");
          }).catch((e)=>{
            console.log(e);
            alert('error in adding like')
          })
        }
      }



      const handleComment= async(pId)=>{
        const config = {
          headers: {
            "Content-Type":"application/json"
          }
        }
    
        const body = {
          comment:input,
          problemId: pId,
          user:user,
        }
      
        await axios.post('/api/problemcomments',body,config).then((res)=>{
          console.log(res.data);
         // setIsLike(!islike);
          alert(res.data.message);
          window.location.href ="/";
        }).catch((e)=>{
          console.log(e);
          alert('error in adding comment')
        })
      }




  return (
    <div className='problem_post'>
        <div className="problem_head">
            <div className="user">
                <Avatar src={problem?.user?.photo}/>
                <h5>{problem?.user?.userName}</h5>
            </div>
            <div className="timestamp">
                <small><LastSeen date={problem?.createdAt} /></small>
            </div>
        </div>

        <div className="problem_body">
            <p>
                {ReactHtmlParser(problem?.problemContent)}
            </p>
        </div>
        
        <div className="footer_comp">

        <div className="problem_footer">
            <div className="vote">
            
            {!alreadyliked && <VolunteerActivismIcon onClick={()=>{handleProblemLike(problem?._id)}}/>}      
            {alreadyliked && <VolunteerActivismIcon /* onClick={()=>{handleBlogUnLike()}} */ style={{color:"#ff8f8f"}}/>} 
            <small>{problem?.All_problemlikes?.length}</small>
            </div>
            <div className="comment">
                <ChatBubbleOutlineIcon onClick={()=>{setComment(!comment); setShowComment(!showComment)}}/>
                <small>{problem?.All_problemcomments?.length}</small>
                {comment && <div className="comm">
                <Input type="text" onChange = {(e)=> setInput(e.target.value)} style={{color:"white",}}/>
                 <Button style={{background:"#271637", color:"white", marginLeft:"10px",}} onClick={()=>{handleComment(problem?._id)}}>Post</Button>
                </div>
                }

                {showComment && <div className="showComments">
                  {problem?.All_problemcomments?.map((com)=>(<Comment com={com}/>))}
                </div> }
                
            </div>
            </div>
            <div className="delete_work">
              {
                problem?.user?.uid===user?.uid && <DeleteOutlineIcon onClick={()=>{handleProblemDelete(problem?._id)}}/>
              }
                
            </div>
        
            </div>

    </div>
  )
}

export default Problempost