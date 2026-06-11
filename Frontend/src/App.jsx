import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignUp from "./components/signUp";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setSocket } from "./Redux/socketSlice";
import { setOnlineUsers } from './Redux/userSlice';

// 👇 Routing setup
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/register", element: <SignUp /> },
  { path: "/login", element: <Login /> },
]);

function App() {
 
  const { authUser } = useSelector(store => store.user);
   const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:8080", {
        transports: ["websocket"], 
        withCredentials: true,
        query:{userId: authUser._id}
      });
      dispatch(setSocket(newSocket)); 

     
      newSocket?.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });

      return () => newSocket.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }

  },[authUser]);

  return (
    <div className="relative min-h-dvh overflow-x-hidden overflow-y-auto px-4 py-6 flex justify-center items-start lg:items-center">
      <div className="bg-orb absolute -top-24 -left-24 h-72 w-72 bg-cyan-400/25"></div>
      <div className="bg-orb bg-orb-delay absolute top-1/4 -right-20 h-64 w-64 bg-fuchsia-500/25"></div>
      <div className="bg-orb bg-orb-slow absolute -bottom-28 left-1/4 h-80 w-80 bg-blue-500/20"></div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="bg-particle left-[3%] bottom-[-2rem]"></span>
        <span className="bg-particle left-[7%] bottom-[18%]"></span>
        <span className="bg-particle left-[12%] bottom-[-5rem]"></span>
        <span className="bg-particle left-[17%] bottom-[34%]"></span>
        <span className="bg-particle left-[24%] bottom-[-3rem]"></span>
        <span className="bg-particle left-[31%] bottom-[12%]"></span>
        <span className="bg-particle left-[39%] bottom-[-6rem]"></span>
        <span className="bg-particle left-[47%] bottom-[28%]"></span>
        <span className="bg-particle left-[55%] bottom-[-4rem]"></span>
        <span className="bg-particle left-[64%] bottom-[10%]"></span>
        <span className="bg-particle left-[72%] bottom-[-5rem]"></span>
        <span className="bg-particle left-[79%] bottom-[38%]"></span>
        <span className="bg-particle left-[86%] bottom-[-2rem]"></span>
        <span className="bg-particle left-[91%] bottom-[20%]"></span>
        <span className="bg-particle left-[96%] bottom-[-6rem]"></span>
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
