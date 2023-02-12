import React, { useEffect, useState } from 'react';
//import {cat} from './Header.mjs';
import Quesbox from './Quesbox'
import './CSS/feed.css';
import Post from './Post';
import axios from 'axios';
import Like from './Like';
import { useSelector } from 'react-redux';
import { selectUser } from '../../feature/userSlice';

function Feed({cat, profile}) {
  const [posts, setPosts] = useState([]);
  const [ansposts, setAnsPosts]=useState([]);
  const user=useSelector(selectUser);

  useEffect(()=>{
    axios.get('/api/questions').then((res)=>{
      console.log(res.data);
      setPosts(res.data.reverse())
      //console.log('question',posts);
    }).catch((e)=>{
      console.log(e);
    });
  },[]);

  useEffect(()=>{
    axios.get('/api/answers').then((res)=>{
      console.log(res.data);
      setAnsPosts(res.data);
      //console.log(ansposts);
      //console.log((posts.filter((a)=>a._id===id)));
    }).catch((e)=>{
      console.log(e);
    });
  },[]);

//console.log('feed',ansposts)
 

  return (
    <div className='feed'>
        <Quesbox />
        

        {
          profile=="your questions" && (posts.filter((post)=> post?.user?.uid===user.uid)).map((post, index)=>(<Post key={index} post={post} anspost={ansposts} setpost={setPosts}/>))
        }
        {
          cat !== ""  && (posts.filter((post)=> post.questionCategory===cat)).map((post, index)=>(<Post key={index} post={post} anspost={ansposts}/>))
        }

        {
          cat == "" && profile=="" && posts.map((post, index)=>(<Post key={index} post={post} anspost={ansposts}/>))
        }
    
    
    </div>
  )
}

export default Feed