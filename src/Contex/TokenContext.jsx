import { useEffect } from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const TokenContext = createContext(null);

export default function TokenProvider({children}){
    const lsUser = JSON.parse(localStorage.getItem('user'))
    //console.log(lsUser.token)
    const [token, setToken] = useState(lsUser!== null ? lsUser.token : {})
    const navigate = useNavigate()
   // console.log(lsUser)
    useEffect(()=>{

        if(lsUser){
            navigate('/home')
        }else{
            navigate('/cadastro')
        }
        /*if(!lsUser){
            navigate('/')
        }else{
            navigate('/home')
        }*/
    },[])
    return(
        
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>    
        
    )   
}