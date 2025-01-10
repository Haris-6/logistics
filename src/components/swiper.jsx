import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // library for creating a swiper/carousel UI.
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';// Styles specific to the navigation controls.

import TruckAddCard from './truckAddCard';
import InventoryAddCard from './inventoryAddCard';
import TruckAddCardSkeleton from '../shimmer/landingPage';

function SwiperComponent({ data, text, type, isLoading }) {
  return (
    <>
      <p className='text-2xl pl-8'>{text}</p>
      <div className=' p-8'>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1250: {
              slidesPerView: 5,
            },
          }}
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <TruckAddCardSkeleton />
                </SwiperSlide>
              ))
            : data.map((data, index) => (
                <SwiperSlide key={index}>
                  {type === 'truck' ? (
                    <TruckAddCard data={data} />
                  ) : (
                    <InventoryAddCard data={data} />
                  )}
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </>
  );
}

export default SwiperComponent;
