import React, {createContext, FC, ReactChild, useState} from "react";

interface IAuthProvider {
    children: ReactChild
}


const AuthContext = createContext({});

const AuthProvider:FC<IAuthProvider> = ({children}) =>{
    const [user, setUser] = useState({})
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}