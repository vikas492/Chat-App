import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../Redux/userSlice';

const BASE_URL="http://localhost:8080"

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      // console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
  }
  return (
    <div className="relative z-10 w-full max-w-md mx-auto">
      <div className='w-full p-8 rounded-3xl shadow-2xl shadow-cyan-950/50 bg-slate-950/60 backdrop-blur-2xl border border-white/15'>
        <div className='mb-7 text-center'>
          <p className='text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300'>Welcome back</p>
          <h1 className='mt-2 text-4xl font-black text-white'>Login</h1>
          <p className='mt-2 text-sm text-slate-300'>Jump back into your conversations.</p>
        </div>
        <form onSubmit={onSubmitHandler} action="">

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-slate-200'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full input input-bordered h-11 rounded-2xl bg-white/10 text-white placeholder:text-slate-400 border-white/15 focus:border-cyan-300'
              type="text"
              placeholder='Username' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-slate-200'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input input-bordered h-11 rounded-2xl bg-white/10 text-white placeholder:text-slate-400 border-white/15 focus:border-cyan-300'
              type="password"
              placeholder='Password' />
          </div>
          <p className='text-center my-4 text-sm text-slate-300'>Don't have an account? <Link className='font-semibold text-cyan-300 hover:text-cyan-200' to="/register"> signup </Link></p>
          <div>
            <button type="submit" className='btn btn-block h-11 rounded-2xl border-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white shadow-lg shadow-cyan-500/20 hover:scale-[1.01]'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
