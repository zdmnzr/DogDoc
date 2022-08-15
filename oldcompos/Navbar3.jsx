import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsUpload } from 'react-icons/bs'
import { AiOutlinePlusCircle } from 'react-icons/ai'





const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [guanzhu, setGuanzhu] = useState(true);
  const [loged, setLoged] = useState(false);

  const active = 'cursor-pointer border-b-2 border-pink-800 mt-1';
  const noActive = 'cursor-pointer text-gray-400';
  return (
    <div className='w-full flex justify-between bg-white h-[60px] border-b-[2px] border-gray-200'>
      {/* logo */}
      <div className='w-1/3 cursor-pointer flex items-center sm:w-1/4'>
        <img src="dog-doc.jpg" alt="Dog-Doc" className='w-11/12 max-h-[60px] sm:max-w-[190px]' />
      </div>
      {/* 推荐/关注 */}
      <div className='flex justify-center items-center cursor-pointer'>
        <div className={guanzhu ? active : noActive} onClick={() => { setGuanzhu(true) }}>关注</div>
        <div className='text-xl text-gray-400 mx-2'>|</div>
        <div className={guanzhu ? noActive : active} onClick={() => { setGuanzhu(false) }}>推荐</div>
      </div>
      {/* 发布和登陆 */}
      <div className='w-1/3  flex items-center justify-end pr-[10px] sm:w-1/4'>
        <div>
          <AiOutlinePlusCircle className='text-[23px] mr-[10px] cursor-pointer lg:hidden'/>
          <div className='hidden cursor-pointer lg:block lg:flex bg-primary px-[9px] py-[4px] rounded-md mr-[20px]'>
            <AiOutlinePlusCircle className='text-[23px]'/>
            <div className='ml-1'>投稿</div>
          </div>
        </div>
        <div className='bg-primary px-[9px] py-[2px] rounded-md cursor-pointer lg:px-[18px] lg:py-[5px] lg:text-[18px]'>登录</div>
      </div>
    </div>
  )
}

export default Navbar
