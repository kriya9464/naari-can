import AddIcon from '@mui/icons-material/Add';
import { Avatar, Button } from '@mui/material';
import React, {useEffect, useState} from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import StarIcon from '@mui/icons-material/Star';
import Modal from 'react-responsive-modal';
/* import './CSS/quesbox.css'; */
import './CSS/post.css';
import { Close, Delete } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactTimeAgo from "react-time-ago";
import axios from 'axios';
import ReactHtmlParser from "html-react-parser";
import { useSelector } from 'react-redux';
import { selectUser } from '../../feature/userSlice';
import Like from './Like';
import Alllikes from './Alllikes';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteAns from './Delete';

function LastSeen({ date }) {
    return (
      <div>
        <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
      </div>
    );
  }


function Post({post, anspost, setpost}) {
    const[isModalOpen, setisModalOpen] = useState(false);
    const [answer,setAnswer] = useState("");
    const [ans, setAns]=useState("")
    const close=(<Close />);
    const user=useSelector(selectUser);
    const [show, setShow]=useState(false);
    const [islike, setIsLike]=useState(false);
    const [ansposts, setAnsPosts]=useState([]);

   //console.log(post);


    const handleQuill =(value)=>{
        setAns(value)
    }
  
    const handleSubmit=async()=>{
        if(post?._id && ans!==""){
            const config = {
                headers:{
                    "Content-Type": "application/json"
                }
            }
            const body = {
                answer:ans,
                questionId:post?._id,
                 user:user,
               
            }
            await axios.post('/api/answers',body,config).then((res)=>{
              
                console.log(res.data)
                alert('Answer added successfully');
                setisModalOpen(false)
                window.location.href = '/'
            }).catch((e)=>{
                console.log(e);
            })
        }
    }

//console.log('check',post?.user);

const handledelete=async(id)=>{
alert(id);

const config = {
    headers:{
        "Content-Type": "application/json"
    }
}
const body = {
    id:id,
   
}
await axios.post('/api/questions/delete',body,config).then((res)=>{
  
    console.log(res.data)
    alert('data deleted');
    
    window.location.href = '/'
}).catch((e)=>{
    console.log(e);
})



}


  return (
    <div className='post'>
        <div className="post_info">
            <Avatar src={post?.user?.photo}/>
            <h4>{post?.user?.userName} </h4>
            <span><small><LastSeen date={post?.createdAt} /></small></span>
        </div>
        <div className="post_body">
            <p>{post?.questionName}</p>
            { post?.questionUrl !=="" &&
            <img style={{
                width:"60%",
                height:"60%",
                margin:"auto",
            }}
            src={post.questionUrl}  />
           }   
            
        </div>
        <div className="postfooter">
         
                <Button onClick={()=>setShow(!show)}>{post?.allAnswers.length} Answer(s)</Button>
                <div className="answericon">
                <AddIcon onClick={()=> {setisModalOpen(true);
                console.log(post?._id)}}/>
                <Modal
        open = {isModalOpen}
        closeIcon = {close}
        onClose = {()=> setisModalOpen(false)}
        closeOnEsc
        centercloseOnOverlayClick={false}
        styles={{
          overlay: {
            height:"auto",
          }
        }}
        >
            <div className="modal_quesn">
                <h1>{post?.questionName}</h1>
                <p>asked by {" "}</p><span>{user?.userName}</span>{" "}{new Date(post?.createdAt).toLocaleString()}
            </div>
            <div className="ans">
                <ReactQuill  value={ans}
                onChange={handleQuill}placeholder="Enter your Answer"/>
            </div>
            <div className="modal_btn">
            <button className='cancel' onClick={()=>setisModalOpen(false)}>
              Cancel
            </button>
            <button onClick={handleSubmit}type='submit' className='add'>
              Add{"  "}Answer
            </button>
            </div>
        </Modal>
                </div>
                
           {post?.user?.uid==user?.uid && <DeleteIcon onClick={()=>handledelete(post?._id)} style={{marginLeft:"50px"}}/>} 
        </div>
        <div style={{
            margin:"5px 0px 0px 0px",
            padding: "5px 0px 0 20px",
            borderTop: "1px solid lightgray",
        }}
            className="post_answer">

{show && post?.allAnswers?.map((_a)=>(
    <>
     <div style={{
                display:"flex",
                flexDirection:"column",
                width:"100%",
                padding:"10px 5px",
                /* borderTop: "1px solid lightgray", */
            }}
            className="answer_container">
                <div style={{
                display:"flex",
                alignItems:"center",
                marginBottom: "10px",
                fontSize: "12px",
                fontWeight:"600",
                color:"#888",
            }}
                className="post_answered">
                    <Avatar src={_a?.user?.photo}/>
                    <div 
                  
                    className="post_answer_info">
                        <p>{_a?.user?.userName}</p>
                        
                        <span><LastSeen date={
                            _a?.createdAt} /></span>
                    </div>
                </div>
                <div style={{
                        margin: "0 10px",
                        marginLeft:"3rem",
                    }}
                className="answer_block">
                    <p style={{marginBottom:"20px"}}>{ReactHtmlParser(_a?.answer)}</p>
                </div>
                <div style={{
                    display:"flex",
                    flexDirection:"row",
                }}
                className="answerfooter">
                  {/* <button onClick={nolikes}>check likes</button> */}
                  
             {   (anspost.filter((ansp)=>(ansp?._id===_a?._id))).map((ansp)=>(<Like id={_a?._id}  ansp={ansp.alllikes} />))}

             {(anspost.filter((p)=>(p?._id===_a?._id))).map((ap)=>(<Alllikes ap={ap} />))}

             {_a?.user?.uid===user?.uid && <DeleteAns id={_a?._id}/>}
                

                {/*  {_a?.alllikes.length} */}
                    {/* <div style={{
                        paddingRight:"10px",
                    }}
                    className="like">
                   
                    </div>
                    <div style={{
                    paddingLeft:"10px",
                    paddingRight:"30px",
                   }}
                   className="dislike">
                   <ThumbDownIcon />
                   </div>
                    {/* <div className="rate">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    </div> */}
                  
                    
                </div>
            </div>
    
    </>
))}


        </div>
    </div>
  )
}

export default Post