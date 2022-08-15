import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import AttachFile from '@mui/icons-material/AttachFile'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import axios from '../features/axios'
import './chat.css'
import { useApp } from '../context/AppContext';


const Chat = ({messages,channels}) => {
  const [input,setInput]=useState('')
  const {user} =useApp()


  const scrollRef =useRef()
  useEffect(() => {
    const scrollToBottom = () => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    scrollToBottom()

  }, [input,messages])

  useEffect(() => {
    const scrollToBottom = () => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    scrollToBottom()

  }, [])

  const sendMessage =async(e)=>{
      e.preventDefault( )
      const data={
        message:input,
        name:user.displayName,
        timestamp:new Date().toLocaleString(),
        received:false,
        channel:channels
      }

      await axios.post('/api/messages/news',data)
      setInput("")
  }


  return (
    <div className='chat'>
      <div className="chat_header">
          <Avatar />
          <div className="chat_headerInfo">
            <h3>{channels}</h3>
            {/* <p>Last seen at ...</p> */}
          </div>
          <div className="chat_headerRight">
            <IconButton>
              <SearchOutlined/>
            </IconButton>
            <IconButton>
              <AttachFile/>
            </IconButton>
            <IconButton>
              <MoreVertIcon/>
            </IconButton>
          </div>
      </div>
      <div className="chat__body">
        {messages.filter(el=>el.channel===channels)?.map((el,idx)=>(
          <p className={`chat__message ${user.displayName ===el.name&& 'chat__reciever'}`} ref={scrollRef} key={idx}>
          <span className="chat__name">{el.name}</span>
          {el.message}
          <span className="chat__timestamp">
            {el.timestamp}
          </span>
 
        </p>
        ))}
      
        
        {/* <p className='chat__message chat__reciever'>
          <span className="chat__name">Yuli</span>
          This message 
          <span className="chat__timestamp">
            {new Date().toLocaleString()}
          </span>
 
        </p> */}
      </div>
      <div className="chat__footer">
          <InsertEmoticonIcon/>
          <form onSubmit={sendMessage}>
            <input 
            onChange={(e)=>setInput(e.target.value)}
            value={input}
            placeholder='Type a message'
            type='text'
            />
            <button type="submit">
              Send a message 
            </button>
          </form>
          <MicIcon/>
      </div>

    </div>
  )
}

export default Chat