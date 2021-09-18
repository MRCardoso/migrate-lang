import { initializeApp, getApps, getApp } from "firebase/app"
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

export default app