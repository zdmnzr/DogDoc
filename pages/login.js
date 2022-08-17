import React, { useState } from 'react'
import Router, { useRouter } from 'next/router'
import axios from 'axios'
import useAuthStore from '../store/authStore'
import { BiChevronLeft } from 'react-icons/bi'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BASE_URL } from '../utils'

const Login = () => {
    
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [errAcc, seterrAcc] = useState(false);
    const [errPass, seterrPass] = useState(false);
    const [hasAcc, setHasAcc] = useState(false);
    const { userProfile, addUser } = useAuthStore();
    const [log, setLog] = useState(true);
    // console.log(userProfile,22,addUser,8798)
    const loginSubmit = async (e) => {
        if (log == true) {
            e.preventDefault()

            const { data } = await axios.get(`${BASE_URL}/api/user/${account}`)
            console.log(data, 89645)

            if (data[0].password === password) {
                Router.push(`/`)
                addUser({ ...data[0], password: '' })
                console.log('成功登录')
            } else {
                console.log('登录失败')
            }
        } else {
            setLog(true);
        }
    }
    const signSubmit = async (e) => {

        if (log == false) {
            seterrAcc(false);
            seterrPass(false)
            if (account.length < 6 || account.length > 14) {
                seterrAcc(true);
            }
            if (password.length < 6 || password.length > 14) {
                seterrPass(true);
            }
            //注册
            // console.log(account,password)
            e.preventDefault()
            const { data } = await axios.get(`${BASE_URL}/api/user/${account}`)
            if (data.length == 0) {
                const newUser = {
                    _type:'user',
                    account:account,
                    password:password,
                }
                await axios.post(`${BASE_URL}/api/sign`, newUser);
               
                const  hhh  = await axios.get(`${BASE_URL}/api/user/${account}`)
                console.log(hhh)
                const _id = hhh.data[0]._id
                Router.push(`/userDetail/${_id}`)
            } else {
                setHasAcc(true);
                setTimeout(() => {
                    setHasAcc(false);
                }, 1000);
            }
            // Router.push(`/personal/${_id}`)
        } else {
            setLog(false);
        }
    }

    return (
        <div className='w-full h-full flex flex-col items-center p-[8px] bg-gray-100 relative'>
            {hasAcc && (
                <div className='flex items-center justify-center text-white absolute top-[240px] w-[150px] h-[120px] bg-gray-600 opacity-80 rounded-xl'>
                    该账号已被注册
                </div>
            )}
            <div className='w-full flex justify-between items-center'>
                <div>
                    <div onClick={() => { Router.push(`/`) }} className='w-[25px] h-[25px] bg-gray-800 rounded-full text-white text-[20px] bg-opacity-50 flex justify-center items-center'> <BiChevronLeft /> </div>
                </div>
                <div>
                    <div className='w-[25px] h-[25px] bg-gray-800 rounded-full text-white text-[20px] bg-opacity-50 flex justify-center items-center'> <BiDotsHorizontalRounded /> </div>
                </div>
            </div>
            <div className='w-9/12 bg-white mt-[70px] rounded-2xl shadow-xl flex flex-col items-center p-[8px]'>
                <div className='flex justify-center items-center my-[50px]'>
                    <img src="/dd.jpg" alt="Dog-Doc" className='w-10/12' />
                </div>
                <div className='w-10/12 flex flex-col items-center'>
                    <input type='text' className='w-full border-[1px] h-[40px] px-[10px] focus:outline-none focus:border-orange-500 ' placeholder='账号' value={account} onChange={(e) => { setAccount(e.target.value) }}></input>
                    {/* {errAcc && (<div className='text-red-600 text-[14px] leading-[15px]'>erracc</div>)} */}
                    <input type='password' className='w-full border-[1px] h-[40px] px-[10px] focus:outline-none focus:border-orange-500 mt-[20px] mb-[40px]' placeholder='密码' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                    {/* {errAcc && (<div>errpass</div>)} */}
                    {log ? (
                        <div className='flex flex-col items-center'>
                            <div onClick={loginSubmit} className='px-[60px] py-[8px] bg-orange-200 rounded-md text-[16px] mb-[10px]'>登录</div>
                            <div onClick={signSubmit} className='text-[14px] text-gray-400 mb-[50px]'>注册</div>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center'>
                            <div onClick={signSubmit} className='px-[60px] py-[8px] bg-orange-200 rounded-md text-[16px] mb-[10px]'>注册</div>
                            <div onClick={loginSubmit} className='text-[14px] text-gray-400 mb-[50px]'>登录</div>
                        </div>
                    )}

                </div>
            </div>


            {/* <form onSubmit={loginSubmit}>
                <input type='text' value={account} onChange={(e)=>{setAccount(e.target.value)}}></input>
                <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                <button onClick={()=>{}}>登录</button>
            </form>
            <div onClick={() => { Router.push(`/`) }}>返回</div> */}
        </div>
    )
}

export default Login