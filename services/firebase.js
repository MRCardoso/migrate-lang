import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, signOut, deleteUser, updateProfile, updateEmail, updatePassword, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";

let app;

if (!getApps().length) {
    app = initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_API_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_API_PROJECT,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_API_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_API_SENDERID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_API_APPID
    })
} else {
    app = getApp()
}

const auth = getAuth()

export const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)
export const signin = (email, password) => signInWithEmailAndPassword(auth, email, password)
export const forgot = (email) => sendPasswordResetEmail(auth, email)
export const loadUser = (next) => onAuthStateChanged(auth, next)

export const update = (data) => {
    const promises = [];
    console.log(auth.currentUser)
    if(!auth.currentUser){
        throw "erro user"
    }

    if(data.name) promises.push(updateProfile(auth.currentUser, {displayName:data.name}))
    if(data.email) promises.push(updateEmail(auth.currentUser, data.email))
    if(data.password) promises.push(updatePassword(auth.currentUser, data.password))
    if(promises.length==0){
        return Promise.resolve()
    }
    return Promise.all(promises)
}

export const removeUser = _ => deleteUser(auth.currentUser)
export const logout = _ => signOut(auth)

export default app