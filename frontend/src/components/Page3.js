import React from 'react';
import Infodiv from './page3/Infodiv';
import Page3body from './page3/Page3body';

function Page3({pg, setPg}) {
  return (
    <div>
        <Infodiv />
        <Page3body pg={pg} setPg={setPg}/>
    </div>
  )
}

export default Page3