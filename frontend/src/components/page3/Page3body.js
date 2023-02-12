import React, { useEffect, useState } from 'react';
import './page3body.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Problempost from './Problempost';
import axios from 'axios';
import { Avatar, Button, Input } from '@mui/material';

function Page3body({pg, setPg}) {

  const [problems,setProblems]=useState([])
  const [pagetoShow1, setPageToShow1]=useState(true)
  const [pagetoShow2, setPageToShow2]=useState(false)
  const [newlist, setNewlist]=useState("");
  useEffect(()=>{
    axios.get('/api/problems').then((res)=>{
      console.log(res.data);
      setProblems(res.data.reverse())
      //console.log('question',posts);
    }).catch((e)=>{
      console.log(e);
    });
  },[]);



  const handlepage2 = ()=>{
     setNewlist([...problems].sort((a,b)=>
    a?.All_problemlikes?.length > b?.All_problemlikes?.length? -1:1))
    setPageToShow2(true);
    setPageToShow1(false);
  }


  return (
    <div className='page3body'>
           
        <div className="backward">
        <ArrowBackIosNewIcon onClick={()=>setPg('page2')}/>
      </div>

      <div className="problem_body">
        <div className="toggle" style={{marginTop:"100px"}}>
          <div className="all_problems">
            <Button onClick={()=>{setPageToShow1(true); setPageToShow2(false)}} style={{color:"white"}}>All Problems</Button>
          </div>
          <div className="most_supported">
            <Button onClick={handlepage2} style={{color:"white"}}>Most Supported Problems</Button>
          </div>
        </div>
        <div className="problem" style={{marginTop:"150px"}}>
          {
            pagetoShow1 && problems.map((problem, index)=>(<Problempost key={index} problem={problem} setPg={setPg}/>))
          }
          {
            pagetoShow2 && newlist.map((problem, index)=>(<Problempost key={index} problem={problem} setPg={setPg}/>))
          }

            
        </div>
        {/* <div className="problem">
            <Problempost />
        </div>
        <div className="problem">
            <Problempost />
        </div>
        <div className="problem">
            <Problempost />
        </div> */}
      </div>

        <div className="forward">
        <ArrowForwardIosIcon onClick={()=>setPg('page4')} style={{marginRight:"30px"}}/>
      </div>
        </div>
    
  )
}

export default Page3body