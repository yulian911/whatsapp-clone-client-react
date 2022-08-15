import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useApp} from '../context/AppContext'


export const useLogout = () => {

  const { dispatch } = useApp()
  
  const logout = async () => {
    signOut(auth)
    .then(()=>{
      // console.log('user signed out')
      dispatch({type:"LOGOUT" })
    })
    .catch((err)=>{
      console.lof(err.message)
    })

  }
  return { logout }
}