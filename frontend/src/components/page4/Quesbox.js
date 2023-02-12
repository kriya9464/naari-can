import { Close, LineAxisOutlined, SettingsPhoneTwoTone } from '@mui/icons-material';
import { Avatar , Button, Input} from '@mui/material';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import CategoryIcon from '@mui/icons-material/Category';
import React, {useState} from 'react';
import Modal from 'react-responsive-modal';
import './CSS/quesbox.css';
import 'react-responsive-modal/styles.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../feature/userSlice';


function Quesbox() {
const[isModalOpen, setisModalOpen] = useState(false);
const [imgUrl, setimgUrl]=useState((""));
const [question,setQuestion] = useState("");
const user=useSelector(selectUser)
const [show,setShow]=useState(false);
const [more, setMore]=useState(false);
const [category, setCategory]=useState("Category");


const handleSubmit = async() =>{
  if(question !=="" && category!=="Category"){

    const config = {
      headers: {
        "Content-Type":"application/json"
      }
    }

    const body = {
      questionName: question,
      questionUrl: imgUrl,
      questionCategory: category,
      user:user,
    }
    await axios.post('/api/questions',body,config).then((res)=>{
      console.log(res.data);
      alert(res.data.message);
      window.location.href ="/";
    }).catch((e)=>{
      console.log(e);
      alert('error in adding question')
    })
  }
}

const close=(<Close />)

  return (
    <div className='quesbox'>
        <div className="user">
            <Avatar src={user?.photo}/>
        </div>
        <div className="quesasker">
            <p className="askques">Wanna share doubts? </p>
        </div>
        <div className="ques_btn">
        <Button className="quesbtn" onClick={()=> setisModalOpen(true)}>Ask Doubts</Button>
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
          <div className="modal_title">
            <h5>Ask Question</h5>
            <h5>link</h5>
          </div>
          <div className="modal_info">
            <Avatar className='avatar' src={user?.photoUrl}/>
            <div className="describecategory" style={{
              border:"1px solid gray",
              borderRadius:"40px",
              paddingTop:"0px",
              paddingBottom:"0px",
              paddingLeft:"5px",
              paddingRight:"5px",
            }}>
              <CategoryIcon />
              <p /* onMouseOver={()=>setShow(true)} onMouseOut={()=>setShow(false)} */ style={{cursor:"pointer",}} onClick={()=>setShow(!show)}>{category}</p>
              
              <ExpandMoreSharpIcon onClick={()=>setShow(!show)}/>

    
            </div>
       
          </div>

          {show && <ul className="categ" style={{
        listStyle:"none",
        marginTop:"0px",
        marginLeft:"85px",
        borderTop:"none",
        
       // borderBottom:"1px solid gray",
       }}>
                <li className="more" style={{borderBttom:"1px solid gray",display:"flex",
            flexDirection:"row",}}><Button onClick={()=>setMore(!more)}>Branch_Wise</Button></li>
          {more && <ul className="categ" style={{
            
        listStyle:"none",
        paddingTop:"0px",
        marginTop:"0px",
        marginLeft:"0px",
       // borderTop:"none",
        
       // borderBottom:"1px solid gray",
       }}>
          <li style={{borderBttom:"1px solid gray",}}><Button onClick={()=>{setCategory("AI/ML"); setShow(!show)}}>AI/ML</Button></li>
                <li style={{borderBttom:"1px solid grey" ,}}><Button onClick={()=>{setCategory("CSE"); setShow(!show)}}>CSE</Button></li>
                <li style={{borderBttom:"1px solid grey" ,}}><Button onClick={()=>{setCategory("ECE"); setShow(!show)}}>ECE</Button></li>
                
                <li style={{borderBttom:"1px solid grey", }}><Button onClick={()=>{setCategory("IT"); setShow(!show)}}>IT</Button></li>
                <li style={{borderBttom:"1px solid grey", }}><Button onClick={()=>{setCategory("Mae"); setShow(!show)}}>Mae</Button></li>
                 </ul>}      
               
          
                <li style={{borderBttom:"1px solid grey", }}><Button onClick={()=>{setCategory("Programming"); setShow(!show)}}>Programming</Button></li>
                <li style={{borderBttom:"1px solid grey", }}><Button onClick={()=>{setCategory("Development"); setShow(!show)}}>Development</Button></li>
                <li style={{borderBttom:"1px solid grey", }}><Button onClick={()=>{setCategory("DSA"); setShow(!show)}}>DSA</Button></li>
                <li style={{borderBttom:"1px solid grey", }}><Button onClick={()=>{setCategory("AR/VR"); setShow(!show)}}>AR/VR</Button></li>
                <li style={{borderBttom:"1px solid grey", }}><Button onClick={()=>{setCategory("Placement"); setShow(!show)}}>Placement</Button></li>
                <li style={{borderBttom:"1px solid grey", }}><Button onClick={()=>{setCategory("Others"); setShow(!show)}}>others</Button></li> 
               
              </ul>}


               

          <div className="modal_content">
            <Input onChange = {(e)=> setQuestion(e.target.value)}
            type='text' placeholder='share the question here' />
            <div style={{
              display:"flex",
              flexDirection:"column"
            }}>
              <input 
              value = {imgUrl}
              onChange = {(e) => setimgUrl(e.target.value)}
              style={{
                margin: "5px 0",
                border:"1px solid lightgray",
                padding:"10px",
                outlint:"2",
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
            <button onClick={handleSubmit}
            type='submit' className='add'>
              Add Question
            </button>
          </div>
        </Modal>
        </div>
    </div>
  )
}

export default Quesbox