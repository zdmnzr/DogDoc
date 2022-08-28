import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import axios from 'axios'
import useAuthStore from '../../store/authStore'
import { BiChevronLeft } from 'react-icons/bi'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsPencil } from 'react-icons/bs'
import Link from 'next/link';
import Card from '../../components/Card'
import { GoVerified } from 'react-icons/go'
import { RiLoader2Line } from 'react-icons/ri'
import { BASE_URL } from '../../utils'

const Personal = (D) => {
  const active = 'flex-1 flex items-center justify-center border-b-[2px] border-gray-600';
  const noActive = 'flex-1 flex items-center justify-center'
  const { userProfile, removeUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isFensi, setIsFensi] = useState(false)
  console.log(userProfile, D, 888)
  const [pcl, setPcl] = useState('P');
  const router = useRouter();
  const [projects, setProjects] = useState([])
  // const currentId = router.query._id
  const tmpProjects = [];

  useEffect(() => {
    if (userProfile?._id === router.query._id) {
      setIsUser(true)
    }
    D.followeds?.forEach(item => {
      if (item._id === userProfile?._id) {
        setIsFensi(true);
      }
    })
    fun();
  }, [])

  const fun = async () => {
    let _id = D._id
    const { data } = await axios.get(`${BASE_URL}/api/getPosts/${_id}`);
    setProjects(data)
  }

  const logout = () => {
    Router.push('/')
    removeUser();
  }

  const fanhui = () => {
    Router.push('/')
  }

  const getProject = async (type) => {
    setPcl(type)
    setLoading(true)
    tmpProjects = []
    if (type == 'L') {
      for (let i = 0; i < D.likes?.length; i++) {
        let project_id = D.likes[i]._id;
        const { data } = await axios.get(`${BASE_URL}/api/detail/${project_id}`);
        tmpProjects.push(data[0])
      }
      setProjects(tmpProjects)
      setLoading(false)
    }
    else if (type == 'C') {
      for (let i = 0; i < D.collections?.length; i++) {
        let project_id = D.collections[i]._id;
        const { data } = await axios.get(`${BASE_URL}/api/detail/${project_id}`);
        tmpProjects.push(data[0])
      }
      setProjects(tmpProjects)
      setLoading(false)
    }
    else if (type == 'P') {
      let _id = D._id
      const { data } = await axios.get(`${BASE_URL}/api/getPosts/${_id}`);
      setProjects(data)
      setLoading(false)
    }

    // console.log(projects)
  }

  const handleFollow=async(bool)=>{
    if(userProfile){
      setIsFensi(bool)

      await axios.put(`${BASE_URL}/api/follow`,{
        followId:userProfile._id,
        followedId:D._id,
        bool,
      })
    }
  }
  const toUserDetail=()=>{
    Router.push(`/userDetail/${userProfile._id}`)
  }
  return (
    <div className='w-full h-full'>
      <div className='w-full'>
        {/* 上半部分 */}
        <div className='h-52 top-[55px]  flex flex-col justify-between p-[8px] fixed w-full'
          style={{ backgroundImage: `url(/bgbg.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* 返回与退出 */}
          <div className='flex justify-between items-center'>
            <div>
              <div onClick={fanhui} className='w-[25px] h-[25px] bg-gray-800 rounded-full text-white text-[20px] bg-opacity-50 flex justify-center items-center'> <BiChevronLeft /> </div>
            </div>
            <div>
              <div onClick={logout} className='w-[25px] h-[25px] bg-gray-800 rounded-full text-white text-[20px] bg-opacity-50 flex justify-center items-center'> <BiDotsHorizontalRounded /> </div>
            </div>
          </div>
          {/* 头像，昵称，账号 */}
          <div className='w-full flex justify-between items-center '>
            <div className='flex flex-start  h-[70px]'>
              <Link href='' className='w-[70px]'>
                <img src={D.image.asset.url} className='border-[2px] border-white w-[70px] rounded-full' alt="head" />
              </Link>
              <div className='ml-[10px] flex items-center text-white'>
                <div>
                  <div className='text-[16px] flex items-center mt-[-10px]'>
                    <div className='mr-[5px]'>{D.nickName}</div>
                    <GoVerified className='text-blue-400 text-md' />
                  </div>
                  <div className='text-[12px] text-gray-200'>{D.slogan}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 下半部分 */}
        <div className='mt-52'>
          {/* 作品，关注，粉丝 */}
          <div className='flex justify-start p-[8px] py-[10px]'>
            <div className='flex items-end'>
              <div className='text-[14px] mr-[2px]'>15</div>
              <div className='text-[13px] text-gray-400'>获赞</div>
            </div>
            <div className='flex items-end mx-[25px]'>
              <div className='text-[14px] mr-[2px]'>{D.follows?D.follows.length:0}</div>
              <div className='text-[13px] text-gray-400'>关注</div>
            </div>
            <div className='flex items-end'>
              <div className='text-[14px] mr-[2px]'>{D.followeds?D.followeds.length:0}</div>
              <div className='text-[13px] text-gray-400'>粉丝</div>
            </div>
          </div>
          {/* slogan */}
          <div className='flex justify-start items-center text-[14px] p-[8px] py-[10px]'>
            <div className='mr-[5px]'>{D.slogan}</div>
            {isUser ? (
              <BsPencil onClick={toUserDetail}/>
            ) : (
              <></>
            )}
          </div>
          {/* 编辑资料&添加朋友 || 关注 || 已关注&私信 */}
          <div>
            {isUser && (
              <div className='flex w-full p-[8px] py-[10px] text-[14px]'>
                <div className='flex-1 bg-gray-200 flex items-center justify-center py-[6px] rounded-md mr-[8px]'>编辑资料</div>
                <div className='flex-1 bg-gray-200 flex items-center justify-center py-[6px] rounded-md'>添加朋友</div>
              </div>
            )}
            {!isUser && isFensi && (
              <div className='flex w-full p-[8px] py-[10px] text-[14px]'>
                <div className='flex-1 bg-gray-200 flex items-center justify-center py-[6px] rounded-md mr-[8px]' onClick={()=>{handleFollow(false)}}>√ 已关注</div>
                <div className='flex-1 bg-gray-200 flex items-center justify-center py-[6px] rounded-md'>私信</div>
              </div>
            )}
            {!isUser && !isFensi && (
              <div className='flex w-full p-[8px] py-[10px] text-[14px]'>
                <div className='flex-1 bg-gray-200 flex items-center justify-center py-[6px] rounded-md mr-[8px]' onClick={()=>{handleFollow(true)}}>关注</div>
              </div>
            )}
          </div>
          {/* 作品&喜欢 || 作品&喜欢&收藏 */}
          <div className='sticky bg-white top-52 w-full '>
            {isUser ? (
              <div className='flex w-full pt-[10px] text-[14px] border-b-[1px]'>
                <div className={pcl == 'P' ? active : noActive} onClick={() => { getProject('P') }}>作品</div>
                <div className={pcl == 'C' ? active : noActive} onClick={() => { getProject('C') }}>收藏 </div>
                <div className={pcl == 'L' ? active : noActive} onClick={() => { getProject('L') }}>喜欢</div>
              </div>
            ) : (
              <div className='flex w-full pt-[10px] text-[14px] border-b-[1px]'>
                <div className={pcl == 'P' ? active : noActive} onClick={() => { getProject('P') }}>作品</div>
                <div className={pcl == 'L' ? active : noActive} onClick={() => { getProject('L') }}>喜欢</div>
              </div>
            )}
          </div>
          {/* 内容： 作品&喜欢 || 作品&喜欢&收藏 */}
          <div className='overflow-auto'>
            {loading && (
              <div className='w-full flex flex-col items-center justify-center text-gray-400 mt-[30px]'>
                <RiLoader2Line className='text-[30px]' />
                <div>Loading...</div>
              </div>
            )}
            {pcl === 'P' && !loading && (
              <div className='bg-gray-100'>
                {projects.map((project) => {
                  return (
                    <div className='my-[8px]' key={project._id}>
                      <Card {...project} />
                    </div>
                  )
                })}
                <div className='h-[60px]'></div>
              </div>
            )}
            {pcl === 'C' && !loading && (
              <div className='bg-gray-100'>
                {projects.map((project) => {
                  return (
                    <div className='my-[8px]' key={project._id}>
                      <Card {...project} />
                    </div>
                  )
                })}
                <div className='h-[60px]'></div>
              </div>
            )}
            {pcl === 'L' && !loading && (
              <div className='bg-gray-100'>
                {projects.map((project) => {
                  return (
                    <div className='my-[8px]' key={project._id}>
                      <Card {...project} />
                    </div>
                  )
                })}
                <div className='h-[60px]'></div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}

export default Personal

export const getServerSideProps = async ({
  params: { _id }
}) => {

  const { data } = await axios.get(`${BASE_URL}/api/userById/${_id}`);
  let D = data[0];

  return {
    props: {
      ...D
    }
  }
}