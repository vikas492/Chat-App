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
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" >
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg backdrop-blur-md bg-white/10 border border-white/30">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Signup</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Full Name</span>
            </label>
            <input
              value={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              className="w-full input input-bordered h-10 bg-white/20 text-white placeholder-white border-white/30"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">User Name</span>
            </label>
            <input
              value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full input input-bordered h-10 bg-white/20 text-white placeholder-white border-white/30"
              type="text"
              placeholder="User Name"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10 bg-white/20 text-white placeholder-white border-white/30"
              type="Password"
              placeholder="Password"
            />
          </div><div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Confirm password</span>
            </label>
            <input
              value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className="w-full input input-bordered h-10 bg-white/20 text-white placeholder-white border-white/30"
              type="Password"
              placeholder="Confirm password"
            />
          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                defaultChecked
                className="checkbox mx-2" />
            </div>
            <div className='flex items-center'>
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="checkbox mx-2" />
            </div>
          </div>
          <p className='text-center my-2'>Already have an account? <Link to="/login"> login </Link></p>
          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>Singup</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp