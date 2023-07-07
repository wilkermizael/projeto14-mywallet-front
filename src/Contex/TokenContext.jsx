import { createContext } from 'react';
import { useState } from 'react';

export const TokenContext = createContext(null);

export default function TokenProvider({children}){
    const [token, setToken] = useState('')
    return(
        
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>    
        
    )   
}