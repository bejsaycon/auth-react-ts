import {createContext, FC, ReactChild, useState} from "react";

interface IAuthProvider {
    children: ReactChild
}

export type TUser = {
    usrnm: string,
    pass: string
} 

export type TUserContext = {
    auth: TUser|null
    setAuth: (user: TUser|null) => void
}

const AuthContext = createContext<TUserContext>({} as TUserContext);

const AuthProvider:FC<IAuthProvider> = ({children}) =>{
    const [auth, setAuth] = useState<TUser|null>(null)
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}