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
      const newSocket = io("https://chat-app-yjpv.onrender.com", {
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
    <div className="p-4 h-screen flex justify-center items-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
