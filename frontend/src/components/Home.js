import { AppBlockingSharp } from '@mui/icons-material';
import React from 'react';
import Blog from './home/Blog';
import Infodiv from './home/Infodiv';

function Home({pg, setPg}) {
  return (
    <div className='home'>
        <Infodiv />
        <div className="content">
            <Blog pg={pg} setPg={setPg}/>
        </div>
    </div>
  )
}

export default Home