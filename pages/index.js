import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/Sidebar'
import Card from '../components/Card'
import axios from 'axios'
import useSettingsStore from '../store/settingsStore'
import useAuthStore from '../store/authStore'
import { TbMoodEmpty } from 'react-icons/tb'
import { BASE_URL } from '../utils'

export default function Home({ videoProps }) {

  const { scrolltop, setScrolltop, recfoll, type } = useSettingsStore();
  const { userProfile } = useAuthStore();
  const [user, setUser] = useState();
  const [videos, setVideos] = useState([])
  // console.log(videos)


  const fetchUser = async () => {
    const _id = userProfile?._id
    const { data } = await axios.get(`${BASE_URL}/api/userById/${_id}`)
    // console.log(data,'user')
    setUser(data[0]);
    // console.log(1)
    // console.log(user._id)
    
  }
  useEffect(()=>{
    if ((user?._id != 'ce15e4be-c6f2-4a44-8e9a-5223e12405ac' && user?._id != '81d0ca43-2e5b-4c14-aa2d-c0c6b81ceb98')){
      console.log(0)
        
        let hh = videoProps.filter(video => {
          return video.postedBy._id != 'ce15e4be-c6f2-4a44-8e9a-5223e12405ac' && video.postedBy._id != '81d0ca43-2e5b-4c14-aa2d-c0c6b81ceb98'
        })
        // console.log(hh,58542158)
        setVideos(hh)
      }else{
      console.log(1)
  
        setVideos(videoProps)
      }
  },[user])

  // if(!userProfile || (userProfile?._id != 'ce15e4be-c6f2-4a44-8e9a-5223e12405ac' && userProfile?._id != '81d0ca43-2e5b-4c14-aa2d-c0c6b81ceb98')){
  //   videos = videos.filter(video=>{
  //     return video.postedBy._id != 'ce15e4be-c6f2-4a44-8e9a-5223e12405ac' && video.postedBy._id != '81d0ca43-2e5b-4c14-aa2d-c0c6b81ceb98'
  //   })
  // }

  const followsSet = new Set();

  user?.follows?.forEach(item => {
    followsSet.add(item._id)
  })

  // console.log(followsSet);

  const followedVideos = videos?.filter(item => {
    return followsSet.has(item.postedBy._id);
  })
  console.log(followedVideos)



  let typedVideos;
  if (type != '全部') {
    typedVideos = videos?.filter((video) => {
      return video.type === type
    })
  } else {
    typedVideos = videos
  }

  let followedTypedVideos;
  if (type != '全部') {
    followedTypedVideos = followedVideos?.filter((video) => {
      return video.type === type
    })
  } else {
    followedTypedVideos = followedVideos
  }


  function throttle(func, ms) {
    let prew = Date.now();
    return function () {
      let cur = Date.now();
      if (cur - prew >= ms) {
        prew = cur;
        setTimeout(() => {
          func.apply(this, arguments)
        }, 400)
      }
    }
  }

  const getScrollTop = () => {
    let nnn = document.getElementById('nnn');
    setScrolltop(nnn.scrollTop)
  }

  useEffect(() => {
    // console.log(scrolltop)
    let nnn = document.getElementById('nnn');
    nnn.scrollTop = scrolltop
    if (userProfile) {
      console.log('userProfile')
      fetchUser();
    }else{
      console.log('noUserProfile')
      let hh = videoProps.filter(video => {
        return video.postedBy._id != 'ce15e4be-c6f2-4a44-8e9a-5223e12405ac' && video.postedBy._id != '81d0ca43-2e5b-4c14-aa2d-c0c6b81ceb98'
      })
      // console.log(hh,58542158)
      setVideos(hh)
    }
  }, [])
  return (
    <div className='flex flex-col flex-nowrap md:flex-row  md:gap-[10px] md:w-[750px] md:mt-[10px] lg:w-[850px]'>
      <Sidebar />
      <div className={`w-full h-[900px] overflow-auto md:overflow-visible pt-[37px] bg-gray-200 md:bg-white md:pt-[0px] md:w-[600px] ${styles.hidden_scroll}`} id='nnn' onScroll={throttle(getScrollTop, 200)}>
        {recfoll === 'rec' ? (
          <div>
            {typedVideos.map((video) => {
              return <Card {...video} key={video._id} />
            })}
          </div>
        ) : (
          <div>
            {followedTypedVideos.map((video) => {
              return <Card {...video} key={video._id} />
            })}
          </div>
        )}

        {recfoll === 'rec' ? (
          <div>
            {typedVideos.length === 0 && (
              <div className='flex flex-col items-center text-gray-400'>
                <TbMoodEmpty className='text-[150px] mt-[150px]' />
                <div className='text-[23px]'>nothing there...</div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {followedTypedVideos.length === 0 && (
              <div className='flex flex-col items-center text-gray-400'>
                <TbMoodEmpty className='text-[150px] mt-[150px]' />
                <div className='text-[23px]'>nothing there...</div>
              </div>
            )}
          </div>
        )}

        <div className='h-20'></div>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {

  const { data } = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: {
      videoProps: data
    }
  }
}