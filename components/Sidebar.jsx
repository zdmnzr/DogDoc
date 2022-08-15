import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import { RiUserHeartLine } from 'react-icons/ri'
import { BsListUl } from 'react-icons/bs'
import { VscCircleFilled } from 'react-icons/vsc'

import useSettingsStore from '../store/settingsStore'



const Sidebar = () => {
  const {setRecfoll,setType,recfoll,type} = useSettingsStore();
  const types = ['全部', '生活', '美食', '电影', '游戏', '校园', '代码', '星座', '新闻', '音乐', '宠物', '风景', '情感'];
 
  const [RecFoll, setRecFoll] = useState(recfoll);
  const active = 'text-gray-400 text-orange-600 border-b-[1px] leading-[18px] border-gray-400 md:items-center md:hover:bg-gray-200 md:w-full md:flex md:justify-center md:py-[5px] lg:w-5/12';
  const noActive = 'text-gray-400 md:items-center md:hover:bg-gray-200 md:w-full md:flex md:justify-center md:py-[5px] lg:w-5/12';
  const [topic, setTopic] = useState(type)

  return (
    <div className='w-full h-[32px] bg-white border-b-[1px] border-gray-200 flex fixed 
      md:fixed md:w-[140px] md:h-auto md:rounded-md md:flex md:flex-col md:border-[1px] md:border-gray-200
      lg:w-[240px]'>
      {/* 推荐/关注 */}
      <div className='h-full w-[90px] flex-none border-r-[1px] border-gray-200 flex justify-evenly items-center text-[15px] 
        md:w-full md:flex md:flex-col md:h-auto md:border-0 md:border-b-[1px] md:p-[4px]
        lg:pb-[15px] lg:flex-row lg:flex-wrap'>
        <div className='hidden md:block text-[18px] md:py-[5px] font-[500]
          lg:w-11/12 lg:mx-auto lg:flex-none'>首页</div>
        <div className={RecFoll === 'rec' ? `${active}` : `${noActive}`} onClick={() => { setRecFoll('rec');setRecfoll('rec')}}><BsListUl className='hidden md:block mr-[20px] text-[16px]' /> 推荐</div>
        <div className='md:hidden text-gray-400'>|</div>
        <div className={RecFoll === 'foll' ? `${active}` : `${noActive}`} onClick={() => { setRecFoll('foll');setRecfoll('foll') }}><RiUserHeartLine className='hidden md:block mr-[20px] text-[16px]' /> 关注</div>

      </div>
      {/* 可能感兴趣的人 */}
      <div className='hidden lg:block w-full bg-gray-500 p-[4px]'>
        可能感兴趣的人
      </div>
      {/* 分类选择器 */}
      <div className={`h-full w-full overflow-x-auto flex items-center text-[14px] ${styles.hidden_scroll}
        md:w-auto md:flex md:flex-col md:h-auto md:flex md:flex-col md:p-[4px]
        lg:pb-[15px] lg:flex-row lg:flex-wrap lg:justify-center`}>
        <div className='hidden md:block text-[18px] font-[500] md:py-[5px]
        lg:w-11/12 lg:mx-auto'>分类</div>


        {types.map(item => {
          if (item == topic) {
            return (
              <div key={item} className='border-orange-600 text-orange-600 flex-none px-2 py-[1px] rounded-xl mx-2 border-[1px] text-[12px]
                                    md:px-[15px] md:py-[4px] md:mx-[10px] md:my-[5px] md:text-[14px]'>{item}</div>
            )
          } else {
            return (
              <div key={item} className='flex-none px-2 py-[1px] rounded-xl mx-2 border-[1px] border-gray-400 text-gray-600 text-[12px]
                                     md:px-[15px] md:py-[4px] md:mx-[10px] md:my-[5px] md:text-[14px]' onClick={() => { setTopic(item);setType(item) }}>{item}</div>
            )
          }
        })}


      </div>
    </div>
  )
}

export default Sidebar
