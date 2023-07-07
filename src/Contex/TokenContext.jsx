//import { useEffect } from 'react';
import { createContext } from 'react';
import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';

export const TokenContext = createContext(null);

export default function TokenProvider({children}){
    //const lsUser = JSON.parse(localStorage.getItem('user'))
    const [token, setToken] = useState('')
    //const navigate = useNavigate()

    /*useEffect(()=>{
        if(!lsUser.token){
            navigate('/sign-in')
        }else{
            navigate('/home')
        }
    },[])*/
    return(
        
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>    
        
    )   
}