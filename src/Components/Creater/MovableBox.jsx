import React, { useState } from 'react';

const MovableBox = ({ children, style }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    const initialX = event.clientX;
    const initialY = event.clientY;

    

    const handleMouseMove = (event) => {
      const deltaX = event.clientX - initialX;
      const deltaY = event.clientY - initialY;

      setPosition({
        x: position.x + deltaX,
        y: position.y + deltaY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  };

 

  const transformStyle = {
    transform: `translate(${position.x}px, ${position.y}px)`,
  };


  return (
    <div className=' absolute '
      style={{ ...style, ...transformStyle }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

export default MovableBox;
