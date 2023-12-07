import React from 'react';
import videoBg from "../../asset/bgw.mp4";


function Landing() {
  return (
    <div className='h-screen'>
      {/* Your first video element */}
      <video className='h-screen' autoPlay loop muted controls>
        {/* Specify the path to your video file in the "src" attribute */}
        <source src='https://www.youtube.com/watch?v=PJ14OFX0Cvk' type="video/mp4" />
        Your browser does not support the video tag.
      </video>

     

    </div>
  );
}

export default Landing;
