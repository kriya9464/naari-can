import { Button, Input } from '@mui/material';
import React, { useState } from 'react';
import './infodiv2.css';
import Modal from 'react-responsive-modal';
import { Close} from '@mui/icons-material';
import 'react-responsive-modal/styles.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../feature/userSlice';

function Infodiv() {
    const [description,setDescript]=useState("");
    const[isModalOpen, setisModalOpen] = useState(false);
    const [pay, setPay]=useState("");
    const [address, setAddress]=useState("");
    const [num, setNum]=useState("");
    const [email, setEmail]=useState("");
    const close=(<Close />)
    const user=useSelector(selectUser);


    const handleUser= ()=>{
      if(user){
        setisModalOpen(true);
      }else{
        alert('Login to post the work')
      }
    }

    const handleWsubmit = async () =>{
      if(description !=="" && pay !=="" && address !=="" && num!=="" && email!==""){
    
        const config = {
          headers:{
              "Content-Type": "application/json"
          }
      }
      const body = {
          jobDescription:description,
          pay:pay,
          address:address,
          contactNum:num,
          email:email,
           user:user,
         
      }
        await axios.post('/api/works',body,config).then((res)=>{
                  
          console.log(res.data)
          alert('post added successfully');
          setisModalOpen(false)
          window.location.href = '/'
      }).catch((e)=>{
          console.log(e);
      })
      }
    }


  return (
    <div className="work_container">
    <div className='infodiv'>
        <div className="content">
            <h2 style={{padding:"15px"}}>"Everyone shines, when given the right lighting"
<span style={{display:"block"}}>Explore and find a job that fits your expertise. </span>
Earn , learn and shine
Explore...!!</h2>
        </div>
        <div className="btn">
            <Button onClick={handleUser} style={{color:"white"}}>post job</Button>
        </div>
        <div className="modal">

        
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
            <div className="descript" style={{paddingTop:"50px"}}>
                <h4>* Job Description</h4>
            <Input style={{width:"100%",marginTop:"10px",}} onChange = {(e)=> setDescript(e.target.value)}
            type='text' placeholder='Describe the job...' />
            </div>
            <div className="pay" style={{paddingTop:"50px"}}>
                <h4>* Pay</h4>
            <Input style={{width:"100%",marginTop:"10px",}} onChange = {(e)=> setPay(e.target.value)}
            type='text' placeholder='Pay offered for this work' />
            </div>
            <div className="descript" style={{paddingTop:"50px"}}>
                <h4>* Details</h4>
            <Input style={{width:"100%",marginTop:"10px",}} onChange = {(e)=> setAddress(e.target.value)}
            type='text' placeholder='Address of the workplace' />
            <Input style={{width:"100%",marginTop:"10px",}} onChange = {(e)=> setNum(e.target.value)}
            type='text' placeholder='Contact Number' />
            <Input style={{width:"100%",marginTop:"10px",}} onChange = {(e)=> setEmail(e.target.value)}
            type='text' placeholder='Email address' />
            </div>
            <div className="modal_btn">
            <button className='cancel' onClick={()=>setisModalOpen(false)}>
              Cancel
            </button>
            <button onClick={handleWsubmit}type='submit' className='add'>
              Submit
            </button>
            </div>

        </Modal>
        </div>

        <div className="carousel2">
          <div className="imgs2">
            <img src="https://s3.amazonaws.com/ellevate-app-uploads-production/blog_posts/6173/featured_image/large/ThinkstockPhotos-178515203.jpg?1429566222" alt="" />
          </div>
          <div className="imgs2">
              <img src="https://i.pinimg.com/originals/a0/a1/fc/a0a1fc9fa7f35acd3a1381ed03904e43.jpg" alt="" />
          </div>
          <div className="imgs2">
            <img src="https://us.123rf.com/450wm/denayunebgt/denayunebgt2107/denayunebgt210700011/denayunebgt210700011.jpg?ver=6" alt="" />
          </div>
          <div className="imgs2">
              <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y5MDEtYmFubmVyLTA3LWtuZWNvejhlLmpwZw.jpg" alt="" />
          </div>
          <div className="imgs2">
              <img src="http://www.psuconnect.in/sdsdsd/NTPC_jobs.jpg" alt="" />
          </div>
          </div>
        </div>
    </div>
  )
}

export default Infodiv