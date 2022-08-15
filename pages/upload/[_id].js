import React, { useEffect, useState } from 'react'

import { client } from '../../utils/client';
import axios from 'axios'
import Router, { useRouter } from 'next/router'
import { nanoid } from 'nanoid'
import { BASE_URL } from '../../utils'

import styles from '../../styles/Home.module.css'
import { FiPlus } from 'react-icons/fi'
import { RiLoader2Line } from 'react-icons/ri'
import useAuthStore from '../../store/authStore'


const Upload = () => {
    
    const { userProfile } = useAuthStore();
    const hh = [
        {
            "_id": "Pg04jLvOaH8JnYs7HqQw46",
            "image": {
                "_id": "file-da6c9cc6867b9346d7926aae2676bdefa22906aa-jpg",
                "type": "image",
                "url": "https://cdn.sanity.io/files/enmunihr/production/da6c9cc6867b9346d7926aae2676bdefa22906aa.jpg"
            },
            "nickName": "4525"
        },
        {
            "_id": "Pg04jLvOaH8JnYs7HqQtI2",
            "image": {
                "_createdAt": "2022-07-29T15:00:17Z",
                "_id": "file-da6c9cc6867b9346d7926aae2676bdefa22906aa-jpg",
                "_rev": "GGj2zI7BEOukYB0dM0bV5R",
                "_type": "sanity.fileAsset",
                "_updatedAt": "2022-08-15T10:41:59Z",
                "assetId": "da6c9cc6867b9346d7926aae2676bdefa22906aa",
                "extension": "jpg",
                "mimeType": "image/jpeg",
                "originalFilename": "微信图片_20220728222900.jpg",
                "path": "files/enmunihr/production/da6c9cc6867b9346d7926aae2676bdefa22906aa.jpg",
                "sha1hash": "da6c9cc6867b9346d7926aae2676bdefa22906aa",
                "size": 191259,
                "uploadId": "wKzXuehJrRki1VsnCAKNcMRUplgX9RSS",
                "url": "https://cdn.sanity.io/files/enmunihr/production/da6c9cc6867b9346d7926aae2676bdefa22906aa.jpg"
            },
            "nickName": "gt"
        },
        {
            "_id": "GGj2zI7BEOukYB0dM0b9aj",
            "image": "",
            "nickName": "iii"
        },
        {
            "_id": "Pg04jLvOaH8JnYs7HqQksQ",
            "image": {
                "_id": "file-da6c9cc6867b9346d7926aae2676bdefa22906aa-jpg",
                "url": "https://cdn.sanity.io/files/enmunihr/production/da6c9cc6867b9346d7926aae2676bdefa22906aa.jpg"
            },
            "nickName": "5244252"
        },
        {
            "_id": "Pg04jLvOaH8JnYs7HqPcfK",
            "image": {
                "_id": "file-091d284a16a56de3f738edf44dfe72e9c555284d-jpg",
                "url": "https://cdn.sanity.io/files/enmunihr/production/091d284a16a56de3f738edf44dfe72e9c555284d.jpg"
            },
            "nickName": "niuniuniu的我的"
        },
        {
            "_id": "hsGnO0XXxm1bvZuR7YIbOP",
            "image": null,
            "nickName": null
        },
        {
            "_id": "hsGnO0XXxm1bvZuR7YIOyT",
            "image": null,
            "nickName": null
        },
        {
            "_id": "GGj2zI7BEOukYB0dM0T4Wg",
            "image": null,
            "nickName": null
        },
        {
            "_id": "Pg04jLvOaH8JnYs7HqOUu0",
            "image": null,
            "nickName": null
        },
        {
            "_id": "GGj2zI7BEOukYB0dM0G7zk",
            "image": null,
            "nickName": null
        },
        {
            "_id": "Pg04jLvOaH8JnYs7HqN5Wg",
            "image": null,
            "nickName": null
        },
        {
            "_id": "Pg04jLvOaH8JnYs7HqN4y8",
            "image": null,
            "nickName": null
        },
        {
            "_id": "Pg04jLvOaH8JnYs7HqN3oK",
            "image": null,
            "nickName": null
        },
        {
            "_id": "GGj2zI7BEOukYB0dM0Fv3v",
            "image": null,
            "nickName": null
        },
        {
            "_id": "Pg04jLvOaH8JnYs7HqMzdY",
            "image": null,
            "nickName": null
        },
        {
            "_id": "GGj2zI7BEOukYB0dM0FLo8",
            "image": null,
            "nickName": null
        },
        {
            "_id": "Pg04jLvOaH8JnYs7HqM9Bw",
            "image": null,
            "nickName": null
        },
        {
            "_id": "hsGnO0XXxm1bvZuR7Xkv9J",
            "image": null,
            "nickName": null
        },
        {
            "_id": "Pg04jLvOaH8JnYs7HqIqjO",
            "image": null,
            "nickName": null
        },
    ]
    const [text, setText] = useState('');
    const [topic, setTopic] = useState('生活');
    const [images, setImages] = useState([]);

    const [loading, setLoading] = useState(false);
    const [wrongFileType, setWrongFileType] = useState(false);
    const [savingPost, setSavingPost] = useState(false);
    const [screenW, setScreenW] = useState(326);
    useEffect(() => {
        // console.log(window.innerWidth)
        setScreenW(window.innerWidth)
    }, [])
    useEffect(()=>{
        console.log(images,789789)
    },[images])
    const deleteAll=async()=>{
        const { data } = await axios.get(`${BASE_URL}/api/getAllUsers`);
        console.log(data);
        // hh.forEach(item=>{
        //     axios.get(`${BASE_URL}/api/delUser/${item._id}`);
        // })
    }

    const discard = () => {
        setText('');
        setImages([]);
        setTopic('生活')
    }
    useEffect(() => {
        console.log(images, 123)
    }, [images])
    const uploadPoject = async (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile, 555)
        // console.log(client)
        const fileTypes = ['image/jpeg', 'image/webp', 'image/png'];

        // uploading asset to sanity
        if (fileTypes.includes(selectedFile.type)) {
            setWrongFileType(false);
            setLoading(true);

            client.assets
                .upload('file', selectedFile, {
                    contentType: selectedFile.type,
                    filename: selectedFile.name,
                })
                .then((data) => {
                    setImages([...images, { _id: data._id, url: data.url }]);
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setWrongFileType(true);
        }
    };
    const handlePost = async () => {
        if (text && images.length != 0 && topic) {
            setSavingPost(true);
            function getTimeTwo() {
                let now = new Date();
                let _month = (10 > (now.getMonth() + 1)) ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
                let _day = (10 > now.getDate()) ? '0' + now.getDate() : now.getDate();
                let _hour = (10 > now.getHours()) ? '0' + now.getHours() : now.getHours();
                let _minute = (10 > now.getMinutes()) ? '0' + now.getMinutes() : now.getMinutes();
                let _second = (10 > now.getSeconds()) ? '0' + now.getSeconds() : now.getSeconds();
                return now.getFullYear() + '-' + _month + '-' + _day + ' ' + _hour + ':' + _minute + ':' + _second;
            }
            function imageArr(images) {
                let arr = [];
                images.forEach(image => {
                    arr.push({
                        _type: 'image',
                        _key: nanoid(),
                        asset: {
                            _type: 'reference',
                            _ref: image?._id,
                        },
                    })
                })
                return arr;
            }
            // console.log(imageArr(images),87998456)
            const doc = {
                _type: 'project',
                description: text,
                images: imageArr(images),
                postedBy: {
                    _type: 'reference',
                    _ref: userProfile?._id,
                },
                type: topic,
                time: getTimeTwo(),
            };

            await axios.post(`${BASE_URL}/api/post`, doc);

            Router.push('/');
        } else {
            console.log('缺少东西')
        }
    };

    let width = screenW;
    if (width >= 700) {
        width = 700;
    }
    let contentW = width - 16;
    let imgW = (contentW - 3 * 5) / 4;
    const type = ['生活', '美食', '电影', '游戏', '校园', '代码', '星座', '新闻', '音乐', '宠物', '风景', '情感'];

    return (
        <div className='z-10 w-full h-full flex justify-center items-center '>
            <div className='bg-white h-full w-full flex flex-col  justify-start  p-[8px]'>
                {/* 文字 */}
                <div className='w-full '>
                    <textarea className='w-full h-[70px] focus:outline-none text-[12px] md:text-[15px] md:h-[110px]' value={text} onChange={(e) => { setText(e.target.value) }} placeholder='分享新鲜事...'>
                    </textarea>
                </div>
                {/* 添加与展示图片 */}
                <div className='mx-auto grid grid-cols-4 gap-[5px] md:mx-0' style={{ width: `${contentW}px` }}>
                    {images?.map((image) => {
                        return (
                            <div key={image.url} className='bg-gray-200' style={{ height: `${imgW}px`, backgroundImage: `url(${image.url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        )
                    })}
                    <div className='bg-white border-[2px] border-dashed' style={{ height: `${imgW}px`, width: `${imgW}px` }}>
                        <label className='h-full flex justify-center items-center text-gray-200 text-[30px]'>
                            {loading ? (
                                <div className='flex flex-col justify-center items-center text-[12px]'>
                                    <RiLoader2Line className='text-[18px]' />
                                    <div>loading</div>
                                </div>
                            ) : (
                                <FiPlus />
                            )}
                            <input
                                type='file'
                                name='upload-video'
                                onChange={(e) => uploadPoject(e)}
                                className='w-0 h-0'
                            />
                        </label>
                    </div>

                </div>
                {/* 选择类别 */}
                <div className='w-full py-[3px] my-[30px] flex justify-center border-y-[1px] md:my-[50px]'>

                    <div className={`h-full w-full overflow-x-auto flex items-center ${styles.hidden_scroll}`}>
                        {/* <div className='hidden md:block text-[18px] font-[500] md:py-[5px]
                            lg:w-11/12 lg:mx-auto'>分类</div> */}
                        {type.map(item => {
                            if (item == topic) {
                                return (
                                    <div key={item} className='border-red-600 text-red-600 flex-none px-2 py-[1px] rounded-md mx-2 border-[1px] text-[12px]
                                    md:px-[15px] md:py-[4px] md:mx-[10px] md:my-[5px] md:text-[14px]'>{item}</div>
                                )
                            } else {
                                return (
                                    <div key={item} className='flex-none px-2 py-[1px] rounded-md mx-2 border-[1px] border-gray-400 text-gray-600 text-[12px]
                                     md:px-[15px] md:py-[4px] md:mx-[10px] md:my-[5px] md:text-[14px]' onClick={() => { setTopic(item) }}>{item}</div>
                                )
                            }
                        })}
                    </div>
                </div>
                {/* 撤销/发布 */}
                <div className='w-full flex justify-evenly items-center'>
                    <button className='py-[5px] flex-1 mr-[10px] bg-gray-200 border-[1px] rounded-md md:px-[60px] md:py-[10px] md:text-[17px]' onClick={discard}>撤销</button>
                    {savingPost ? (
                        <button className='py-[5px] flex-1 border-[1px] bg-gray-200 rounded-md md:px-[60px] md:py-[10px] md:text-[17px]'>发布中...</button>
                    ) : (
                        <button className='py-[5px] flex-1 border-[1px] bg-orange-400 rounded-md md:px-[60px] md:py-[10px] md:text-[17px]' onClick={handlePost}>发布</button>
                    )}
                </div>
                <div className='m-[60px] bg-one' onClick={deleteAll}>
                    shanchu
                </div>
            </div>

        </div>
    )
}

export default Upload
