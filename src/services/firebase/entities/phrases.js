import app from "../app"
import { __create, __update, __delete, __all, __one, __select } from "../crud"

const tableName = "phrases"

export const list = async () => {
    const response = await __all(tableName, {order: ["content", "asc"]})
    return response.docs.map(doc => ({id: doc.id, ...doc.data()}))
}

export const remove = (docid) => {
    return __delete(tableName, docid)
}

export const save = async (value, reason) => {
    const hit = (typeof reason === "boolean" ? (reason===true? 1 : 0) : reason.hit)
    const fail = (typeof reason === "boolean" ? (reason===false? 1 : 0) : reason.fail)
    const nextValue = String(value).toLowerCase().trim()
    
    const res = await __one(tableName, {where: ["content", "==", nextValue]})
    
    if(res.docs.length > 0){
        const [response] = res.docs
        const data = response.data()
        const values = {hit: (data.hit + hit), fail: (data.fail+fail)}
        if(hit > 0 || fail > 0){
            await __update(tableName, response.id, values)
        }
        return Promise.resolve(true)
    }
    
    await __create(tableName, {content: value, hit, fail})
    
    return Promise.resolve(true)
}

export default app