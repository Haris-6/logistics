import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function LoaderCardSkeleton() {
  return (
    <div className="bg-white p-4 rounded shadow-md flex w-[350px]">
    {/* Left side for image */}
    <div className="w-1/3">
      <Skeleton height={150} />
    </div>

    {/* Right side for properties */}
    <div className="w-2/3 ml-4">
      <div className="flex mb-4">
        {/* First property */}
        <div className="w-1/2 mr-2">
          <Skeleton height={20} />
        </div>
        {/* Second property */}
        <div className="w-1/2">
          <Skeleton height={20} />
        </div>
      </div>

      <div className="flex">
        {/* Third property */}
        <div className="w-1/2 mr-2">
          <Skeleton height={20} />
        </div>
        {/* Fourth property */}
        <div className="w-1/2">
          <Skeleton height={20} />
        </div>
      </div>
    </div>
  </div>
  );
}

export default LoaderCardSkeleton;
