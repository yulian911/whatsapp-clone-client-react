
import React, { useState } from 'react'
import './login.css'
import {GoogleButton} from 'react-google-button'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import { useApp } from '../context/AppContext';
import  {useSignUp} from '../hooks/useSignUp'
import {useNavigate} from 'react-router-dom'

const SignUpPage = () => {
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[displayName,setDisplayName]=useState('')
  const{signup}=useSignUp()
  const {googleSignIn} =useApp()
  const [show,setShow]=useState(false)
  const [lower,setLower]=useState(false)
  const [upper,setUpper]=useState(false)
  const [number,setNumber]=useState(false)
  const [special,setSpecial]=useState(false)
  const [length,setLength]=useState(false)
  const navigate =useNavigate

  const handleGoogleSignIn =async()=>{
    try{
      await googleSignIn()
    }catch(err){
      console.log(err)

    }
    
  }

  const checkPassword =(e)=>{
    const lower=new RegExp('(?=.*[a-z])')
    const upper =new RegExp('(?=.*[A-Z])')
    const number =new RegExp('(?=.*[0-9])')
    const special =new RegExp('(?=.*[!@#$%^&*])')
    const lenght =new RegExp('(?=.{8,})')
 

    if(e.target.value.match(lower)!=null){
      setLower(true)
    }else{
      setLower(false)
    }
    if(e.target.value.match(upper)!=null){
      setUpper(true)
    }else{
      setUpper(false)
    }
    if(e.target.value.match(number)!=null){
      setNumber(true)
    }else{
      setNumber(false)
    }
    if(e.target.value.match(special)!=null){
      setSpecial(true)
    }else{
      setSpecial(false)
    }
    if(e.target.value.match(lenght)!=null){
      setLength(true)
    }else{
      setLength(false)
    }

    setPassword(e.target.value)
 
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    await signup(email,password,displayName)
    setEmail("")
    setDisplayName('')
    setPassword('')
    navigate('/')
    
  }


  return (
    <div className='login'>
      <div className="sign__inputBox">
        <form onSubmit={handleSubmit}>
        <div>
            <input type="text"  placeholder='displayName' value={displayName} onChange={(e)=>setDisplayName(e.target.value)}/>
          </div>
          <div>
            <input type="text"  placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="login__iconButton">
            <input type={show?"text":"password"} placeholder='password' value={password} onChange={checkPassword} />
            <IconButton onClick={()=>setShow(!show)}>
              {show?<VisibilityOffIcon />:<VisibilityIcon/>}
              
            </IconButton>
          </div>

          <button>SignUp</button>
          <GoogleButton onClick={handleGoogleSignIn}/>
          

        </form>
      </div>
      <div className="login__validation">
        <ul>
          <li className={lower?'valid':''}>At least one lowercase character </li>
          <li className={upper?'valid':''}>At least one uppercase character </li>
          <li className={number?'valid':''}>At least one number </li>
          <li className={special?'valid':''}>At least one special character </li>
          <li className={length?'valid':''}>At least 8  characters </li>
        </ul>
      </div>

    </div>
  )
}

export default SignUpPage