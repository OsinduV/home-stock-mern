import React, { useRef, useState } from 'react'
import {motion} from 'framer-motion';
import { useNavigate } from 'react-router';

const EmailVerificationPage = () => {

  const [code,setCode] = useState(["", "", "", "", "", ""]);
 const inputRefs=useRef([]);
  const navigate=useNavigate();


  return (
    <div className='w-full max-w-md overflow-hidden bg-gray-800 bg-opacity-50 shadow-xl backdrop-filter backdrop-blur-xl rounded-2xl'>
      <motion.div>

        
      </motion.div>
    </div>
  )
}

export default EmailVerificationPage
