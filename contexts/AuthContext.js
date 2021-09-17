import React, { useEffect, useState, useContext } from 'react'
import { signin, signup, forgot, logout, loadUser, update } from '../services/firebase' 
import { isGuestRoutes } from '../services/utils'
import { useRouter } from 'next/router'
import {Spinner} from 'react-bootstrap'
import ToastModal from '../components/ToastModal'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [messager, setMessager] = useState(null)
    
    useEffect(() => {
        const subscribe = loadUser(user => {
            setCurrentUser(user)
            setLoading(false)
            !user && !isGuestRoutes(router.asPath) && router.push("/")
        })
        return subscribe
    }, [])
    

    const value = {
        currentUser,
        setMessager,
        signin,
        signup,
        forgot,
        logout,
        update
    }

    if(loading){
        return (
            <div className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh'}}>
                <Spinner animation="grow" />
            </div>
        )
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
            <ToastModal message={messager && messager.message} onClose={() => setMessager(null)} variant={messager && messager.variant} />
        </AuthContext.Provider>
    )
}
