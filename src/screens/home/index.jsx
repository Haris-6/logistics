import React from 'react';
import HeaderCard from '../../components/headerCard';
import { DEVILERYPOINT, SOLUTIONS } from '../../utils/data';
import DeliveryCard from '../../components/deliveryCard';
import Footer from '../../components/footer';
import Header from '../../components/header';
import NavbarComponent from '../../components/navbar';
function Home() {
  return (
    <div>
      <Header />
      <div className='relative mt-4'>
        <img
          src='https://www.faymonville.com/thumbnails/100506-1600-500-Crop.jpg'
          alt='background'
          className='w-full h-[600px] object-cover'
        />
        <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center lg:w-1/2 p-4 bg-white bg-opacity-75 rounded-md'>
          "Loadify's has unlocked the power to reduce manual work by a cloud
          customer portal, which enables us to manage our shipping process all
          in one place by utilizing tools like EDI &
          e-docs."
        </p>
      </div>

      {/* text and loader image container */}
      <div className='grid md:grid-cols-2 grid-cols-1 pb-2'>
        <div className='bg-navy'>
          <div className='md:w-1/2 mx-auto text-white p-4'>
            <p className='text-center md:text-start text-3xl'>
              Full service Freight Solution Provider
            </p>
            <p className=' font-bold '>
              Loadify is a trusted third-party logistics provider focused on
              improving businesses' supply chains by having full visibility and
              control from their centralized partner portals. <br />
              <br />
              Through our technology-driven logistics solutions, industry
              expertise, and extensive carrier relationships across all modes of
              transportation, Loadify provides the solutions, savings and
              competitive advantage that enables shippers and carriers to
              respond to customer demands at the speed of business
            </p>
          </div>
        </div>
        <div>
          <img
            src='https://assets-global.website-files.com/61c6baed8b3d470519824903/620ecc83eb848551d15c699f_AdobeStock_302999689%201.jpg'
            alt='loader'
            className='w-full h-full object-cover'
          />
        </div>
      </div>

      {/* solutions */}
      <>
        <div className='text-center m-4'>
          <p className='text-2xl'>Our Solution</p>
          <p className='text-3xl'>
            <span className='text-[#b48484]'>Freight </span>Forward
          </p>
        </div>
        <div className='flex max-w-[80%]  mx-auto gap-6 m-4 md:flex-row flex-col justify-center'>
          {SOLUTIONS.map((data, i) => (
            <HeaderCard data={data} key={i} />
          ))}
        </div>
      </>

      {/* delivery point */}
      <div className=' bg-navy p-4'>
        <div className='relative'>
          <p className='text-center text-2xl text-white pt-4'>
            Dispatch Location
            <span className='relative inline-block'>
              <span className='absolute -top-7 -right-2 flex h-3 w-3'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
              </span>
            </span>
          </p>
        </div>

        <div className='flex m-4 gap-4 flex-wrap'>
          {DEVILERYPOINT.map((data, i) => (
            <DeliveryCard data={data} key={i} />
          ))}
        </div>
        <img
          src='https://assets-global.website-files.com/61c6baed8b3d470519824903/61cceef2961ff817df5b3f48_liness.svg'
          alt='image'
          className='mx-auto pt-4'
        />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
