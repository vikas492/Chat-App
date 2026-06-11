import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);
  const senderUser = message?.senderId === authUser?._id ? authUser : selectedUser;
  const senderInitial = senderUser?.fullname?.slice(0, 1)?.toUpperCase() || "?";

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Format timestamp (assumes message.createdAt is ISO string or Date)
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    // Options for time string like 10:30 PM
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      ref={scroll}
      className={`chat ${message?.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-image avatar">
        <div className="relative flex w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full ring-2 ring-white/15 bg-gradient-to-br from-cyan-400/80 to-fuchsia-500/80 text-white font-black overflow-hidden">
          <span className="absolute inset-0 flex items-center justify-center text-base">{senderInitial}</span>
          <img
            className="absolute inset-0 h-full w-full object-cover"
            alt="Profile"
            src={senderUser?.profilePhoto}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs text-slate-400">
          {formatTime(message?.createdAt)}
        </time>
      </div>
      <div
        className={`chat-bubble border border-white/10 shadow-lg ${message?.senderId !== authUser?._id ? "bg-white/90 text-slate-950" : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"}`}
      >
        {message?.message}
      </div>
    </div>
  );
};

export default Message;
