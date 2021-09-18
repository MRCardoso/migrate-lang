import React, { useEffect, useState, useContext } from 'react'
import { signin, signup, forgot, logout, loadUser, update } from '../services/firebase/app' 
import { isGuestRoutes } from '../services/utils'
import { useRouter } from 'next/router'
import {Spinner} from 'react-bootstrap'
import ToastModal from '../components/ToastModal'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export default function AuthProvider({children, recall}) {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [notify, setNotify] = useState(null)

    const setMessager = (message) => {
        setNotify(null)
        setTimeout(() => setNotify(message), 50);
    }
    
    useEffect(() => {
        const subscribe = loadUser(user => {
            setCurrentUser(user)
            setLoading(false)
            !user && !isGuestRoutes(router.asPath) && router.push("/")
        })
        return subscribe
    }, [])
    
    useEffect(() => {
        if( recall && recall.message && recall.variant){
            setMessager(recall)
        }
    }, [recall])

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
            <ToastModal message={notify && notify.message} onClose={() => setNotify(null)} variant={notify && notify.variant} />
        </AuthContext.Provider>
    )
}
