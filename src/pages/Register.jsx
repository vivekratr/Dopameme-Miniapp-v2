import RegisterModal from '@/components/RegisterModal';
import React from 'react'

const Register = () => {
     const logoImage =
       "https://cdn.builder.io/api/v1/image/assets/TEMP/e3ee107b406cfa4d85e602cf317db9b31c57c7ef1f7062354cd44e8deed63b1d?apiKey=b93734ecdcb94378af862d5b2ec71620&&apiKey=b93734ecdcb94378af862d5b2ec71620";

  return (
    <div className="flex flex-col items-center  bg-[url('https://i.imgur.com/n8gBxXu.png')] min-h-screen bg-cover bg-center">
      <img
        loading="lazy"
        src={logoImage}
        className="object-contain max-w-full aspect-[1.31] mb-[98px] shadow-[0px_4px_4px_rgba(255,255,255,0.01)] w-[117px] mx-auto"
          />
          
          <div className=' max-w-[100%]'>
              <RegisterModal/>
          </div>
    </div>
  );
}

export default Register
