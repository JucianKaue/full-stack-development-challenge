/* eslint-disable react/prop-types */
import { createContext, useState } from "react";


export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const userId = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    const [user, setUser] = useState({user: userId, token: token})

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}