import app from "../firebase"
import { getFirestore, collection, getDocs, setDoc, where, query, doc, limit, orderBy, updateDoc } from 'firebase/firestore';

const db = getFirestore(app)
const tableName = "phrases"
const reference = collection(db, tableName)

const create = () => doc(reference)
const update = (id) => doc(db, tableName, id)

export const list = async () => {
    const response = await getDocs(query(reference, orderBy("content", "asc")))
    return response.docs.map(doc => ({id: doc.id, ...doc.data()}))
}

export const save = async (value, reason) => {
    try {
        const hit = (reason===true? 1 : 0)
        const fail = (reason===false? 1 : 0)
        const nextValue = String(value).toLowerCase().trim()
        
        const q = query(reference, where("content", "==", nextValue), limit(1))
        const res = await getDocs(q)
        
        if(res.docs.length > 0){
            const [response] = res.docs
            const data = response.data()
            const values = {hit: (data.hit + hit), fail: (data.fail+fail)}
            if(hit > 0 || fail > 0){
                await updateDoc(update(response.id), values)
            }
            return Promise.resolve(true)
        }
        
        await setDoc(create(), {content: value, hit, fail})
        
        return Promise.resolve(true)
    } catch (error) {
        return Promise.reject(error)
    }
}

export default app