import React, { useEffect, useState, useContext } from 'react'
import ToastModal from '../components/ToastModal'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export default function AuthProvider({children, recall}) {
    const [notify, setNotify] = useState(null)

    const setMessager = (message) => {
        setNotify(null)
        setTimeout(() => setNotify(message), 50);
    }
    
    useEffect(() => {
        if( recall && recall.message && recall.variant){
            setMessager(recall)
        }
    }, [recall])

    const value = {setMessager}

    return (
        <AuthContext.Provider value={value}>
            {children}
            <ToastModal message={notify && notify.message} onClose={() => setNotify(null)} variant={notify && notify.variant} />
        </AuthContext.Provider>
    )
}
