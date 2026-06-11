import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../Redux/userSlice'; // ✅ make sure this is PascalCase


const MessageContainer = () => {
  const { selectedUser, authUser,onlineUsers } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const isOnline = onlineUsers?.includes(selectedUser?._id);
  const selectedInitial = selectedUser?.fullname?.slice(0, 1)?.toUpperCase() || "?";

  return (
    <>
      {
        
        selectedUser !== null ? (
          <div className='w-full md:min-w-[650px] flex-1 min-h-0 flex flex-col bg-slate-900/25'>
            <div className='flex gap-3 items-center bg-white/10 text-white px-4 md:px-5 py-3 md:py-4 mb-2 border-b border-white/10 shrink-0'>
              <div className={`avatar ${isOnline ? 'online' : ''}`}>
                <div className='relative flex w-11 h-11 md:w-12 md:h-12 items-center justify-center rounded-full ring-2 ring-white/20 bg-gradient-to-br from-cyan-400/80 to-fuchsia-500/80 text-white font-black overflow-hidden'>
                  <span className='absolute inset-0 flex items-center justify-center text-lg'>{selectedInitial}</span>
                  <img
                    className='absolute inset-0 h-full w-full object-cover'
                    src={selectedUser?.profilePhoto}
                    alt="user-profile"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>

              <div className='flex flex-col flex-1'>
                <div className='flex justify-between gap-2'>
                  <p className='text-base md:text-lg font-bold truncate'>{selectedUser?.fullname}</p>
                </div>
                <p className={`text-xs ${isOnline ? 'text-emerald-300' : 'text-slate-400'}`}>{isOnline ? 'Online' : 'Last seen recently'}</p>
              </div>
            </div>
            <Messages />
            <SendInput />
          </div>
        ) : (
          <div className='w-full md:min-w-[650px] flex-1 min-h-0 flex flex-col justify-center items-center text-center px-8 bg-slate-900/25'>
                        <div className='mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-4xl shadow-2xl shadow-cyan-500/20'>💬</div>
                        <h1 className='text-4xl text-white font-black'>Hi, {authUser?.fullname}</h1>
                        <h1 className='mt-2 text-xl text-slate-300'>Select someone from the sidebar and start a conversation.</h1>

                    </div>
        )
      }
      
    </>
  );
};

export default MessageContainer;
