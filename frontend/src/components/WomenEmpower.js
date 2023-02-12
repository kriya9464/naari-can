import React, { useState } from 'react';
import Header from './Header';
import Page2 from './Page2';
import './CSS/WomenEmpower.css'
import Home from './Home';
import Page3 from './Page3';
import Askdoubt from './page4/Askdoubt.js'

function WomenEmpower() {

  const [page, setPage]=useState('home');

  return (
    <div>
        <div className="head">
        <Header pg={page} setPg={setPage}/>
        </div>
        { page==='home' && <Home pg={page} setPg={setPage}/>}
        {page==='page2' && <Page2 pg={page} setPg={setPage}/>}
        {page==='page3' && <Page3 pg={page} setPg={setPage}/>}
        {page==="page4" && <Askdoubt />}
        
    </div>
  )
}

export default WomenEmpower