import React from 'react';
import weatherbg from '../assests/images/weatherbg.jpeg';

function GetStarted() {
  return (
    <div className='container-fluid ' style={{padding:'0px',height:'100%',width:'100%'}}>
 <div className='row'> 
 <div  className='col-12 col-sm-6'>
        <img src={weatherbg}/>
        

      </div>

      <div  className='col-12 col-sm-6'>
        <h1>hii</h1>

      </div>

 </div>
     
    </div>
  );
}

export default GetStarted;
