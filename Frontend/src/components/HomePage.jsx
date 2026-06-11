import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);
  return (
    <div className='relative z-10 flex flex-col md:flex-row w-full max-w-5xl h-[calc(100dvh-2rem)] md:h-[calc(100dvh-3rem)] min-h-[620px] md:min-h-[520px] max-h-[820px] md:max-h-[720px] rounded-3xl overflow-hidden border border-white/15 bg-slate-950/55 shadow-2xl shadow-cyan-950/50 backdrop-blur-2xl'>
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default HomePage
