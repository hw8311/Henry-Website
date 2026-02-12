import React from 'react';

export const BlueprintGrid = ({ className = "", opacity = 0.03 }) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(56, 189, 248, ${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56, 189, 248, ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}
    />
  );
};

export default BlueprintGrid;
