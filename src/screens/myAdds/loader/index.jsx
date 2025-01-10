import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoaderCard from '../../../components/loaderCard';
import { useMyPersonalAddsQuery } from '../../../redux/api/truckadd'; //getting data of personal truck data
import LoaderCardSkeleton from '../../../shimmer/loaders';
import { PATH } from '../../../utils/path';

function LoaderPersonalAdds() {
  const { data, isLoading } = useMyPersonalAddsQuery();
  const navigate = useNavigate();
  const handleLoaderDetail = (id) => {
    navigate(`${PATH.SHOWLOADERDETAIL}/${id}`);
  };
  return (
    <div>
      <p className='text-center m-4 text-2xl'>Posted Adds</p>

      <div className='grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-items-center py-4 px-2 flex-wrap'>
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <LoaderCardSkeleton key={i} />
            ))
          : data?.data?.map((obj, i) => (
              <LoaderCard
                data={obj}
                key={i}
                onClick={() => handleLoaderDetail(obj?._id)}
              />
            ))}
      </div>
    </div>
  );
}

export default LoaderPersonalAdds;
