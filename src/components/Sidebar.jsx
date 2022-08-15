import React from 'react'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import {useLogout} from '../hooks/useLogout'
import { Avatar, IconButton } from '@mui/material';
import './sidebar.css'
import SiderbarChat from './SiderbarChat';




const Sidebar = ({setChannels,messages}) => {

  const { logout } = useLogout()
  // const channel =  [...new Array(6)].map((_,index)=><SiderbarChat channels={channels} setChannels={setChannels}/>)
  const channel =[
    {name:'global',message:'last message'},
    {name:'party',message:'last message'},
    {name:'vixa',message:'last message'},
  ]

  

  return (
    <div className='sidebar'>
        <div className="sidebar__header">
          <Avatar src='https://i.wpimg.pl/1200x/filerepo.grupawp.pl/api/v1/display/embed/c3ce1a59-9b11-4b37-bf71-db88102fba3a'/>
          <div className="sidebar__headerRight">
            <IconButton>
              <DonutLargeIcon onClick={logout}/>
            </IconButton>
            <IconButton>
              <ChatIcon/>
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>

          </div>
        </div>
        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
              <SearchOutlined/>
              <input placeholder='Search' type="text" />
            </div>
        </div>
        <div className="sidebar_chats">
            {channel.map((el,idx)=>(
              <SiderbarChat {...el} key={idx}  setChannels={setChannels} messages={messages}/>
            ))}
      
       
        </div>
    </div>
  )
}

export default Sidebar