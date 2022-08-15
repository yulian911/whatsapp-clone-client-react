import {useState,useEffect} from 'react'
import { useApp } from '../context/AppContext'
import { auth,db} from '../firebase'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { doc, setDoc,Timestamp } from 'firebase/firestore'


export const useSignUp =()=>{
    const [err ,setErr]=useState(null)
    const [isCancel ,setIsCancel]=useState(false)
    ///isCancel sluz do czyszczenia funkcji
    const [isPending ,setIsPending]=useState(null)
    const {dispatch}=useApp()

    const signup = async (email,password,displayName)=>{
        setErr(null)
        setIsPending(true)
         // signup user

           await createUserWithEmailAndPassword(auth,email,password)
          .then((res)=>{
              dispatch({type:"LOGIN",payload:res.user})

               updateProfile(res.user,{
                displayName
              })
              setDoc(doc(db,'users',res.user.uid),{
                uid:res.user.uid,
                name:displayName,
                email:res.user.email,
                createAt:Timestamp.fromDate(new Date()),
                isOnline:true
              })


              if(!isCancel){
                setIsPending(false)
                setErr(null)
              }
          })
          .catch((err)=>{
            if(!isCancel){
                // console.log(error.message)
                setErr(err.message)
                setIsPending(false)

            }
          })
     
    }
    useEffect(() => {
    return () => setIsCancel(true)
    }, [])
    
    return {err ,isPending ,signup}

}