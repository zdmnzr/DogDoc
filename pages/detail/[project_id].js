import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai'
import { GoVerified } from 'react-icons/go'
import { RiOpenArmLine } from 'react-icons/ri'
import Router, { useRouter } from 'next/router'
import UserCard from '../../components/UserCard';
import CommentCard from '../../components/CommentCard';
import useAuthStore from '../../store/authStore'
import { nanoid } from 'nanoid';
import { BASE_URL } from '../../utils'

// userProfile

// {
//     "_id": "ce15e4be-c6f2-4a44-8e9a-5223e12405ac",
//     "collections": null,
//     "followeds": null,
//     "follows": null,
//     "image": {
//         "asset": {
//             "_id": "image-a2f40e9ca6d4e6e10227818924fc2e180682285a-960x959-jpg",
//             "url": "https://cdn.sanity.io/images/enmunihr/production/a2f40e9ca6d4e6e10227818924fc2e180682285a-960x959.jpg"
//         }
//     },
//     "likes": null,
//     "nickName": "阿狗耶",
//     "password": "",
//     "slogan": "我是阿狗噗噗小宝。"
// }

// projectData

// {
//   "_id": "mdf7a5C49O897Yop9p7gLv",
//   "collectioneds": [
//       {
//           "_id": "ce15e4be-c6f2-4a44-8e9a-5223e12405ac",
//           "image": {
//               "asset": {
//                   "_id": "image-a2f40e9ca6d4e6e10227818924fc2e180682285a-960x959-jpg",
//                   "url": "https://cdn.sanity.io/images/enmunihr/production/a2f40e9ca6d4e6e10227818924fc2e180682285a-960x959.jpg"
//               }
//           },
//           "nickName": "阿狗耶",
//           "slogan": "我是阿狗噗噗小宝。"
//       }
//   ],
//   "comments": [
//       {
//           "content": "2",
//           "postedBy": {
//               "_id": "ce15e4be-c6f2-4a44-8e9a-5223e12405ac",
//               "image": {
//                   "asset": {
//                       "_id": "image-a2f40e9ca6d4e6e10227818924fc2e180682285a-960x959-jpg",
//                       "url": "https://cdn.sanity.io/images/enmunihr/production/a2f40e9ca6d4e6e10227818924fc2e180682285a-960x959.jpg"
//                   }
//               },
//               "nickName": "阿狗耶"
//           }
//       },
//       {
//           "content": "1",
//           "postedBy": {
//               "_id": "ce15e4be-c6f2-4a44-8e9a-5223e12405ac",
//               "image": {
//                   "asset": {
//                       "_id": "image-a2f40e9ca6d4e6e10227818924fc2e180682285a-960x959-jpg",
//                       "url": "https://cdn.sanity.io/images/enmunihr/production/a2f40e9ca6d4e6e10227818924fc2e180682285a-960x959.jpg"
//                   }
//               },
//               "nickName": "阿狗耶"
//           }
//       }
//   ],
//   "description": "哈哈",
//   "images": [
//       {
//           "asset": {
//               "_id": "file-091d284a16a56de3f738edf44dfe72e9c555284d-jpg",
//               "url": "https://cdn.sanity.io/files/enmunihr/production/091d284a16a56de3f738edf44dfe72e9c555284d.jpg"
//           }
//       }
//   ],
//   "likeds": [
//       {
//           "_id": "ce15e4be-c6f2-4a44-8e9a-5223e12405ac",
//           "image": {
//               "asset": {
//                   "_id": "image-a2f40e9ca6d4e6e10227818924fc2e180682285a-960x959-jpg",
//                   "url": "https://cdn.sanity.io/images/enmunihr/production/a2f40e9ca6d4e6e10227818924fc2e180682285a-960x959.jpg"
//               }
//           },
//           "nickName": "阿狗耶",
//           "slogan": "我是阿狗噗噗小宝。"
//       }
//   ],
//   "postedBy": {
//       "_id": "ce15e4be-c6f2-4a44-8e9a-5223e12405ac",
//       "image": {
//           "asset": {
//               "_id": "image-a2f40e9ca6d4e6e10227818924fc2e180682285a-960x959-jpg",
//               "url": "https://cdn.sanity.io/images/enmunihr/production/a2f40e9ca6d4e6e10227818924fc2e180682285a-960x959.jpg"
//           }
//       },
//       "nickName": "阿狗耶",
//       "slogan": "我是阿狗噗噗小宝。"
//   },
//   "time": "2022-08-04 14:14:46",
//   "type": "情感"
// }
const Detail = ({ detail }) => {
  const [projectData, setProjectData] = useState(detail[0]);
  const {userProfile,addUser} = useAuthStore();
  const [followed, setFollowed] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [collCommLike, setCollCommLike] = useState('comment')
  const year = projectData.time.slice(0, 4);
  const monthDay = projectData.time.slice(6, 10);
  const hour = projectData.time.slice(11, 16)
  const [screenW, setScreenW] = useState(326);

  const addComment = async () => {
    if (commentValue && userProfile) {
      let project_id = projectData._id
      const doc = {
        _type: 'comment',
        content: commentValue,
        postedBy: {
          _type: 'user',
          _id:userProfile._id,
          image:userProfile.image,
          nickName:userProfile.nickName
        },
      };
      const { data } = await axios.put(`${BASE_URL}/api/comment/${project_id}`, doc);
      setProjectData({...projectData,comments:data.comments})
      setCommentValue('')
    }
  }

  const handleFollow=async(bool)=>{
    if(userProfile){
      await axios.put(`${BASE_URL}/api/follow`,{
        followId:userProfile._id,
        followedId:projectData.postedBy._id,
        bool,
      })
      setFollowed(bool)
    }
  }

  useEffect(() => {
    setScreenW(window.innerWidth)

    //getuser
    if(userProfile){
      fetchUser();
    }

  }, [])
  
  const fetchUser =async()=> {
    const _id = userProfile._id
    const {data} = await axios.get(`${BASE_URL}/api/userById/${_id}`)
    console.log(data,'user')
    data[0].follows?.forEach(item=>{
      console.log(item,123)
      if(item._id===projectData.postedBy._id){
        // followed = true;
        setFollowed(true)
      }
    })
  }
   

  let width = screenW;
  if (width >= 600) {
    width = 450;
  }
  let contentW = width - 16;
  let img2W = (contentW - 2 * 5) / 2;
  let img3W = (contentW - 5) / 3;

  return (
    <div className='w-full h-full overflow-auto'>
      <div className='w-full h-[4px] bg-gray-200'>
      </div>
      <div className='w-full h-[20px] bg-white flex justify-start items-center text-[12px] px-[8px] border-b-[1px]'>
        <RiOpenArmLine style={{ transform: 'scale(0.8)' }} />
        <div style={{ transform: 'scale(0.8)' }}>公开</div>
      </div>
      <div className='w-full mb-[10px] bg-white p-[8px]  pb-0 flex flex-col'>
        {/* 头像 & 昵称 */}
        <div className='w-full h-[30px]  md:h-[40px] lg:h-[50px] flex justify-between items-center'>
          <div className='flex flex-start'>
            <Link href='' className='w-[30px] md:w-[40px] lg:w-[50px]'>
              <img src={projectData.postedBy.image.asset.url} className='w-[30px] md:w-[40px] lg:w-[50px] rounded-full' alt="head" />
            </Link>
            <div className='ml-[10px] md:ml-[15px] lg:mt-[6px]'>
              <div className='text-[12px] md:text-[14px] leading-[20px] md:leading-[26px] flex items-center  lg:mb-[3px]'>
                <div className='mr-[5px]'>{projectData.postedBy.nickName}</div>
                <GoVerified className='text-blue-400 text-md' />
              </div>
              <div className='text-[12px] md:text-[14px] ml-[-6px] text-gray-600 leading-[10px]' style={{ transform: 'scale(0.8)' }}>{monthDay} {hour}</div>
            </div>
          </div>
          <div className='text-[12px] md:text-[14px]'>
            {followed ? (
              <div className='border-[1px] border-gray-400 px-[6px] py-[1px] rounded-lg text-gray-600' style={{ transform: 'scale(0.8)' }} onClick={()=>{handleFollow(false)}}>√ 已关注</div>
            ) : (
              <div className='border-[1px] border-orange-400 px-[6px] py-[1px] rounded-lg text-orange-400' style={{ transform: 'scale(0.8)' }} onClick={()=>{handleFollow(true)}}>关注</div>
            )}
          </div>
        </div>
        {/* 文字 */}
        <div className='my-[8px]  '>
          <div className='text-[12px] md:text-[14px]'>{projectData.description}</div>
        </div>
        {/* 图片 */}
        {!projectData.images ? ('') : projectData.images?.length == 1 ? (
          <div className={`mb-[5px] mx-auto grid grid-cols-1 gap-[5px] md:mx-0`} style={{ width: `${contentW}px` }}>
            {projectData.images?.map((image) => {
              return (
                <div key={image.asset._id} className='bg-gray-200' style={{ height: `${contentW}px`, backgroundImage: `url(${image.asset.url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              )
            })}
          </div>
        ) : projectData.images?.length == 2 || projectData.images?.length == 4 ? (
          <div className={`mb-[5px] mx-auto grid grid-cols-2 gap-[5px] md:mx-0`} style={{ width: `${contentW}px` }}>
            {projectData.images?.map((image) => {
              return (
                <div key={image.asset._id} className='bg-gray-200' style={{ height: `${img2W}px`, backgroundImage: `url(${image.asset.url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              )
            })}
          </div>
        ) : (
          <div className={`mb-[5px] mx-auto grid grid-cols-3 gap-[5px] md:mx-0`} style={{ width: `${contentW}px` }}>
            {projectData.images?.map((image) => {
              return (
                <div key={image.asset._id} className='bg-gray-200' style={{ height: `${img3W}px`, backgroundImage: `url(${image.asset.url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              )
            })}
          </div>
        )}

        {/* 收藏，评论，赞 */}
        <div className='px-2 py-[15px] mt-[5px] md:mt-[3px] h-[25px] md:h-[32px] border-t-[1px] border-b-[1px] border-gray-200 flex justify-between items-center'>
          <div className='flex w-1/2'>
            <div className={collCommLike !== 'collection' ?
              'text-[13px] md:text-[15px] flex items-center mr-[20px] text-gray-400 mr-[30px]' :
              'text-[13px] md:text-[15px] flex items-center mr-[20px] border-b-[2px] border-orange-400 mr-[30px]'}
              onClick={() => { setCollCommLike('collection') }}
            >
              <div>收藏</div>
              <div className='ml-[2px] md:ml-[5px]'>{projectData.collectioneds ? projectData.collectioneds.length : 0}</div>
            </div>
            <div className={collCommLike !== 'comment' ?
              'text-[13px] md:text-[15px] flex items-center mr-[20px] text-gray-400' :
              'text-[13px] md:text-[15px] flex items-center mr-[20px] border-b-[2px] border-orange-400'}
              onClick={() => { setCollCommLike('comment') }}
            >
              <div>评论</div>
              <div className='ml-[2px] md:ml-[5px]'>{projectData.comments ? projectData.comments.length : 0}</div>
            </div>
          </div>
          <div className='w-1/2 flex justify-end'>
            <div className={collCommLike !== 'like' ?
              'text-[13px] md:text-[15px] flex justify-end items-center text-gray-400' :
              'text-[13px] md:text-[15px] flex justify-end items-center border-b-[2px] border-orange-400'}
              onClick={() => { setCollCommLike('like') }}
            >
              <div>赞</div>
              <div className='ml-[2px] md:ml-[5px]'>{projectData.likeds ? projectData.likeds.length : 0}</div>
            </div>
          </div>

        </div>
        {/* 收藏，评论，赞的内容区 */}
        <div>
          {collCommLike === 'collection' && (
            <div className='mb-[60px]'>
              {projectData.collectioneds?.map(collectioned => {
                return (
                  <UserCard {...collectioned} key={nanoid()} />
                )
              })}
            </div>
          )}
          {collCommLike === 'comment' && (
            <div className='mb-[60px]'>
              <div className='flex items-center justify-between border-b-[1px] px-[10px]'>
                <input type="text" className='h-8 w-10/12 focus:outline-none text-[12px] ' placeholder='添加评论. . .' value={commentValue} onChange={(e) => { setCommentValue(e.target.value) }} />
                <button className='text-[12px] text-orange-400 cursor-pointer border-[1px] border-orange-400 px-[8px] rounded-md' onClick={addComment}>
                  发布
                </button>
              </div>
              {projectData.comments?.map(comment => {
                return (
                  <CommentCard {...comment} key={nanoid()} />
                )
              })}
            </div>
          )}
          {collCommLike === 'like' && (
            <div className='mb-[60px]'>
              {projectData.likeds?.map(liked => {
                return (
                  // <>123</>
                  <UserCard {...liked} key={nanoid()} />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Detail

export const getServerSideProps = async ({
  params: { project_id }
}) => {

  const { data } = await axios.get(`${BASE_URL}/api/detail/${project_id}`);

  return {
    props: {
      detail: data
    }
  }
}