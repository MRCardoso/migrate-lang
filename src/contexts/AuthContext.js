import React, { useEffect, useState, useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import ToastModal from '../components/ToastModal'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export default function AuthProvider({children, recall}) {
    const [notify, setNotify] = useState(null)
    const [loading, setLoading] = useState(false)

    const setMessager = (message) => {
        setNotify(null)
        setTimeout(() => setNotify(message), 50);
    }
    
    useEffect(() => {
        if( recall && recall.message && recall.variant){
            setMessager(recall)
        }
    }, [recall])

    const value = {setMessager, setLoading}

    return (
        <AuthContext.Provider value={value}>
            {loading ? 
            <div className="loading-2">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div> 
            : ''}
            {children}
            <ToastModal message={notify && notify.message} onClose={() => setNotify(null)} variant={notify && notify.variant} />
        </AuthContext.Provider>
    )
}
