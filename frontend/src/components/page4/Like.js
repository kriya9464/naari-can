import React, { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../feature/userSlice';
import './CSS/like.css'
import Alllikes from './Alllikes';

function Like({id, _a, ansp}) {

const user = useSelector(selectUser);

const [posts, setPosts]=useState([]);
const [alreadyliked, setAlreadyLiked]=useState(false);


useEffect(()=>{
  ansp?.map((p)=>{
    if(p.user.uid===user.uid){
      setAlreadyLiked(true);
    }
   
  })
},[])

  
//console.log('check',ansp[0].user.uid);
/* ansp.alllikes.map((p)=>{
  if(p.uid===user.uid){
    alert('you have already liked the post')
    window.location.href ="/";
  }
}) */
//console.log(user.uid);
//console.log(ansp);
  const handleLike = async() =>{

    {
  
      const config = {
        headers: {
          "Content-Type":"application/json"
        }
      }
  
      const body = {
        //questionName: question,
        answerId: id,
        user:user
      }
    
      await axios.post('/api/likes',body,config).then((res)=>{
        console.log(res.data);
       // setIsLike(!islike);
        alert(res.data.message);
        window.location.href ="/";
      }).catch((e)=>{
        console.log(e);
        alert('error in adding like')
      })
    }
  }


/*   useEffect(()=>{
    axios.get('/api/answers').then((res)=>{
      console.log(res.data);
      setPosts(res.data.reverse())
      //console.log((posts.filter((a)=>a._id===id)));
    }).catch((e)=>{
      console.log(e);
    });
  },[]); */


  return (
    <div className="like_container">
         <div style={{
                        paddingRight:"10px",
                    }}
                    className="like">
            {!alreadyliked && <ThumbUpIcon onClick={handleLike} style={{paddingLeft:"5px", }}/>}      
            {alreadyliked && <ThumbUpIcon style={{color:"#ff8f8f"}}/>} 
</div>
                  {/*  <Alllikes anspost={anspost}/> */}
              {/*       </div>
                    <div style={{
                    paddingLeft:"10px",
                    paddingRight:"30px",
                   }}
                   className="dislike">
                   <ThumbDownIcon />
                   </div> */}
                    {/* <div className="rate">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    </div> */}
                 {/*  
                    <div style={{
                        paddingLeft:"30px",
                    }}
                    className="comment">
                    <ChatBubbleIcon />
                    </div> */}
                      {/* {(posts.filter((a)=>a._id===id))?.alllikes.length} Like(s) */}
                      {/* {anspost?.alllikes.length} */}
                      
    </div>
  )
}

export default Like