import create from "zustand";
import {persist} from 'zustand/middleware';

const authStore = (set)=>({
    userProfile:{},
    addUser:(user)=>set({userProfile:user}),
    removeUser:()=>set({userProfile:null}),
});

const useAuthStore = create(
    persist(authStore,{
        name:'user'
    })
)

export default useAuthStore