import React, { useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLike } from 'react-icons/ai'
import { AiOutlineComment } from 'react-icons/ai'
import { AiOutlineStar } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import Router, { useRouter } from 'next/router'

const CommentCard = (props) => {
    // console.log(props,778789)
    // {
    //     "content": "你真牛逼",
    //     "postedBy": {
    //         "_id": "81d0ca43-2e5b-4c14-aa2d-c0c6b81ceb98",
    //         "image": {
    //             "asset": {
    //                 "_id": "image-da6c9cc6867b9346d7926aae2676bdefa22906aa-1109x1080-jpg",
    //                 "url": "https://cdn.sanity.io/images/enmunihr/production/da6c9cc6867b9346d7926aae2676bdefa22906aa-1109x1080.jpg"
    //             }
    //         },
    //         "nickName": "Astronaut",
    //         "slogan": "我就是Astronaut"
    //     }
    // }
    // console.log(props);
    return (
        <div className='w-full h-[50px] flex justify-between items-center border-b-[1px] py-[3px]  md:h-[40px] lg:h-[50px]'>
            {/* 55555 */}
            <div className='flex flex-start h-[30px]'>
                <Link href='' className='w-[30px] md:w-[40px] lg:w-[50px]'>
                    <img src={props.postedBy.image.asset.url} className='w-[30px] md:w-[40px] lg:w-[50px] rounded-full' alt="head" />
                </Link>
                <div className='ml-[10px] md:ml-[15px] lg:mt-[6px]'>
                    <div className='text-[12px] md:text-[14px] md:leading-[26px] flex items-center lg:mb-[3px]'>
                        <div className='mr-[5px]'>{props.postedBy.nickName}</div>
                        <GoVerified className='text-blue-400 text-md' />
                    </div>
                    <div className='text-[12px] md:text-[14px] leading-[10px]'>{props.content}</div>
                </div>
            </div>
        </div>
    )
}

export default CommentCard
