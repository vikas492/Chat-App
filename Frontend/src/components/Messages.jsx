import React from 'react';
import useGetMessages from '../hooks/useGetMessages';
import Message from './Message'; 
import { useSelector } from 'react-redux';
import getRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
  useGetMessages();
  getRealTimeMessage();

  const { messages } = useSelector(store => store.message); 

 

   return (
        <div className='px-4 flex-1 overflow-auto'>
            {
               messages && messages?.map((message) => {
                    return (
                        <Message key={message._id} message={message} />
                    )
                })
            }

        </div>


    )
}

export default Messages
