import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../feature/userSlice'

function Comment({com}) {
    const user=useSelector(selectUser);
  return (
    <div>
        <small style={{paddingRight:"10px", marginTop:"15px", color:"black",}}>
            {com?.user?.userName}:
        </small>
        
        <small style={{paddingLeft:"10px",}}>
            {com?.comment}
        </small>
       
    </div>
  )
}

export default Comment