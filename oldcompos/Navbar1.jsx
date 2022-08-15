import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsUpload } from 'react-icons/bs'




const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [guanzhu, setGuanzhu] = useState(true);
  const [loged,setLoged] = useState(false);

  const active = 'cursor-pointer border-b-2 border-pink-800 mt-1';
  const noActive = 'cursor-pointer text-gray-400';
  return (
    <div className='w-full flex justify-between items-center px-20 mb-3 py-1 bg-white shadow-md'>
      {/* logo */}
      <div className='ml-[-50px]'>
        <img src="dog-doc.jpg" alt="Dog-Doc" className='h-12 w-50' />
      </div>
      {/* search */}
      <div className='relative ml-[-100px]'>
        <form action="" className='flex items-center'>
          <input type="text" className='h-10 border-[2px] border-gray-300 rounded-full pl-3 pr-10 focus:outline-none focus:border-gray-500' placeholder='搜你想看' value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />
          <button className='absolute right-2 border-l-2 border-gray-300 text-gray-400 cursor-pointer hover:text-pink-800'>
            <AiOutlineSearch className='text-2xl' />
          </button>
        </form>
      </div>
      {/* 关注|推荐 */}
      <div className='flex justify-center items-center'>
        <div className={guanzhu?active:noActive} onClick={()=>{setGuanzhu(true)}}>关注</div>
        <div className='text-xl text-gray-400 mx-2'>|</div>
        <div className={guanzhu?noActive:active} onClick={()=>{setGuanzhu(false)}}>推荐</div>
      </div>
      {/* upload */}
      <div>
        <div className='flex items-center justify-center h-8 px-2 border-2 border-gray-400 cursor-pointer rounded-lg hover:text-pink-800 hover:border-pink-800 hover:bg-red-400'>
          <BsUpload className='text-lg'/>
          <span className='ml-2'>投稿</span>
        </div>
      </div>
      {/* 登陆/注册 */}
      <div>
        {loged?(
          <div>
            
          </div>
        ):(
          <div className='flex items-center justify-center h-8 px-3 border-2 border-gray-400 cursor-pointer rounded-lg hover:text-pink-800 hover:border-pink-800 hover:bg-red-400'>
            <div className=''>登录</div>
          </div>
        )}
        
      </div>
    </div>
  )
}

export default Navbar
