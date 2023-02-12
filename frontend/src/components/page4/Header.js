import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Feed from './Feed';
import { Search, SettingsPhoneTwoTone } from '@mui/icons-material';
import { Avatar, Button} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import './CSS/header.css';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../feature/userSlice';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Header({x, setX, y, setY}) {

  const [show, setShow]=useState(false);
  const [more, setMore]=useState(false);
  const [search, setSearch]=useState("");
  const [showProfile, setShowProfile]=useState(false);
  //const [cat, setCat]=useState("");
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const handleLogout = () => {
        if (window.confirm("Are you sure to logout ?")) {
          signOut(auth)
            .then(() => {
              dispatch(logout());
              console.log("Logged out");
            })
            .catch(() => {
              console.log("error in logout");
            });
        }
      };

  return (

    <div className='header'>
        <div className='header_content'>
            <div className="header_logo">
                <img src="" alt="logo" /></div>
            {/*     <div className="header_search">
                    <Search />
                    <input type="text" placeholder='Search questions' className="search" style={{color:"black"}} onClick={(e)=>setY(e.target.value)}/>
                    </div> */}
                <div className="header_icons">
                <div className="header_icon" /* style={{marginleft:"50px",}} */><HomeIcon onClick={()=>{setX(""); setY("")}}/></div>
                <div className="header_icon" style={{
                  /* display:"flex",
                  flexDirection:"column", */
                  /* marginLeft:"40px", */
                }}>
                    <CategoryIcon onClick={()=>setShow(!show)}/>
                    
        
                </div>
                {/* <div className="header_icon">
                    <NotificationsSharpIcon />
                </div> */}
               {/*
                <div className="header_icons"></div> */}
                </div>
             
                    {/* <div className="header_quesbtn"><Button className="quesbtn"></Button>Add Questions</div> */}
                    <div className="header_profile" onClick={()=>setShowProfile(!showProfile)/* handleLogout */}>
                        <Avatar src={user?.photo}/>
                    </div>
         
                </div>




              {show && <div className="category" style={{
        listStyle:"none",
        marginTop:"1px",
        border:"none",
       // borderTop:"none",
        
       // borderBottom:"1px solid gray",
       }}>
        <div className="categorybar">
               <Button style={{color:"white"}} onClick={()=>setMore(!more)}>Branch Wise</Button>
                      {more && <ul className="branch" style={{
            
        listStyle:"none",
        paddingTop:"0px",
        marginTop:"0px",
        marginLeft:"0px",
       // borderTop:"none",
        
       // borderBottom:"1px solid gray",
       }}>
        
          <li style={{borderBttom:"1px solid gray",}}><Button style={{color:"white"}} onClick={()=>{setX("AI/ML"); setShow(!show)}}>AI/ML</Button></li>
                <li style={{borderBttom:"1px solid grey" ,}}><Button style={{color:"white"}} onClick={()=>{setX("CSE"); setShow(!show)}}>CSE</Button></li>
                <li style={{borderBttom:"1px solid grey" ,}}><Button style={{color:"white"}} onClick={()=>{setX("ECE"); setShow(!show)}}>ECE</Button></li>
                
                <li style={{borderBttom:"1px solid grey", }}><Button style={{color:"white"}} onClick={()=>{setX("IT"); setShow(!show)}}>IT</Button></li>
                <li style={{borderBttom:"1px solid grey", }}><Button style={{color:"white"}} onClick={()=>{setX("Mae"); setShow(!show)}}>Mae</Button></li>
                 </ul>}     
               
          
                <Button style={{color:"white", paddingLeft:"2rem",
    paddingRight:"2rem",}} onClick={()=>{setX("Programming"); setShow(!show)}}>Programming</Button>
                <Button style={{color:"white",paddingLeft:"2rem",
    paddingRight:"2rem",}} onClick={()=>{setX("Development"); setShow(!show)}}>Development</Button>
                <Button style={{color:"white", paddingLeft:"2rem",
    paddingRight:"2rem",}} onClick={()=>{setX("DSA"); setShow(!show)}}>DSA</Button>
                <Button style={{color:"white", paddingLeft:"2rem",
    paddingRight:"2rem",}} onClick={()=>{setX("AR/VR"); setShow(!show)}}>AR/VR</Button>
                <Button style={{color:"white", paddingLeft:"2rem",
    paddingRight:"2rem",}} onClick={()=>{setX("Placement"); setShow(!show)}}>Placement</Button>
                <Button style={{color:"white", paddingLeft:"2rem",
    paddingRight:"2rem",}} onClick={()=>{setX("Others"); setShow(!show)}}>others</Button>

                </div>
               
              </div>}


              {showProfile && <div style={{
                marginLeft:"82%",
                marginTop:"5px",
               
                
                
              }} >
                <div className="profilemanager">
                <Button onClick={()=>{setY("your questions"); setShowProfile(!showProfile)}}>your questions</Button>
                {/* <Button onClick={()=>setY("your answers")}>your answers</Button> */}
                <Button onClick={handleLogout}>logout</Button>
                </div>
                </div>}



            </div>
        
    
  )
}

export default Header;
