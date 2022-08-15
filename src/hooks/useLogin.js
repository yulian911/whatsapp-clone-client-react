import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


export const useLogin = () => {
    const [err, setErr] = useState(null);
    const { dispatch } = useApp();
    const [isCancel ,setIsCancel]=useState(false)
    const [isPending, setIsPending] = useState(false);
  
    const login = (email, password) => {
      setErr(null);
      setIsPending(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          dispatch({ type: "LOGIN", payload: res.user });
          if(!isCancel){
            setErr(err.message)
            setIsPending(false)
        }
        })
        .catch((err) => {
          if(!isCancel){
            setErr(err.message)
            setIsPending(false)
  
        }
        });
    };
  
    useEffect(() => {
          
      return () => setIsCancel(true)
    
  }, [])
  
    return { err, login, isPending };
};