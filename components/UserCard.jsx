import React, { useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLike } from 'react-icons/ai'
import { AiOutlineComment } from 'react-icons/ai'
import { AiOutlineStar } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import Router, { useRouter } from 'next/router'

const UserCard = (props) => {
    // {
    //     "_id": "81d0ca43-2e5b-4c14-aa2d-c0c6b81ceb98",
    //     "image": {
    //         "asset": {
    //             "_id": "image-da6c9cc6867b9346d7926aae2676bdefa22906aa-1109x1080-jpg",
    //             "url": "https://cdn.sanity.io/images/enmunihr/production/da6c9cc6867b9346d7926aae2676bdefa22906aa-1109x1080.jpg"
    //         }
    //     },
    //     "nickName": "Astronaut",
    //     "slogan": "我就是Astronaut"
    // }
    return (
        <div className='w-full h-[50px] flex justify-between items-center border-b-[1px] py-[3px]  md:h-[40px] lg:h-[50px]'>
            <div className='flex flex-start h-[30px]'>
                <Link href='' className='w-[30px] md:w-[40px] lg:w-[50px]'>
                    <img src={props.image.asset.url} className='w-[30px] md:w-[40px] lg:w-[50px] rounded-full' alt="head" />
                </Link>
                <div className='ml-[10px] md:ml-[15px] lg:mt-[6px]'>
                    <div className='text-[12px] md:text-[14px] leading-[18px] md:leading-[26px] flex items-center  lg:mb-[3px]'>
                        <div className='mr-[5px]'>{props.nickName}</div>
                        <GoVerified className='text-blue-400 text-md' />
                    </div>
                    <div className='text-[12px] md:text-[14px] ml-[-8px] text-gray-400 leading-[10px]' style={{ transform: 'scale(0.8)' }}>{props.slogan}</div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
