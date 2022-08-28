import { BiUser } from 'react-icons/bi'
import React, { useState } from 'react'
import { client } from '../../utils/client';
import { nanoid } from 'nanoid';
import Router, { useRouter } from 'next/router'
import axios from 'axios'
import useAuthStore from '../../store/authStore'
// import { BiChevronLeft } from 'react-icons/bi'
// import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BASE_URL } from '../../utils'

const Account = () => {
    const { userProfile, addUser } = useAuthStore();
    const [nickName, setNickName] = useState('');
    const [slogan, setSlogan] = useState('');
    const [head, setHead] = useState('');
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    // console.log(router.query, 79879789)
    // {
    //     "_type": "image",
    //     "asset": {
    //         "_ref": "image-da6c9cc6867b9346d7926aae2676bdefa22906aa-1109x1080-jpg",
    //         "_type": "reference"
    //     }
    // }
    const uploadPoject = async (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile,'image')
        const fileTypes = ['image/jpeg', 'image/webp', 'image/png'];

        // uploading asset to sanity
        if (fileTypes.includes(selectedFile.type)) {
            setLoading(true);
            client.assets
                .upload('image', selectedFile, {
                    contentType: selectedFile.type,
                    filename: selectedFile.name,
                })
                .then((data) => {
                    setHead({ _id: data._id, url: data.url });
                    console.log(data,'image')
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };
    const summit = async () => {
        if (nickName) {
            // console.log(nickName, slogan, head)
            const image = {
                _type: 'image',
                _key: nanoid(),
                asset: {
                    _type: 'reference',
                    _ref: head?._id,
                },
            }
            const data = {
                nickName,
                image,
                slogan,
            }
            // console.log(data,789)
            const _id = router.query._id
            // await axios.get(`${BASE_URL}/api/userInfo/${_id}`);
            axios.put(`${BASE_URL}/api/userInfo/${_id}`, data);
            const userprofile = await axios.get(`${BASE_URL}/api/userById/${_id}`)
            console.log(userprofile.data[0])
            addUser({ ...userprofile.data[0], password: '' })
            Router.push(`/`)
        }
    }
    return (
        <div className='w-full h-full flex flex-col items-center relative bg-gray-100'>
            {/* slogan */}
            <div className='absolute left-[8px] top-[8px] text-[20px] font-semibold text-gray-500'>
                完善个人信息
            </div>
            <div className='flex flex-col items-center justify-between bg-white w-10/12 h-[80vh] mt-[45px] rounded-2xl shadow-lg'>

                {/* 上传头像 */}
                <div>
                    {head ? (
                        <div className='bg-gray-200 w-[100px] h-[100px] rounded-full mt-[20px] flex flex-col items-center justify-center text-gray-400'>
                            <div className='w-full h-full rounded-full' style={{ backgroundImage: `url(${head.url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>

                            </div>
                        </div>
                    ) : (
                        <label className='bg-gray-200 w-[100px] h-[100px] rounded-full mt-[20px] flex flex-col items-center justify-center text-gray-400'>
                            <BiUser className='text-[40px]' />
                            <div className='text-[14px]'>上传头像</div>
                            <input
                                type='file'
                                name='upload-video'
                                onChange={(e) => uploadPoject(e)}
                                className='w-0 h-0'
                            />
                        </label>
                    )}


                </div>
                {/* 昵称 */}
                <div className='w-3/4 flex justify-center mt-[-70px]'>

                    <input type='text' className='w-full border-[1px] h-[35px] px-[10px] text-[14px] focus:outline-none focus:border-orange-500 ' placeholder='昵称 (不超过8个字符)' value={nickName} onChange={(e) => { setNickName(e.target.value) }}></input>
                    {/* {errAcc && (<div className='text-red-600 text-[14px] leading-[15px]'>erracc</div>)} */}

                </div>
                {/* 介绍自己 */}
                <div className='w-3/4 flex justify-center mt-[-80px]'>
                    <textarea className='w-full h-[70px] border-[1px] focus:outline-none pt-[7px] px-[8px] text-[14px]' value={slogan} onChange={(e) => { setSlogan(e.target.value) }} placeholder='介绍一下自己吧 (不超过20个字符)'>
                    </textarea>
                </div>
                {/* 推荐一些人 */}
                {/* <div>
                    推荐一些人
                </div> */}
                {/* 确认按钮 */}
                <div className='mb-[80px] w-[180px] h-[40px] border-[1px] bg-orange-200 flex items-center justify-center rounded-lg'
                    onClick={summit}>
                    确认
                </div>
            </div>
        </div>
    )
}

export default Account
