import { Button } from '@mui/material';
import React, { useState } from 'react';
import './infodiv3.css';
import 'react-responsive-modal/styles.css';
import 'react-quill/dist/quill.snow.css';
import Modal from 'react-responsive-modal';
import { Close} from '@mui/icons-material';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../feature/userSlice';

function Infodiv() {

    const[isModalOpen, setisModalOpen] = useState(false);
    const [problems,setProblems]=useState("");
    const close=(<Close />)
    const user=useSelector(selectUser)


    const handleUser= ()=>{
      if(user){
        setisModalOpen(true);
      }else{
        alert('Login to post your problem')
      }
    }


    const handleQuill= (value)=>{
      setProblems(value)
    }

    const handlePSubmit = async () =>{
      if(problems !==""){
    
        const config = {
          headers:{
              "Content-Type": "application/json"
          }
      }
      const body = {
          problemContent:problems,
          
           user:user,
         
      }
        await axios.post('/api/problems',body,config).then((res)=>{
                  
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
    <div className="problem_container" style={{margin:"auto"}}>
    <div className='infodiv'>
    <div className="content">
        <h2 style={{padding:"15px"}}>Your problem must have been faced by many other<span style={{display:"block"}}>  women as well ,but you can make a difference .</span>
Share your problem here...</h2>
    </div>
    <div className="btn">
        <Button onClick={handleUser} style={{color:"white"}}>Raise problems</Button>
    </div>
    <Modal
        open = {isModalOpen}
        closeIcon = {close}
        onClose = {()=> setisModalOpen(false)}
        closeOnEsc
        centercloseOnOverlayClick={false}
        styles={{
          
          overlay: {
            height:"auto",

          },
          height:"400px",
        }}
        >
          <div className="post_content">

         
            <div className="blogpost">
                <ReactQuill   value={problems}
                onChange={handleQuill} placeholder="Share your problem..." style={{height:"300px", paddingBottom:"50px", color:"black",}}/>
            </div>
           
            </div>
            <div className="modal_btn">
            <button className='cancel' onClick={()=>setisModalOpen(false)}>
              Cancel
            </button>
            <button  onClick={handlePSubmit} type='submit' className='add'>
              Submit
            </button>
            </div>
        </Modal>

        <div className="carousel3">
          <div className="imgs3">
            <img src="https://www.startupstories.in/wp-content/uploads/2018/05/Start-up-stories.jpg" alt="" />
          </div>
          <div className="imgs3">
              <img src="https://qph.cf2.quoracdn.net/main-qimg-8bf7037f5b60be1dd74dd42dd1514936.webp" alt="" />
          </div>
          <div className="imgs3">
            <img src="https://icdn.isrgrajan.com/in/2016/03/gender-inequality-a-major-challenge-in-India.jpg" alt="" />
          </div>
          <div className="imgs3">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXTcWGyhs7bEX_a5-sBm2f7rmyHEpir3FyTg&usqp=CAU" alt="" />
          </div>
          <div className="imgs3">
              <img src="https://cdn1.careeraddict.com/uploads/article/60561/small-workplace-handle-false-accusations.jpg" alt="" />
          </div>

        </div>
        </div>
</div>
  )
}

export default Infodiv