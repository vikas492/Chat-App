import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import OtherUsers from "./OtherUsers.jsx"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser, setSelectedUser } from '../Redux/userSlice'; 
import { setOtherUsers } from '../Redux/userSlice';// ✅ Add this import

const Sidebar = () => {
  const [search, setSearch] = useState("")
  const { otherUsers } = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.get("https://chat-app-yjpv.onrender.com/api/v1/user/logout")
      navigate("/login")
      toast.success(res.data.message)
      dispatch(setAuthUser(null))
       dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error)
    }
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault()
    const conversationUser = otherUsers?.find((user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase())
    )
   if (conversationUser) {
  dispatch(setSelectedUser(conversationUser)); 
} else {
  toast.error("User Not Found");
}
  }

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col bg-white/10 backdrop-blur-lg h-full w-full max-w-md sm:max-w-xs mx-auto">
      <form onSubmit={searchSubmitHandler} action="" className="flex items-center gap-2 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md w-full bg-white/20 text-white placeholder-white border-white/30"
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="btn bg-zinc-700 text-white">
          <BiSearchAlt2 className="w-6 h-6 outline-none" />
        </button>
      </form>

      <div className="divider px-3"></div>

      <OtherUsers />
      <div className='mt-2'>
        <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
