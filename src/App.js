
import React from 'react';
import './App.css';
import ChatPage from './pages/ChatPage';
import {Routes,Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PublicRoute from './Layout/PublicRoute';
import PrivateRoute from './Layout/PrivateRoute';
import { useApp } from './context/AppContext';


function App() {
  const {authIsReady,user} =useApp()
  // console.log(process.env.REACT_APP_PUSHER_ID)
  return (
    
    <div className="app">
       {authIsReady && (
      <div className="app__body">
        <Routes>
          {!user&&
          <Route path='/' element={<PublicRoute/>}>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/signUp' element={<SignUpPage/>}/>
          </Route>
          }
          {user &&
          <Route path='/' element={<PrivateRoute/>}>
            <Route path='/' element={<ChatPage/>}/>
          </Route>
          }
          
        
        </Routes>

  
       
      </div>
       )}
    </div>
  );
}

export default App;
