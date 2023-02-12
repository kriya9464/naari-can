import React, { useEffect, useState } from 'react';
import {Avatar, Button } from '@mui/material';
import './infodiv.css';
import 'react-responsive-modal/styles.css';
import 'react-quill/dist/quill.snow.css';
import Modal from 'react-responsive-modal';
import { Close} from '@mui/icons-material';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../../feature/userSlice';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';


function Infodiv() {

  const[isModalOpen, setisModalOpen] = useState(false);
const [imgUrl, setimgUrl]=useState((""));
const [post,setPost] = useState("");
const user=useSelector(selectUser);
const close=(<Close />)
const dispatch = useDispatch()

useEffect(()=>{
  onAuthStateChanged(auth, (authUser)=>{
    if(authUser){
      dispatch(login({
        userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
      }))
      console.log('AuthUSer',authUser)
    }
  })
},[dispatch]);


const handleUser= ()=>{
  if(user){
    setisModalOpen(true);
  }else{
    alert('Login to share your story')
  }
}


const handlePost= (value)=>{
  setPost(value)
}

const handleSubmit = async () =>{
  if(post !=="" && imgUrl !==""){

    const config = {
      headers:{
          "Content-Type": "application/json"
      }
  }
  const body = {
      blogContent:post,
      imgUrl:imgUrl,
       user:user,
     
  }
    await axios.post('/api/blogs',body,config).then((res)=>{
              
      console.log(res.data)
      alert('blog added successfully');
      setisModalOpen(false)
      window.location.href = '/'
  }).catch((e)=>{
      console.log(e);
  })
  }
}

  return (

    <div className="blog_container">
    <div className='infodiv'>
        <div className="content" style={{paddingTop:"100px"}}>
            <h2>"Women like you pave the way for others"
            Share your story and inspire others.
            
            <span style={{display:"block", textAlign:"center", paddingBottom:"10px"}}>

Write here...</span></h2>
        </div>
        <div className="btn">
            <Button style={{color:"white"}} onClick={handleUser}>write blog</Button>
            <Modal
        open = {isModalOpen}
        closeIcon = {close}
        onClose = {()=> setisModalOpen(false)}
        closeOnEsc
        centercloseOnOverlayClick={false}
        styles={{
          width:"70%",
          overlay: {
            height:"auto",

          }
        }}
        >
          <div className="post_content">

         
            <div className="blogpost">
                <ReactQuill   value={post}
                onChange={handlePost} placeholder="Enter your Answer" style={{height:"300px", paddingTop:"10px",color:"black"}}/>
            </div>
            <div className="image" style={{paddingTop:"50px", }}>
            <input 
              value = {imgUrl}
              onChange = {(e) => setimgUrl(e.target.value)}
              style={{
                margin: "5px 0",
                border:"1px solid lightgray",
                padding:"10px",
                outlint:"2",
                width:"100%",
              }}
              type="text" placeholder='optional:place a link of image if needed' />
              {
                imgUrl !=="" &&  <img 
                style={{
                  height:"40vh",
                  objectFit:"contain",
                }} src={imgUrl} alt='image' />
              }
            </div>
            </div>
            <div className="modal_btn">
            <button className='cancel' onClick={()=>setisModalOpen(false)}>
              Cancel
            </button>
            <button  onClick={handleSubmit} type='submit' className='add'>
              Add{"  "}Post
            </button>
            </div>
        </Modal>
        </div>

        <div className="carousel">
          <div className="imgs">
            <img src="https://www.shutterstock.com/image-vector/five-women-different-nationalities-cultures-600w-1708934329.jpg" alt="" />
          </div>
          <div className="imgs">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0u4rVyKAbE3XOkRpsGQdGp_so9Wd5ib_2-A&usqp=CAU" alt="" />
          </div>
          <div className="imgs">
            <img src="https://www.betterlyf.com/images/articles/wp-content/uploads/2021/02/woman-empowerment-feature-quotes.jpg" alt="" />
          </div>
          <div className="imgs">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGuMNiXqneSlzfQkWgu0OKHMTWLbGesy8fyg&usqp=CAU" alt="" />
          </div>
          <div className="imgs">
              <img src="https://bugssolutions.com/wp-content/uploads/2022/11/student-learning-56a7923a3df78cf772973ce5.jpg" alt="" />
          </div>

        </div>
    </div>
    </div>
  )
}

export default Infodiv