import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './sidebarChat.css'
import axios from '../features/axios'

const SiderbarChat = ({name,setChannels}) => {
  const[messages,setMessages]=useState([])

  useEffect(() => {
   
    axios.get(`/api/messages/sync`)
        .then(response => {
          
          setMessages(response.data.filter(msg=>msg.channel ===name))
        })
  }, [name,messages])

  const lastMessage = messages.length-1



  return (
    <div className='sidebarChat' onClick={()=>setChannels(name)}>
        <Avatar />
        <div className="sidebarChat__info">
            <h2>{name}</h2>
            <p>last message : {messages[lastMessage]?.message}</p>
        </div>
    </div>
  )
}

export default SiderbarChat