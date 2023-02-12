import { Avatar } from '@mui/material';
import React from 'react';
import './jobpost.css';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import ReactHtmlParser from "html-react-parser";
import { useSelector } from 'react-redux';
import { selectUser } from '../../feature/userSlice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import ReactTimeAgo from "react-time-ago";




function LastSeen({ date }) {
    return (
      <div>
        <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
      </div>
    );
  }



function Jobpost({work}) {

    const user=useSelector(selectUser)

    const handleWorkDelete=async(id)=>{
        if(window.confirm('Are u sure you want to delete this post?')){
          const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }
        const body = {
            id:id,
           
        }
        await axios.post('/api/works/delete',body,config).then((res)=>{
          
            console.log(res.data)
            alert('data deleted');
            
            window.location.href = '/'
        }).catch((e)=>{
            console.log(e);
        })
        }
    
      }


  return (
    <div className='job_post'>
        <div className="post_head">
        <div className="user">
            <Avatar src={work?.user?.photo}/>
            <h5>{work?.user?.userName}</h5>
        </div>
        <div className="timestamp">
            <small><LastSeen date={work?.createdAt} /></small>
        </div>
        </div>

        <div className="body_content">
            <p>{ReactHtmlParser(work?.jobDescription)} </p>
        </div>

        <div className="post_footer">
            <div className="pay">
                <h5>Pay: Rs.{/* <CurrencyRupeeIcon /> */}{work?.pay}</h5>
            </div>
            <div className="contact_num">
                <CallIcon />
                <h5>: {work?.contactNum}</h5>
            </div>
            <div className="email">
                <EmailIcon />
                <h5>: {work?.email} </h5>
            </div>

            <div className="address">
                <h5>Address: {work?.address} </h5>
            </div>
            <div className="delete_work">
              {
                work?.user?.uid===user?.uid && <DeleteOutlineIcon onClick={()=>{handleWorkDelete(work?._id)}}/>
              }
                
            </div>
        </div>
    </div>
  )
}

export default Jobpost