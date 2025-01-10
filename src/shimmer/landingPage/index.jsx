import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function TruckAddCardSkeleton() {
  return (
    <div className='p-4 border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col bg-[#ffffff] '>
      <Skeleton
        height={150}
        className='shadow rounded-lg overflow-hidden border'
      />
      <div className='mt-8'>
        <div className=''>
          <div className='flex justify-between gap-2'>
            <Skeleton width={100} height={20} />
            <Skeleton width={50} height={20} />
          </div>
          <div className='flex justify-between'>
            <Skeleton width={100} height={20} count={2} />
            <Skeleton width={50} height={20} count={2}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TruckAddCardSkeleton;
