import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser, logoutUser, getCurrentUser } from "../features/auth/services/authApi";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const login = async (email, password) => {
        await loginUser(email, password)
        await fetchCurrentUser()
    }

    const register = async (email, password) => {
        await registerUser(email, password)
    }

    const logout = async () => {
        try{
            await logoutUser()
        }
        finally{
            setCurrentUser(null)
        }
    }

    const fetchCurrentUser = async () => {
        
        try {
            const user = await getCurrentUser()
            setCurrentUser(user)
        } catch (error) {
            setCurrentUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCurrentUser()
    }, [])

    return(
        <AuthContext.Provider
            value={{currentUser,
                loading,
                login,
                logout,
                register,
                fetchCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext