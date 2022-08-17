import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import useAuthStore from '../store/authStore'

import { AiOutlineSearch } from 'react-icons/ai'
import { AiFillSetting } from 'react-icons/ai'
import { BsPencilSquare } from 'react-icons/bs'
import { HiSun } from 'react-icons/hi'
import { BiUser } from 'react-icons/bi'
import { BASE_URL } from '../utils'
import axios from 'axios'


const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [guanzhu, setGuanzhu] = useState(true);
  const [loged, setLoged] = useState(false);
  const { userProfile } = useAuthStore();
  const [user,setUser] = useState(null);

  useEffect(()=>{
    fetchUser();
    // setUser(userProfile)
  },[userProfile])

  const fetchUser =async()=> {
    const _id = userProfile?._id
    const {data} = await axios.get(`${BASE_URL}/api/userById/${_id}`)
    // console.log(data,'user')
    setUser(data[0]);
  }
  console.log(user,userProfile,123)


  const clickHead = () => { 
    // if(JSON.stringify(user) == '{}' || user==null){
    //   Router.push(`/login`)
    // }else{
    //   Router.push(`/user/${user._id}`)
    // }
    if(user?._id){
      Router.push(`/user/${user._id}`)
    }else{
      Router.push(`/login`)
    }
  }
  const upload=()=>{
    if(user){
      Router.push(`/upload/${user._id}`)
    }
  }

  return (
    <div className='w-full px-2 h-[55px] flex justify-between items-center border-b-[1px] border-gray-300 bg-white
      md:mb-[10p x] 
      lg:px-4 lg:h-[66px] lg:border-b-[2px]
      xl:w-[1280px]'>
      {/* logo */}
      <div className='w-1/2 flex justify-start items-center'>
        {/* logo */}
        <div className='w-2/3 md:w-1/2 lg:w-5/12 xl:w-5/12' onClick={()=>{Router.push(`/`)}}>
          <img src="/dd.jpg" alt="Dog-Doc" className='w-full md:max-h-[54px] lg:max-h-[65px]' />
        </div>
      </div>
      {/* search */}
      <div className='hidden md:block relative '>
        <form action="" className='flex items-center'>
          <input type="text" className='h-8 lg:h-10 border-[2px] border-gray-300 rounded-full pl-3 pr-10 focus:outline-none focus:border-gray-500 text-[12px] lg:w-[300px]' placeholder='搜你想看' value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />
          <button className='absolute right-2 border-l-2 border-gray-300 text-gray-400 cursor-pointer hover:text-pink-800'>
            <AiOutlineSearch className='text-xl' />
          </button>
        </form>
      </div>
      {/* sets & login */}
      <div className='w-1/2 flex justify-end items-center'>
        {/* sets */}
        <div className='flex justify-between w-6/12 md:justify-end'>
          <div className='w-[25px] h-[25px] bg-gray-200 rounded-full flex justify-center items-center text-[14px] cursor-pointer
            lg:w-[30px] lg:h-[30px]'><HiSun /></div>
          <div className='w-[25px] h-[25px] bg-gray-200 rounded-full flex justify-center items-center text-[14px] cursor-pointer md:mx-[15px]
            lg:w-[30px] lg:h-[30px] lg:mx-[16px]'><AiFillSetting /></div>
          <div className='w-[25px] h-[25px] bg-gray-200 rounded-full flex justify-center items-center text-[14px] cursor-pointer
            lg:w-[30px] lg:h-[30px]'
            onClick={upload}><BsPencilSquare /></div>
        </div>
        <div className='mx-2 w-[1px] h-[30px] bg-gray-200 lg:mx-4'></div>
        {/* login */}
        <div>
          <div className='w-[30px] bg-gray-200 h-[30px] rounded-full text-gray-400 flex items-center justify-center text-[20px] cursor-pointer
          md:w-[45px] md:h-[40px] md:text-[25px] 
          lg:w-[45px] md:h-[45px] md:text-[29px]'
            onClick={clickHead}>
            {(user!=null && JSON.stringify(user)!='{}')?
              (<div className='w-full h-full rounded-full' style={{backgroundImage:`url(${user.image?.asset.url})`, backgroundRepeat:'no-repeat', backgroundSize:'cover',backgroundPosition:'center'}}>
                
              </div>)
              :
              (<BiUser />)}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
