import React from 'react';
import Navbar from '../../components/navbar';
import Map from '../../assets/images/map.png';
import hom from '../../assets/images/home.png'
import { INVENTORYADD, TRUCKADD } from '../../utils/data';
import Footer from '../../components/footer';
import Button from '../../components/button';
import SwiperComponent from '../../components/swiper';
import { useGetAllLoadersQuery } from '../../redux/api/truckadd';  //get all truck data in form of array
import { useGetAllInventoryQuery } from '../../redux/api/inventoryAdd'; //get all inventory data
import { Link } from 'react-router-dom';
import { PATH } from '../../utils/path';

function Home() {
  const { data, isLoading } = useGetAllLoadersQuery();
  const { data: inventoryData } = useGetAllInventoryQuery();
  return (
    <>
      <Navbar />

      {/* map and text container */}

      <div className='flex justify-center p-4 gap-11 flex-wrap'>
        <img src={Map} alt='image' className='animate-zoomIn ' />
        {/* <img src={hom}  alt='image' className='animate-zoomIn w-[35%] w-[30%]  ms-14' /> */}
        <div className='flex flex-col items-center justify-center  grow'>
          <div className='text-center'>
            <p className='text-xl text-[#b48484]'>A SMARTER WAY TO LOGISTICS</p>
            <p className='sm:text-4xl text-2xl'>
              <span className='text-[#F5DEB3]'>
                Your Digital Freight Solution{' '}
              </span>
              <br />
              <span className='text-[#F5DEB3]'> Partner </span>for Over-the-road{' '}
              <br /> <span className='text-center'> Transportation</span>
            </p>
            <div className='flex gap-3 justify-center'>
              <Link to={PATH.INVENTORYADD}>
                <Button>Find Truck</Button>
              </Link>
              <Link to={PATH.LOADERADDS}>
                <Button>Find Inventory</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SwiperComponent
        text='Truck Adds'
        type='truck'
        data={data?.data || []}
        isLoading={isLoading}
      />

      <SwiperComponent
        text='Inventory Ads'
        type='inventory'
        data={inventoryData?.data || []}
        isLoading={isLoading}
      />

      <Footer />
    </>
  );
}

export default Home;
