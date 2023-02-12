import React from 'react';
import Body from './page2/Body.js';
import Infodiv from './page2/Infodiv.js';

function Page2({pg,setPg}) {
  return (
    <div>
        <div >
            <Infodiv />
        </div>
        <div className="body">
            <Body pg={pg} setPg={setPg} />
        </div>
    </div>
  )
}

export default Page2