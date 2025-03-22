import { Button } from 'flowbite-react';
import { Link } from 'react-router';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to Manage Your Groceries And Essentials
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout Our Features
            </p>
            <Link to='/receipt-scanning'>
            <Button gradientDuoTone='purpleToBlue' className='w-full rounded-tl-xl rounded-bl-none'>
                    Scan Grocery List
            </Button>
            </Link>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none my-2'>
                <a href="#" target='_blank' rel='noopener noreferrer'>
                    Manually Add Inventories
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
        <img 
           src="https://images.unsplash.com/photo-1581515286348-98549702050f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Organized home storage"
            className="w-full h-auto rounded-lg shadow-md"
        />


        </div>
    </div>
  )
}