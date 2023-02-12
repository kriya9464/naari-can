import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function Delete({id}) {

    const handleansDelete=async()=>{
        alert(id);

const config = {
    headers:{
        "Content-Type": "application/json"
    }
}
const body = {
    id:id,
   
}
await axios.post('/api/answers/delete',body,config).then((res)=>{
  
    console.log(res.data)
    alert('data deleted');
 /*    setTimeout(()=>{
        window.location.href = '/'
    }, 2000) */
    window.location.href = '/'
}).catch((e)=>{
    console.log(e);
})
    }

  return (
    <div><DeleteIcon onClick={handleansDelete} style={{marginLeft:"270px"}}/></div>
  )
}

export default Delete