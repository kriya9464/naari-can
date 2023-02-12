import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Alllikes({ ap}) {
   // const [aposts, setAposts]=useState([]);


    console.log(ap.alllikes.length);

  return (
    <div>
       {/*  <p>{ans._id}</p> */}
        {/* <button onClick={clickme}>show likes</button> */}
<small style={{marginTop:"50px"}}>{ap?.alllikes?.length} Like(s)</small>
    </div>
  )
}

export default Alllikes