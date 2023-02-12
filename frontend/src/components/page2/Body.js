import React, { useEffect, useState } from 'react';
import './body.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Jobpost from './Jobpost';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../feature/userSlice';
import { Button, Input } from '@mui/material';
import Modal from 'react-responsive-modal';
import { Close} from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


function Body({pg,setPg}) {

    const [works,setWorks]=useState([])
    const[isModalOpen, setisModalOpen] = useState(false);
    const close=(<Close />)

  useEffect(()=>{
    axios.get('/api/works').then((res)=>{
      console.log(res.data);
      setWorks(res.data.reverse())
      //console.log('question',posts);
    }).catch((e)=>{
      console.log(e);
    });
  },[]);
  
  const user=useSelector(selectUser)



  return (
    <div className='body'>
        
        <div className="backward">
        <ArrowBackIosNewIcon onClick={()=>setPg('home')}/>
      </div>
      {
        <div className="job_body">
          <div className="toggle">
            <p style={{color:"white"}}>No job suitable for you? Want a more professional one?</p>
            <Button onClick={()=>setisModalOpen(true)}>Know more</Button>
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

          }
        }}
        >
          <div className="popup" style={{paddingTop:"50px"}}>         
           <p>
          
          <span style={{display:"block",}}>
We have another option for you...
</span>
<span style={{fontWeight:"bold"}}>
Start with Freelancing✨
</span>
<span style={{display:"block", paddingBottom:"20px", paddingTop:"20px"}}>
Freelancing means working for different companies instead for a single company.
</span>
<span style={{display:"block",paddingBottom:"20px"}}>
Various platforms (professional jobs providing)available on internet  will help you explore freelancing.
</span>
<span style={{display:"block",paddingBottom:"20px"}}>
Go and explore opportunities that match your skill set.
</span>
<span style={{display:"block",paddingBottom:"20px"}}>
Go ahead and show your skills!
</span>
          </p>
          <div className="pic">
            <img src="https://img.freepik.com/premium-vector/speech-bubbles-with-question-marks_23-2148156157.jpg?w=2000" alt="" />
            <ArrowForwardIcon  style={{margin:"80px 20px"}}/>
            <img src="https://as1.ftcdn.net/v2/jpg/02/81/29/00/1000_F_281290000_M3slMejhXUAZ2MDsxYUAmfcD5Nct384G.jpg" alt="" />
            <ArrowForwardIcon style={{margin:"80px 10px"}}/>
            <img src="https://img.freepik.com/premium-vector/vector-illustration-internet-assistant-work-manager-remote-work_317038-107.jpg?w=2000" alt="" />
          </div>
          </div>

        </Modal>
           {/*  <div className="job_content"> */}
                
          {   works.map((work, index)=> (<Jobpost key={index} work={work}/>))
          }
                
                
            {/* </div> */}
            {/* <div className="job_content">
                <Jobpost />
            </div>
            <div className="job_content">
                <Jobpost />
            </div>
            <div className="job_content">
                <Jobpost />
            </div>
            <div className="job_content">
                <Jobpost />
            </div>
            <div className="job_content">
                <Jobpost />
            </div> */}
        </div>
}
        <div className="forward">
        <ArrowForwardIosIcon onClick={()=>setPg('page3')}/>
      </div>
        </div>
       
    
  )
}

export default Body