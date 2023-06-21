import React from 'react';
import Tilt from 'react-parallax-tilt';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2">
        <div style={{ width: '100px', height: '100px', border: '1px solid black' }}>
          <div className="Tilt-inner"><h1>👀</h1></div>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;