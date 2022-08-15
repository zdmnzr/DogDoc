import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLike } from 'react-icons/ai'
import { AiOutlineComment } from 'react-icons/ai'
import { AiOutlineStar } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import Router, { useRouter } from 'next/router'
import useAuthStore from '../store/authStore'
import useSettingsStore from '../store/settingsStore';
import axios from 'axios';
import { BASE_URL } from '../utils'

const Card = (props) => {
  const {scrolltop} = useSettingsStore();
  const { userProfile } = useAuthStore();
  const [project,setProject] = useState(props)
  const year = project.time.slice(0, 4);
  const monthDay = project.time.slice(5, 10);
  const hour = project.time.slice(11, 16)
  const [like,setLike] = useState(false);
  const [collect,setCollect] = useState(false);
  const [screenW,setScreenW] = useState(400);
  // console.log(project.consw)
  
  useEffect(() => {
    setScreenW(window.innerWidth)
  },[])
  let width = screenW;
  if(width>=600){
    width = 450;
  }
  let contentW = width - 16;
  let imgW = (contentW - 2*5)/3;
  // useEffect(()=>{
  // })

  useEffect(()=>{
    // setCollect(false);
    // setLike(false);
    // console.log(123)
    project.likeds?.forEach(liked=>{
      if(liked._id === userProfile?._id){
        setLike(true);
      }
    })
    project.collectioneds?.forEach(collectioned=>{
      if(collectioned._id === userProfile?._id){
        setCollect(true);
      }
    })
  },[])


  const toDetail=(e)=>{
    console.log(scrolltop)
    if(width<500){
      Router.push(`/detail/${project._id}`)
    }
  }

  const handleLike = async(bool)=>{
    if(userProfile){
      const {data} = await axios.put(`${BASE_URL}/api/like`,{
        userId:userProfile._id,
        projectId:project._id,
        bool
      })
      console.log('card.js')
      // alert(321)
      // console.log(data,789)
      setProject({...project,likeds:data.likeds})
      // console.log(bool,555)
      setLike(bool);
    }
  }
  const handleCollect = async(bool)=>{
    if(userProfile){
      const {data} = await axios.put(`${BASE_URL}/api/collect`,{
        userId:userProfile._id,
        projectId:project._id,
        bool
      })
      // console.log(data,789)
      setProject({...project,collectioneds:data.collectioneds})
      // console.log(bool,555)
      setCollect(bool);
    }
  }
  

  return (
    <div className='w-full mb-[7px] bg-white p-[8px]  pb-0 flex flex-col 
    md:w-[600px] md:rounded-md md:ml-[150px] md:shadow-lg md:border-[1px] border-gray-200
    lg:ml-[250px]'>
      {/* 头像 & 昵称 */}
      <div className='w-full flex justify-between'>
        <div className='flex flex-start h-[30px] md:h-[40px] lg:h-[50px]'>
          <Link href={`/user/${project.postedBy._id}`} className='w-[30px] md:w-[40px] lg:w-[50px]'> 
            <img src={project.postedBy.image.asset.url} 
              className='w-[30px] md:w-[40px] lg:w-[50px] rounded-full' 
              alt="head"
               />
          </Link>
          <div className='ml-[10px] md:ml-[15px] lg:mt-[6px]'>
            <div className='text-[12px] md:text-[14px] leading-[20px] md:leading-[26px] flex items-center  lg:mb-[3px]'>
              <div className='mr-[5px]'>{project.postedBy.nickName}</div>
              <GoVerified className='text-blue-400 text-md' />
            </div>
            <div className='text-[12px] md:text-[14px] ml-[-6px] text-gray-600 leading-[10px]' style={{transform:'scale(0.8)'}}>{monthDay} {hour}</div>
          </div>
        </div>
        <div className='text-[12px] md:text-[14px]'>
          <BsChevronDown/>
        </div>
      </div>
      {/* 文字 */}
      <div className='my-[5px]' onClick={toDetail}>
        <div className='text-[12px] md:text-[14px]'>{project.description}</div>
      </div>
      {/* 图片 */}
      <div className={`mb-[5px]   mx-auto grid grid-cols-3 gap-[5px] md:mx-0`} style={{width:`${contentW}px`}} onClick={toDetail}>
        {project.images?.map((image)=>{
          return (
            <div key={image.asset._id} className='bg-gray-200' style={{height:`${imgW}px`, backgroundImage:`url(${image.asset.url})`, backgroundRepeat:'no-repeat', backgroundSize:'cover',backgroundPosition:'center'}}></div>
          )
        })}
      </div>
      {/* 收藏，评论，赞 */}
      <div className='px-2 py-[4px] md:mt-[3px]  md:h-[32px] border-t-[1px] border-gray-200 flex justify-around items-center'>
        <div className='text-[13px] md:text-[15px]'>
          {collect===false?(
            <div className=' flex items-center' onClick={()=>{handleCollect(true)}}>
              <AiOutlineStar /> <div className='ml-[2px] md:ml-[5px]'>{project.collectioneds?project.collectioneds.length:0}</div>
            </div>
          ):(
            <div className=' flex items-center text-orange-600' onClick={()=>{handleCollect(false)}}>
              <AiOutlineStar /> <div className='ml-[2px] md:ml-[5px]'>{project.collectioneds?project.collectioneds.length:0}</div>
            </div>
          )}
        </div>
        <div className='text-[13px] md:text-[15px] flex items-center'>
          <AiOutlineComment /> <div className='ml-[2px] md:ml-[5px]'>{project.comments?project.comments.length:0}</div>
        </div>
        <div className='text-[13px] md:text-[15px] flex items-center'>
          {like===false?(
            <div className=' flex items-center' onClick={()=>{handleLike(true)}}>
              <AiOutlineLike/> <div className='ml-[2px] md:ml-[5px]'>{project.likeds?project.likeds.length:0}</div>
            </div>
          ):(
            <div className=' flex items-center text-orange-600' onClick={()=>{handleLike(false)}}>
              <AiOutlineLike/> <div className='ml-[2px] md:ml-[5px]'>{project.likeds?project.likeds.length:0}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card



// <div className='w-full mb-[10px] bg-white'>
// <div className=' p-3 flex'>
//   {/* 头像 */}
//   <div className='w-1/12'>
//     <Link href=''>
//       <div>
//         <Image
//           className='cursor-pointer rounded-full'
//           alt='TikTik'
//           layout='responsive'
//           width={'100px'}
//           height={'100px'}
//           src={project.postedBy.image.asset.url}
//         />
//       </div>
//     </Link>
//   </div>
//   {/* 内容区 */}
//   <div className='w-11/12 p-3 pt-1'>
//     <div className='text-base font-semibold'>{project.postedBy.nickName}</div>
//     <div className='text-xs'>{monthDay} {hour}</div>

//     <div className='text-sm my-2'>{project.description}</div>
//     {/* 图片们 */}
//     <div className='w-full'>
//       {!project.image && (
//         <div></div>
//       )}
//       {project.images?.length == 1 && (
//         <div className='w-full h-40'>
//           <img className='h-full cursor-pointer' src={project.images[0].asset.url} alt="img" />
//         </div>
//       )}
//       {(project.images?.length > 1) && (project.images?.length <= 3) && (
//         <div className='w-11/12 mx-auto h-36 grid grid-cols-3 gap-3 bg-red-200'>
//           {project.images.map(image => {
//             return (
//               <div className='bg-red-100 h-36'>
//                 <Image
//                   className='cursor-pointer'
//                   alt='img'
//                   layout='responsive'
//                   width={'100'}
//                   height={'100'}
//                   src={image.asset.url}
//                 />
//               </div>
//             )
//           })}
//           {/* <div className='bg-red-100'></div>
//             <div className='bg-red-100'></div>
//             <div className='bg-red-100'></div> */}
//         </div>
//       )}
//     </div>
//   </div>
// </div>
// {/* 点赞评论 */}
// <div className='h-9 flex justify-around items-center w-11/12 mx-auto border-t-2'>
//   <div>
//     <BiCommentAdd className='text-2xl cursor-pointer hover:text-pink-800' />
//   </div>
//   <div>
//     <BiLike className='text-2xl cursor-pointer hover:text-pink-800' />
//   </div>
// </div>

// </div>