import React, { useEffect } from 'react'
import axios from "axios"
import { useDispatch } from "react-redux"
import { setOtherUsers } from '../Redux/userSlice'
const useGetOtherUsers = () => {
   const dispatch = useDispatch()
  useEffect(()=>{
    const fetchOtherUser = async ()=>{
        try {
            axios.defaults.withCredentials=true
            const res = await axios.get("http://localhost:8080/api/v1/user/")
            // console.log(res)
            dispatch(setOtherUsers(res.data)) 
        } catch (error) {
           console.log(error) 
        }
    }
    fetchOtherUser()
  },[])
}

export default useGetOtherUsers