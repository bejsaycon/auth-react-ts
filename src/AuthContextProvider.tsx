import {createContext, FC, ReactChild, useState} from "react";

interface IAuthProvider {
    children: ReactChild
}

export type TUser = {
    usrnm: string,
    pass: string
} 

export type TUserContext = {
    user: TUser|null
    setUser: (user: TUser|null) => void
}

const AuthContext = createContext({});

const AuthProvider:FC<IAuthProvider> = ({children}) =>{

    const [user, setUser] = useState(null)
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}