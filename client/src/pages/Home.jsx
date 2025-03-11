import React from 'react'
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <div>
      <div className='flex flex-col gap-6 px-30 py-24 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Life Home Stock</h1>
        <p className='text-gray-500 text-sm sm:text-lg'>
        Simplify the Way Households Track Groceries and Essentials.
        </p>
      </div>
      <div className=' p-3 mb-7 bg-teal-200 dark:bg-slate-700'>
        <CallToAction />
      </div>

      {/* <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'> */}

    </div>
  )
}

export default Home
