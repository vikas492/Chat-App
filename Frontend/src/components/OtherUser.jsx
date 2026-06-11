import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { setSelectedUser } from '../Redux/userSlice.js'


const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const {selectedUser, onlineUsers} = useSelector(store=>store.user);
    const isOnline = onlineUsers?.includes(user._id);
    const initials = user?.fullname?.slice(0, 1)?.toUpperCase() || "?";
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }
    return (
        <>
        <div
  onClick={() => selectedUserHandler(user)}
  className={`flex gap-3 items-center rounded-2xl p-3 cursor-pointer border transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:border-cyan-300/40 ${selectedUser?._id === user?._id ? 'bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 border-cyan-300/50 text-white shadow-lg shadow-cyan-950/30' : 'border-white/10 bg-white/5 text-slate-200'}`}
>
  <div className={`avatar ${isOnline ? 'online' : '' }`}>
    <div className='relative flex w-11 h-11 md:w-12 md:h-12 shrink-0 items-center justify-center rounded-full ring-2 ring-white/15 bg-gradient-to-br from-cyan-400/80 to-fuchsia-500/80 text-white font-black overflow-hidden'>
      <span className='absolute inset-0 flex items-center justify-center text-lg'>{initials}</span>
      <img
        className='absolute inset-0 h-full w-full object-cover'
        src={user?.profilePhoto}
        alt="user-profile"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  </div>
  <div className='flex flex-col flex-1'>
    <div className='flex justify-between gap-2'>
      <p className='font-semibold truncate'>{user?.fullname}</p>
    </div>
    <p className={`text-xs ${isOnline ? 'text-emerald-300' : 'text-slate-500'}`}>{isOnline ? 'Online now' : 'Offline'}</p>
  </div>
</div>
        </>
    )
}

export default OtherUser
