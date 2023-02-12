import {Avatar, Button } from '@mui/material';
import { signInWithPopup, signOut } from 'firebase/auth';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../feature/userSlice';
import { auth, provider } from '../firebase';
import './CSS/header.css';

function Header({pg, setPg}) {

  const user = useSelector(selectUser)
  const dispatch =useDispatch();

  const handleLogout= ()=>{
    if(window.confirm('You want to logout?')){
      signOut(auth).then(()=>{
        dispatch(logout())
        console.log('logged out')
      })
    }
    
  }

  const handleSubmit = ()=>{
    signInWithPopup(auth, provider).then((result)=>{
      console.log(result);
    }).catch((err)=>{
      console.log(err);
    });
  };


  return (
    <div className='header'>
        <div className="logo">
            <img src="https://i.imgur.com/5ZUeIqo.png" alt="" />
            <h2 style={{fontStyle:"italic", color:"#271637", paddingLeft:"5px", paddingTop:"5px"}}>Naari-Can</h2>
        </div>
        <div className="navbar">
            <div className="pages">
            <Button style={{color:"white"}} onClick={()=>setPg('home')}>Home</Button>
            </div>
            <div className="pages">
            <Button style={{color:"white"}}
            onClick={()=>setPg('page2')}>work</Button>
            </div>
            <div className="pages">
            <Button style={{color:"white"}} onClick={()=>setPg('page3')}>raise your problems</Button>
            </div>
            <div className="pages">
            <Button style={{color:"white"}} onClick={()=>setPg('page4')}> queries</Button>
            </div>
            <div className="pages profile">
              
            { user? <Avatar onClick={handleLogout} src={user?.photo}/> :<Button onClick={handleSubmit}>
                login
              </Button>}
            </div>
            
        </div>
    </div>
  )
}

export default Header