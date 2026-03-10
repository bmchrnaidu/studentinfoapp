import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-2">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-8 bg-white/20 rounded animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
