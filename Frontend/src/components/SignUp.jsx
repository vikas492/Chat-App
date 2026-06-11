import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; // ✅ Correct
import axios from "axios";
import toast from 'react-hot-toast';


const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""

  });

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending user:", user);
 
      const res = await axios.post("http://localhost:8080/api/v1/user/register", user, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
       
      }
       )
      //  console.log(res)
      if(res.data.success){
        
        toast.success(res.data.message)
        navigate("/login")
      }
    } catch (error) {
       toast.error(error.response.data.message)
      console.log(error)
    }
    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: ""
    })
  };

  return (
    <div className="relative z-10 w-full max-w-md mx-auto" >
      <div className="w-full p-8 rounded-3xl shadow-2xl shadow-fuchsia-950/50 backdrop-blur-2xl bg-slate-950/60 border border-white/15">
        <div className='mb-7 text-center'>
          <p className='text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-300'>Create account</p>
          <h1 className="mt-2 text-4xl font-black text-white">Signup</h1>
          <p className='mt-2 text-sm text-slate-300'>Meet people online and start chatting.</p>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-slate-200">Full Name</span>
            </label>
            <input
              value={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              className="w-full input input-bordered h-11 rounded-2xl bg-white/10 text-white placeholder:text-slate-400 border-white/15 focus:border-fuchsia-300"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-slate-200">User Name</span>
            </label>
            <input
              value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full input input-bordered h-11 rounded-2xl bg-white/10 text-white placeholder:text-slate-400 border-white/15 focus:border-fuchsia-300"
              type="text"
              placeholder="User Name"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-slate-200">Password</span>
            </label>
            <input
              value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-11 rounded-2xl bg-white/10 text-white placeholder:text-slate-400 border-white/15 focus:border-fuchsia-300"
              type="Password"
              placeholder="Password"
            />
          </div><div>
            <label className="label p-2">
              <span className="text-base label-text text-slate-200">Confirm password</span>
            </label>
            <input
              value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className="w-full input input-bordered h-11 rounded-2xl bg-white/10 text-white placeholder:text-slate-400 border-white/15 focus:border-fuchsia-300"
              type="Password"
              placeholder="Confirm password"
            />
          </div>
          <div className='flex items-center gap-3 my-5'>
            <div className='flex flex-1 items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-slate-200'>
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                defaultChecked
                className="checkbox checkbox-info mx-2" />
            </div>
            <div className='flex flex-1 items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-slate-200'>
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="checkbox checkbox-secondary mx-2" />
            </div>
          </div>
          <p className='text-center my-4 text-sm text-slate-300'>Already have an account? <Link className='font-semibold text-fuchsia-300 hover:text-fuchsia-200' to="/login"> login </Link></p>
          <div>
            <button type='submit' className='btn btn-block h-11 rounded-2xl border-0 bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white shadow-lg shadow-fuchsia-500/20 hover:scale-[1.01]'>Singup</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
