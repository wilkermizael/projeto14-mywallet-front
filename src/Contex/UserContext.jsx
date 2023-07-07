import { createContext } from 'react';
import { useState } from 'react';

export let UserContext = createContext(null);

export default function UserProvider({children}){
    const [user, setUser] = useState('');
    return(

    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
    
    )
}