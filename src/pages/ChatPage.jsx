import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import Chat from '../components/Chat';
import Sidebar from '../components/Sidebar';

import axios from '../features/axios'



const ChatPage = () => {
    const[messages,setMessages]=useState([])
    const [channels,setChannels] = useState('vixa')

    useEffect(() => {
      axios.get(`/api/messages/sync?channel=${channels}`)
          .then(response => {
            
            setMessages(response.data)
          })
    }, [channels])
    
  
    useEffect(() => {
      const pusher = new Pusher(process.env.REACT_APP_PUSHER_ID, {
        cluster: 'eu'
      });
     
      let channel 

      if(channels==='global'){
        channel = pusher.subscribe('global');
        channel.bind('inserted', (newMessage)=> {
          // alert(JSON.stringify(newMessage));
          setMessages([...messages,newMessage])
        });
      }
      if(channels==='party'){
        channel = pusher.subscribe('party');
        channel.bind('hoot', (newMessage)=> {
          // alert(JSON.stringify(newMessage));
          setMessages([...messages,newMessage])
          
        });
    
      }
      if(channels=== 'vixa'){
        channel = pusher.subscribe('vixa');
        channel.bind('boom', (newMessage)=> {
          // alert(JSON.stringify(newMessage));
          setMessages([...messages,newMessage])
        });
       
      }
      return ()=>{
        channel.unbind_all()
        channel.unsubscribe();
  
      }
  
    
    }, [messages,channels])

    return (
<>
    <Sidebar setChannels={setChannels} />
    <Chat messages={messages} channels={channels}/>
</>
      
    
    );
  }

export default ChatPage