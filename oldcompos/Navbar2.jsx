import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsUpload } from 'react-icons/bs'




const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [guanzhu, setGuanzhu] = useState(true);
  const [loged, setLoged] = useState(false);

  const active = 'cursor-pointer border-b-2 border-pink-800 mt-1';
  const noActive = 'cursor-pointer text-gray-400';
  return (
    <div className='w-full flex bg-white'>
      <div className='flex-1 flex items-center justify-start bg-orange-400'>
        <div className='w-[130px] sm:w-60 md:w-60 bg-red-200'>
          <img src="dog-doc.jpg" alt="Dog-Doc" className='h-full w-full' />
        </div>
        <div className='hidden sm:block relative'>
          <form action="" className='flex items-center'>
            <input type="text" className='h-12 border-[2px] border-gray-300 rounded-full pl-3 pr-10 focus:outline-none focus:border-gray-500' placeholder='搜你想看' value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />
            <button className='absolute right-2 border-l-2 border-gray-300 text-gray-400 cursor-pointer hover:text-pink-800'>
              <AiOutlineSearch className='text-2xl' />
            </button>
          </form>
        </div>
      </div>
      <div className='md:w-40 flex-1 lg:w-80 bg-red-600'>
        {/* <div>NULL</div> */}
      </div>
      <div className='flex-1 flex justify-end items-center bg-sky-400'>
        <div className='bg-yellow-50 mx-2 sm:mx-5'>关注</div>
        <div className='bg-yellow-400 mx-2 sm:mx-5'>推荐</div>
        <div className='bg-yellow-600 mx-2 sm:mx-5'>发布</div>
        <div className='bg-yellow-100 ml-2 sm:ml-5'>登陆</div>
      </div>
    </div>
  )
}

export default Navbar
