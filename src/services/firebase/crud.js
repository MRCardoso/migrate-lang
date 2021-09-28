import app from "./app"
import { getFirestore, collection, getDocs, addDoc, where, query, doc, limit, orderBy, updateDoc, deleteDoc } from 'firebase/firestore';
import { enabledCloud } from "../utils";

const db = getFirestore(app)

const validatePermission = (action, next) => {
    if(!enabledCloud(action)){
        return Promise.reject("insufficient permissions")
    }
    return next()
}

const getDocId = (table, id) => doc(db, table, id)
const createItem = (table, data) => {
    return validatePermission(`${table}Create`, () => addDoc(collection(db, table), data))
}
const updateItem = (table, id, data) => {
    return validatePermission(`${table}Update`, () => updateDoc(doc(db, table, id), data))
}
const removeItem = (table, id) => {
    return validatePermission(`${table}Delete`, () => deleteDoc(doc(db, table, id)))
}
const select = (table) => collection(db, table)
const condition = (table, constraint = {}) => {
    const params = []
    
    if(constraint.where){
        const [f, operator="==", value] = constraint.where
        params.push(where(f, operator, value))
    }
    if(Array.isArray(constraint.order)) {
        const [field, sort="asc"] = constraint.order
        params.push(orderBy(field, sort))
    }
    
    if(constraint.limit){
        params.push(limit(constraint.limit))
    }
    
    return query(__select(table), ...params)
}
export const __all = (table, params = {}) => {
    return validatePermission(table, () => getDocs(__condition(table, params)))
}
export const __one = (table, params = {}) => {
    params.limit = 1
    return validatePermission(table, () => getDocs(__condition(table, params)))
}

export const __create = createItem
export const __update = updateItem
export const __delete = removeItem
export const __select = select
export const __condition = condition
export const __getDocId = getDocId

export default db