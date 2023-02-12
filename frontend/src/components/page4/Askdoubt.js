import React, { useState } from 'react'
/* import Header from './Header.js' */
/* import Sidebar from './Sidebar.js' */
import Feed from './Feed.js'
import './CSS/Askdoubt.css';
import { selectUser } from '../../feature/userSlice';

function Askdoubt() {
  
  const [cat, setCat]=useState("");
  const [search, setSearch]=useState("");
  const [profile, setProfile]=useState("");

  return (
    <div className='doubt'>
      
        {/* <Header x={cat} setX={setCat}  y={profile} setY={setProfile} /> */}
        
        <div className="askdoubt_contents">
          <div className="askdoubt_content">
           {/*  <Sidebar /> */}
            <Feed cat ={cat} profile={profile}/>

          </div>
        </div>
    </div>
  )
}

export default Askdoubt