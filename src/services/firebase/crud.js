import app from "./app"
import { getFirestore, collection, getDocs, addDoc, where, query, doc, limit, limitToLast, orderBy, startAfter, endBefore, updateDoc, deleteDoc, documentId } from 'firebase/firestore';


const db = getFirestore(app)

export const enabledCloud = (action) => {
    const actions = process.env.NEXT_PUBLIC_ENABLED_CLOUD_STORAGE.split("|")
    return actions.indexOf(action)  !== -1 ? true: false
}

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
    
    if (constraint.firstAt) {
        params.push(endBefore(constraint.firstAt))
    }
    if (constraint.lastAt) {
        params.push(startAfter(constraint.lastAt))
    }
    
    if(constraint.limit){
        if (constraint.firstAt) { 
            params.push(limitToLast(constraint.limit))
        } else{
            params.push(limit(constraint.limit))
        }
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
export const __byId = (table, id) => {
    if (typeof id !== "string") {
        id = id.id
    }
    return __one(table, {where: [documentId(), "==", __getDocId(table, id)]})
}

export const __create = createItem
export const __update = updateItem
export const __delete = removeItem
export const __select = select
export const __condition = condition
export const __getDocId = getDocId

export const queryPaginator = async (limit = null, pager = null, prev = "1", table) => {
    if (prev==="1" && pager && pager.first) {
        const f = await __byId(table, pager.first)
        pager.first = f.docs[0]
    }
    if (prev==="0" && pager && pager.last) {
        const l = await __byId(table, pager.last)
        pager.last = l.docs[0]
    }
    return {
        limit: (limit ?? null),
        firstAt: ((prev==="1" && pager && pager.first) ?? null),
        lastAt: ((prev==="0" && pager && pager.last) ?? null)
    }
}
export const responsePaginator = (docs, pager, prev = "0") => {
    const size = docs.length
    const first = (size > 0 ? docs[0].id : null)
    const last = (size > 1 ? docs[size-1].id : null)
    return {
        isFirst: ((pager === null || (prev==="1" && size === 0)) ? "1" : "0"),
        isLast: ((prev==="0" && size === 0) ? "1" : "0"),
        first, 
        last
    }
}
export const PAGE_SIZE = 10
export default db