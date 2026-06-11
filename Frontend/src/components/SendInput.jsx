import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';

import axios from 'axios';
import { useDispatch,useSelector} from 'react-redux';
import { setMessages } from '../Redux/messageSlice';

const SendInput = () => {
  const [message,setMessage] =useState("")
  const dispatch = useDispatch()
  const {selectedUser} = useSelector(store=>store.user);
  const {messages} = useSelector(store=>store.message)
  const onSubmithandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser?._id}`, {message},{
        headers:{
          "content-type":"application/json"
        },
        withCredentials:true
      })
      // console.log(res)
      dispatch(setMessages([...messages,res?.data?.newMessage]))
    } catch (error) {
      console.log(error)
    }
    setMessage("")
    
  }
  return (
    <form onSubmit={onSubmithandler} className='px-3 md:px-5 py-3 md:py-4 border-t border-white/10 bg-slate-950/25 shrink-0'>
      <div className='w-full relative'>
        <input
        value={message}
        onChange={(e)=>{
          setMessage(e.target.value)
        }}
          type="text"
          placeholder="Send a message..."
          className='border text-sm rounded-2xl block w-full p-3 md:p-4 pr-12 border-white/15 bg-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-300'
        />
        <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4 text-cyan-300 hover:text-cyan-100'>
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
