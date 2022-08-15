import React, { useState } from 'react'
import './login.css'
import {GoogleButton} from 'react-google-button'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';



const LoginPage = () => {
  const {googleSignIn} =useApp()
  const [show,setShow]=useState(false)


  const handleGoogleSignIn =async()=>{
    try{
      await googleSignIn()
    }catch(err){
      console.log(err)

    }
  }


  return (
    <div className='login'>
      <div className="login__inputBox">
        <form>
          <div>
            <input type="text"  placeholder='email'/>
          </div>
          <div className="login__iconButton">
            <input type={show?"text":"password"} placeholder='password'  />
            <IconButton onClick={()=>setShow(!show)}>
              {show?<VisibilityOffIcon />:<VisibilityIcon/>}
              
            </IconButton>
          </div>

          <button>Login</button>
          <GoogleButton onClick={handleGoogleSignIn}/>
          <Link to="/signUp"> Dont have accout ? Register </Link>
        </form>
        

      </div>
    </div>
  )
}

export default LoginPage