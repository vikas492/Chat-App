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
      const res = await axios.get("http://localhost:8080/api/v1/user/logout")
      navigate("/login")
      toast.success(res.data.message)
      dispatch(setAuthUser(null))
      //  dispatch(setMessages(null));
      //       dispatch(setOtherUsers(null));
      //       dispatch(setSelectedUser(null));
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
    <div className="border-b md:border-b-0 md:border-r border-white/10 p-4 flex flex-col bg-slate-950/45 backdrop-blur-xl h-[42%] md:h-full w-full md:max-w-xs mx-auto min-h-0">
      <div className="mb-4 shrink-0">
        <h2 className="text-2xl md:text-2xl font-black tracking-tight text-white">ChatSpace</h2>
        <p className="text-xs text-slate-400">Find someone online and say hello.</p>
      </div>
      <form onSubmit={searchSubmitHandler} action="" className="flex items-center gap-2 mb-3 shrink-0">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-2xl w-full bg-white/10 text-white placeholder:text-slate-400 border-white/15 focus:border-cyan-300"
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="btn rounded-2xl border-0 bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20 hover:bg-cyan-300">
          <BiSearchAlt2 className="w-6 h-6 outline-none" />
        </button>
      </form>

      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-3 shrink-0"></div>

      <OtherUsers />
      <div className='mt-2 shrink-0'>
        <button onClick={logoutHandler} className='btn btn-sm w-full rounded-2xl border border-white/10 bg-white/10 text-slate-100 hover:bg-red-500/80 hover:border-red-400'>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
